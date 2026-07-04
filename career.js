const BENEFITS = [
  { icon: "heart", name: "Health Cover", desc: "Family health insurance from day one of employment." },
  { icon: "graduationCap", name: "Learning Fund", desc: "Sponsored certifications in credit, risk and rural finance." },
  { icon: "piggyBank", name: "Performance Bonus", desc: "Branch and individual incentives tied to portfolio quality, not just volume." },
  { icon: "users", name: "Rural Immersion", desc: "Structured field postings so every employee understands the customer, not just the file." },
];

const OPENINGS = [
  { title: "Branch Relationship Manager", loc: "Poonamalee, Chennai", type: "Full-time" },
  { title: "Field Loan Officer — Dairy & Group Lending", loc: "Poonamalee, Chennai", type: "Full-time" },
  { title: "Credit Analyst — SME Vertical", loc: "Poonamalee, Chennai", type: "Full-time" },
  { title: "Business Development Executive", loc: "Poonamalee, Chennai", type: "Full-time" },
  { title: "Customer Service Associate", loc: "Poonamalee, Chennai", type: "Full-time" },
];

function renderBenefits() {
  document.getElementById("benefitsGrid").innerHTML = BENEFITS.map((b) => `
    <div class="value-card"><span class="icon-badge violet sm">${iconSVG(b.icon, 19)}</span><h4>${b.name}</h4><p>${b.desc}</p></div>`).join("");
}

function renderOpenings() {
  document.getElementById("openingsList").innerHTML = OPENINGS.map((o) => `
    <div class="opening-row">
      <div>
        <h4>${o.title}</h4>
        <span class="opening-meta">${iconSVG("mapPin", 13)} ${o.loc} &nbsp;·&nbsp; ${iconSVG("clock", 13)} ${o.type}</span>
      </div>
      <a class="btn-ghost" href="contact.html">Apply ${iconSVG("arrowUpRight", 15)}</a>
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderBenefits();
  renderOpenings();
  renderIconPlaceholders(document);
});
