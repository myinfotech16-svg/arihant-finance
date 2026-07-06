const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve every file in this folder exactly as requested — no automatic URL
// rewriting, so query strings like ?id=housing-loan are never touched.
app.use(express.static(__dirname));

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