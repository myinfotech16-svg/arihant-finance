const VALUES = [
  { icon: "shield", name: "Integrity", desc: "Every rate, fee and term is disclosed before you sign — never buried after." },
  { icon: "users", name: "Inclusion", desc: "From dairy farmers to first-time entrepreneurs, credit built for real lives." },
  { icon: "badgeCheck", name: "Transparency", desc: "No hidden charges. Your loan account is open to you at every stage." },
  { icon: "trendingUp", name: "Reliability", desc: "Twenty-seven years of honouring every disbursal we've committed to." },
  { icon: "award", name: "Innovation", desc: "Doorstep service and digital tools built for where our customers are." },
];

const MILESTONES = [
  { year: "1993", icon: "building", title: "Company Incorporated", text: "Arihant Finance (India) Limited was incorporated as a financial services company in Tamil Nadu." },
  { year: "1998", icon: "barsUpArrow", title: "NBFC Operations Expansion", text: "Expanded lending and investment activities with a stronger regional financial presence." },
  { year: "2005", icon: "shareholderGroup", title: "Growth in Shareholder Base", text: "Strengthened investor participation and expanded corporate financial operations." },
  { year: "2012", icon: "shieldCheck", title: "Public Limited Company Development", text: "Enhanced governance structure and compliance systems as a public limited company." },
  { year: "2024", icon: "fileCheckBadge", title: "Financial & Compliance Strengthening", text: "Completed annual audits, board reporting, shareholder updates, and financial compliance filings." },
  { year: "2025", icon: "handshake", title: "Authorized Share Capital Increased", text: "Authorized share capital increased from ₹3.3 Crores to ₹6 Crores through shareholder approval and ROC filing." },
];

function renderValues() {
  document.getElementById("valuesGrid").innerHTML = VALUES.map((v) => `
    <div class="value-card"><span class="icon-badge gradient-fill sm">${iconSVG(v.icon, 19)}</span><h4>${v.name}</h4><p>${v.desc}</p></div>`).join("");
}

function renderTimeline() {
  document.getElementById("timeline").innerHTML = MILESTONES.map((m, i) => `
    <div class="timeline-row">
      <span class="timeline-year">${m.year}</span>
      <div class="timeline-line">
        <span class="timeline-dot"></span>
        ${i !== MILESTONES.length - 1 ? '<span class="timeline-connector"></span>' : ""}
      </div>
      <span class="icon-badge on-dark timeline-icon">${iconSVG(m.icon, 24)}</span>
      <div class="timeline-content">
        <h4>${m.title}</h4>
        <p>${m.text}</p>
      </div>
    </div>`).join("");
}

function renderAboutSeal() {
  document.getElementById("aboutSeal").innerHTML = sealSVG(40, "accent");
}

document.addEventListener("DOMContentLoaded", () => {
  renderValues();
  renderTimeline();
  renderAboutSeal();
  renderIconPlaceholders(document);
});