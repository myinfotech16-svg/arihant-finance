require("dotenv").config();

const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/* ==================================================================== */
/*  DATABASE — MySQL                                                      */
/*  Railway's MySQL plugin gives you a MYSQL_URL connection string —      */
/*  in your service's Variables tab, add a reference to it (or copy the   */
/*  individual MYSQLHOST / MYSQLUSER / MYSQLPASSWORD / MYSQLDATABASE /    */
/*  MYSQLPORT values Railway provides once you add the MySQL plugin).     */
/* ==================================================================== */

const pool = process.env.MYSQL_URL
  ? mysql.createPool(process.env.MYSQL_URL)
  : mysql.createPool({
      host: process.env.MYSQLHOST || process.env.DB_HOST,
      user: process.env.MYSQLUSER || process.env.DB_USER,
      password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
      database: process.env.MYSQLDATABASE || process.env.DB_NAME,
      port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
    });

let dbReady = false;

async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        interest VARCHAR(255) NOT NULL,
        message TEXT,
        submitted_at DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    dbReady = true;
    console.log("MySQL connected and ready — enquiries table is set up.");
  } catch (e) {
    dbReady = false;
    console.error("MySQL not available yet — enquiries will still be emailed, just not stored in the database. Error:", e.message);
  }
}
initDatabase();

async function saveEnquiryToDB(entry) {
  if (!dbReady) throw new Error("Database not connected");
  await pool.execute(
    `INSERT INTO enquiries (name, email, phone, interest, message, submitted_at) VALUES (?, ?, ?, ?, ?, ?)`,
    [entry.name, entry.email, entry.phone, entry.interest, entry.message, entry.submittedAt]
  );
}

/* ==================================================================== */
/*  EMAIL — Nodemailer via Gmail SMTP                                    */
/*  Set these as environment variables in Railway (Settings > Variables):*/
/*    GMAIL_USER          — the Gmail address sending notifications      */
/*    GMAIL_APP_PASSWORD  — a Gmail "App Password" (not your login pw)   */
/*    NOTIFY_EMAIL        — where enquiry notifications should be sent   */
/* ==================================================================== */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendBusinessNotificationEmail(entry) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log("Email not configured — skipping notification. Set GMAIL_USER / GMAIL_APP_PASSWORD / NOTIFY_EMAIL in Railway.");
    return;
  }
  await transporter.sendMail({
    from: `"Arihant Finance Website" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL || process.env.GMAIL_USER,
    replyTo: entry.email,
    subject: `New Enquiry — ${entry.interest} (${entry.name})`,
    text: [
      `New enquiry received from the website:`,
      ``,
      `Name: ${entry.name}`,
      `Email: ${entry.email}`,
      `Phone: ${entry.phone}`,
      `Interested in: ${entry.interest}`,
      `Message: ${entry.message || "(none)"}`,
      ``,
      `Submitted: ${entry.submittedAt}`,
    ].join("\n"),
  });
}

async function sendCustomerConfirmationEmail(entry) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log("Email not configured — skipping customer confirmation.");
    return;
  }
  await transporter.sendMail({
    from: `"Arihant Finance Public Limited Company" <${process.env.GMAIL_USER}>`,
    to: entry.email,
    subject: `We've received your enquiry — Arihant Finance`,
    text: [
      `Dear ${entry.name},`,
      ``,
      `Thank you for reaching out to Arihant Finance Public Limited Company. This confirms your enquiry has been received and logged successfully.`,
      ``,
      `Here's a copy of what you submitted:`,
      `  Interested in: ${entry.interest}`,
      `  Phone: ${entry.phone}`,
      entry.message ? `  Message: ${entry.message}` : null,
      ``,
      `A relationship manager will contact you at ${entry.phone} within one working day.`,
      ``,
      `If you did not submit this enquiry, please disregard this email.`,
      ``,
      `— Arihant Finance Public Limited Company`,
      `14, Ledger House, MI Road, Jaipur, Rajasthan 302001`,
      `+91 141 234 5678 · connect@arihantfinance.in`,
    ].filter(Boolean).join("\n"),
    html: [
      `<p>Dear ${entry.name},</p>`,
      `<p>Thank you for reaching out to <strong>Arihant Finance Public Limited Company</strong>. This confirms your enquiry has been received and logged successfully.</p>`,
      `<p><strong>Here's a copy of what you submitted:</strong><br/>`,
      `Interested in: ${entry.interest}<br/>`,
      `Phone: ${entry.phone}<br/>`,
      entry.message ? `Message: ${entry.message}<br/>` : ``,
      `</p>`,
      `<p>A relationship manager will contact you at <strong>${entry.phone}</strong> within one working day.</p>`,
      `<p style="color:#888; font-size:13px;">If you did not submit this enquiry, please disregard this email.</p>`,
      `<p>— Arihant Finance Public Limited Company<br/>`,
      `14, Ledger House, MI Road, Jaipur, Rajasthan 302001<br/>`,
      `+91 141 234 5678 · connect@arihantfinance.in</p>`,
    ].join("\n"),
  });
}

