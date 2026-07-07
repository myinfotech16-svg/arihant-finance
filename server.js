const express = require("express");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

async function sendEnquiryEmail(entry) {
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

/* ==================================================================== */
/*  BACKUP LOG — every submission is also appended to a local JSON file  */
/*  as a fallback record. Note: on Railway this file resets on redeploy  */
/*  (the filesystem isn't persistent across deploys) — email is the      */
/*  reliable channel; this is just a convenience backup between deploys. */
/* ==================================================================== */

const LOG_FILE = path.join(__dirname, "enquiries-log.json");

function appendToLog(entry) {
  let existing = [];
  try {
    existing = JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
  } catch (e) {
    existing = [];
  }
  existing.push(entry);
  fs.writeFileSync(LOG_FILE, JSON.stringify(existing, null, 2));
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
    submittedAt: new Date().toISOString(),
  };

  try {
    appendToLog(entry);
  } catch (e) {
    console.error("Failed to write enquiry log:", e.message);
  }

  try {
    await sendEnquiryEmail(entry);
  } catch (e) {
    console.error("Failed to send enquiry email:", e.message);
    // Still return success to the user — their enquiry was logged even if email failed.
  }

  res.json({ ok: true });
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