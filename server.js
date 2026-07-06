const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve every file in this folder exactly as requested — no URL rewriting,
// no redirects, so query strings like ?id=housing-loan are never touched.
app.use(express.static(__dirname));

// Visiting the bare domain root goes to the homepage.
app.get("/", (req, res) => {
  res.redirect("/home.html");
});

app.listen(PORT, () => {
  console.log(`Arihant Finance website running on port ${PORT}`);
});