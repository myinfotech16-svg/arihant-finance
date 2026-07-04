const VALUES = [
  { icon: "shield", name: "Integrity", desc: "Every rate, fee and term is disclosed before you sign — never buried after." },
  { icon: "users", name: "Inclusion", desc: "From dairy farmers to first-time entrepreneurs, credit built for real lives." },
  { icon: "badgeCheck", name: "Transparency", desc: "No hidden charges. Your loan account is open to you at every stage." },
  { icon: "trendingUp", name: "Reliability", desc: "Twenty-seven years of honouring every disbursal we've committed to." },
  { icon: "award", name: "Innovation", desc: "Doorstep service and digital tools built for where our customers are." },
];

const MILESTONES = [
  { year: "1998", text: "Arihant Finance founded in Jaipur with a single branch and a group-lending model for local self-help groups." },
  { year: "2005", text: "Expanded into rural Rajasthan with dedicated dairy and agri-linked lending products." },
  { year: "2012", text: "Converted to a public limited company to widen access to long-term capital for lending operations." },
  { year: "2018", text: "Crossed 100 branches; launched dedicated SME and vehicle finance verticals." },
  { year: "2024", text: "Introduced digital application and Just-in-Time disbursal for pre-approved customers." },
];

function renderValues() {
  document.getElementById("valuesGrid").innerHTML = VALUES.map((v) => `
    <div class="value-card"><span class="icon-badge violet sm">${iconSVG(v.icon, 19)}</span><h4>${v.name}</h4><p>${v.desc}</p></div>`).join("");
}

function renderTimeline() {
  document.getElementById("timeline").innerHTML = MILESTONES.map((m, i) => `
    <div class="timeline-row">
      <span class="timeline-year">${m.year}</span>
      <div class="timeline-line">
        <span class="timeline-dot"></span>
        ${i !== MILESTONES.length - 1 ? '<span class="timeline-connector"></span>' : ""}
      </div>
      <p>${m.text}</p>
    </div>`).join("");
}

function renderAboutSeal() {
  document.getElementById("aboutSeal").innerHTML = sealSVG(180, "accent");
}

document.addEventListener("DOMContentLoaded", () => {
  renderValues();
  renderTimeline();
  renderAboutSeal();
  renderIconPlaceholders(document);
});