/* ==================================================================== */
/*  BASIC RATE LIMITING — max 5 submissions per IP per 10 minutes        */
/* ==================================================================== */

const submissionLog = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const timestamps = (submissionLog.get(ip) || []).filter((t) => now - t < windowMs);
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > 5;
}

/* ==================================================================== */
/*  ENQUIRY ENDPOINT                                                      */
/* ==================================================================== */

app.post("/api/enquiry", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many submissions. Please try again later." });
  }

  const { name, email, phone, interest, message, website } = req.body || {};

  // Honeypot: a real visitor never fills this hidden field in.
  // A bot that fills in every field will trip this silently.
  if (website) {
    return res.json({ ok: true }); // pretend success, don't process it
  }

  if (!name || !email || !phone || !interest) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }
  if (!/^\d{10}$/.test(String(phone).replace(/\D/g, ""))) {
    return res.status(400).json({ error: "Invalid phone number." });
  }

  const entry = {
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    interest: String(interest).trim(),
    message: message ? String(message).trim() : "",
    submittedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
  };

  try {
    await saveEnquiryToDB(entry);
  } catch (e) {
    console.error("Failed to save enquiry to database:", e.message);
    // Continue anyway — email notification below is the fallback.
  }

  try {
    await sendBusinessNotificationEmail(entry);
  } catch (e) {
    console.error("Failed to send business notification email:", e.message);
  }

  try {
    await sendCustomerConfirmationEmail(entry);
  } catch (e) {
    console.error("Failed to send customer confirmation email:", e.message);
  }

  res.json({ ok: true });
});

/* ==================================================================== */
/*  ADMIN — view submitted enquiries (very basic, protected by a secret  */
/*  key in the URL — see ADMIN_KEY below). Visit:                        */
/*  yoursite.com/api/enquiries?key=YOUR_ADMIN_KEY                        */
/* ==================================================================== */

app.get("/api/enquiries", async (req, res) => {
  if (!process.env.ADMIN_KEY || req.query.key !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }
  if (!dbReady) {
    return res.status(503).json({ error: "Database not connected" });
  }
  const [rows] = await pool.query("SELECT * FROM enquiries ORDER BY id DESC LIMIT 200");
  res.json(rows);
});

// Serve every file in this folder exactly as requested — no automatic URL
// rewriting, so query strings like ?id=housing-loan are never touched.
// { index: false } stops it from auto-serving index.html at "/" — our own
// route below handles "/" instead, giving an instant redirect with no
// visible flash of the old placeholder page.
app.use(express.static(__dirname, { index: false }));

// Convenience redirects: if someone visits a page without the .html
// extension (e.g. /home, /about, /service-detail?id=housing-loan),
// send them to the real file — and explicitly carry over any query string
// so links like /service-detail?id=housing-loan still work correctly.
const pages = ["home", "about", "services", "service-detail", "career", "contact"];
pages.forEach((p) => {
  app.get(`/${p}`, (req, res) => {
    const qs = req.originalUrl.split("?")[1];
    res.redirect(`/${p}.html${qs ? "?" + qs : ""}`);
  });
});

// Visiting the bare domain root goes to the homepage.
app.get("/", (req, res) => {
  res.redirect("/home.html");
});

app.listen(PORT, () => {
  console.log(`Arihant Finance website running on port ${PORT}`);
});