/* service-detail.js */

function getServiceId() {
  // Try URL params first (?id=housing-loan)
  const urlId = new URLSearchParams(window.location.search).get("id");
  if (urlId) {
    sessionStorage.setItem("serviceId", urlId);
    return urlId;
  }
  // Fallback: read from sessionStorage (set when link was clicked)
  const storedId = sessionStorage.getItem("serviceId");
  if (storedId) return storedId;
  // Final fallback: group-loan
  return "group-loan";
}

function serviceDetailHTML(service) {
  const related = SERVICES.filter((s) => s.id !== service.id).slice(0, 4);
  return `
    <section class="service-hero" style="background-image: linear-gradient(rgba(36,18,70,0.55), rgba(36,18,70,0.72)), url('images/service-hero/${service.id}.jpg'); background-size: cover; background-position: center;">
      <div class="container">
        <a class="breadcrumb" href="services.html">Services</a>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current">${service.name}</span>
        <div class="service-hero-body">
          <div class="service-hero-icon">${iconSVG(service.icon, 34)}</div>
          <div>
            <span class="service-hero-num">Ledger Entry No. ${service.num}</span>
            <h1>${service.name}</h1>
            <p>${service.tagline}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container two-col">
        <div>
          <div class="eyebrow">Overview</div>
          <p class="prose">${service.overview}</p>

          <div class="eyebrow">Key Features</div>
          <ul class="feature-list">
            ${service.features.map((f) => `<li>${iconSVG("checkCircle", 17)}<span>${f}</span></li>`).join("")}
          </ul>

          <div class="eyebrow">Documents Required</div>
          <ul class="feature-list">
            ${service.documents.map((d) => `<li>${iconSVG("fileCheck", 17)}<span>${d}</span></li>`).join("")}
          </ul>
        </div>

        <div>
          <div class="ledger-card">
            <h4>Loan Ledger — Quick Reference</h4>
            <div class="ledger-row"><span>Amount Range</span><strong>${service.amount}</strong></div>
            <div class="ledger-row"><span>Tenure</span><strong>${service.tenure}</strong></div>
            <div class="ledger-row"><span>Interest Rate</span><strong>${service.rate}</strong></div>
            <div class="ledger-row"><span>Processing Fee</span><strong>${service.fee}</strong></div>
            <div class="ledger-rule light" style="margin-top:14px;"></div>
            <h4 style="margin-top:20px;">Eligibility</h4>
            <ul class="feature-list">
              ${service.eligibility.map((e) => `<li>${iconSVG("checkCircle", 16).replace('stroke="currentColor"', 'stroke="currentColor" class="gold"')}<span>${e}</span></li>`).join("")}
            </ul>
            <a class="btn-primary" href="contact.html" style="width:100%; justify-content:center;">Apply for ${service.name} ${iconSVG("arrowRight", 16)}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-sand">
      <div class="container">
        <div class="eyebrow">Explore More</div>
        <h2 class="section-title">Other entries in the ledger.</h2>
        <div class="services-grid">
          ${related.map(serviceCardHTML).join("")}
        </div>
      </div>
    </section>`;
}

function renderServiceDetail() {
  const id = getServiceId();
  const service = SERVICES.find((s) => s.id === id) || SERVICES[0];

  document.title = service.name + " — Arihant Finance Public Limited Company";
  const container = document.getElementById("serviceDetailContent");
  if (!container) return;
  container.innerHTML = serviceDetailHTML(service);
  renderIconPlaceholders(container);
}

document.addEventListener("DOMContentLoaded", renderServiceDetail);