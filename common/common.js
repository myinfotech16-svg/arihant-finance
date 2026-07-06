/* ==================================================================== */
/*  ICONS — small inline SVG library                                     */
/* ==================================================================== */

const ICONS = {
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14a5 5 0 0 1 5.5 5"/>',
  home: '<path d="M4 11 12 4l8 7"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>',
  milk: '<path d="M9 3h6l1 3-1 3v10a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9L8 6z"/><path d="M8 12h8"/>',
  briefcase: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
  car: '<path d="M4 16v-3l2-4h12l2 4v3"/><rect x="3" y="16" width="18" height="3" rx="1"/><circle cx="7.5" cy="19" r="1.4"/><circle cx="16.5" cy="19" r="1.4"/>',
  zap: '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"/>',
  umbrella: '<path d="M12 3c5 0 9 3.6 9 8H3c0-4.4 4-8 9-8Z"/><path d="M12 11v8a2 2 0 0 1-4 0"/><path d="M12 3v1"/>',
  factory: '<path d="M3 20V10l5 3V10l5 3V8l5 3v9z"/><path d="M3 20h18"/>',
  arrowRight: '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  chevronDown: '<path d="M6 9l6 6 6-6"/>',
  chevronRight: '<path d="M9 6l6 6-6 6"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9"/>',
  fileCheck: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9.5 15l2 2 3.5-4"/>',
  mapPin: '<path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.4"/>',
  phone: '<path d="M5 4h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2C10.6 20 4 13.4 4 6a2 2 0 0 1 1-2Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 6l9 7 9-7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  x: '<path d="M6 6l12 12"/><path d="M18 6L6 18"/>',
  send: '<path d="M3 11l18-8-8 18-2-8z"/>',
  quote: '<path d="M7 8c-2.5 1-3.5 3-3.5 5.5S5 18 7.5 18 11 16 11 13.5 9.5 9 7 8Z"/><path d="M16 8c-2.5 1-3.5 3-3.5 5.5S14 18 16.5 18 20 16 20 13.5 18.5 9 16 8Z"/>',
  shield: '<path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z"/>',
  award: '<circle cx="12" cy="8" r="5"/><path d="M8.5 12.5 7 21l5-2.5L17 21l-1.5-8.5"/>',
  trendingUp: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 6h6v6"/>',
  piggyBank: '<circle cx="12" cy="12" r="9"/><path d="M12 7.2l1.5 3 3.3.5-2.4 2.3.6 3.3-2.9-1.6-2.9 1.6.6-3.3-2.4-2.3 3.3-.5z"/>',
  badgeCheck: '<path d="M12 2l2.5 1.5L17.5 3l1 3 3 1-1.5 2.5L21 12l-1.5 2.5 1.5 2.5-3 1-1 3-3-.5L12 22l-2.5-1.5L7 21l-1-3-3-1 1.5-2.5L3 12l1.5-2.5L3 7l3-1 1-3 2.5.5z"/><path d="M8.5 12.5l2.3 2.3L16 10"/>',
  graduationCap: '<path d="M2 9l10-4 10 4-10 4z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',
  heart: '<path d="M12 20s-7-4.4-9.5-8.8C.7 7.6 2.5 4 6 4c2 0 3.5 1 6 3.5C14.5 5 16 4 18 4c3.5 0 5.3 3.6 3.5 7.2C19 15.6 12 20 12 20z"/>',
  facebook: '<path d="M14 9h2V6h-2c-2 0-3 1.2-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9.5c0-.3.2-.5.5-.5z"/>',
  twitter: '<path d="M21 5.5c-.7.4-1.5.6-2.3.8a3.7 3.7 0 0 0-6.3 3.4A10.5 10.5 0 0 1 4.6 5.9a3.7 3.7 0 0 0 1.1 5 3.6 3.6 0 0 1-1.7-.5v.1c0 1.8 1.3 3.3 3 3.6-.5.1-1.1.2-1.7.1a3.7 3.7 0 0 0 3.5 2.6A7.5 7.5 0 0 1 3 18.3 10.6 10.6 0 0 0 8.7 20c6.9 0 10.6-5.7 10.6-10.6v-.5c.7-.5 1.3-1.2 1.8-2z"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7.5 10v7"/><circle cx="7.5" cy="7" r="1"/><path d="M11.5 17v-4c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5v4"/><path d="M11.5 10v7"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  handshake: '<path d="M3 11.5l3.3-3.3a2 2 0 0 1 2.8 0L11 10"/><path d="M21 11.5l-3.3-3.3a2 2 0 0 0-2.8 0L13 10"/><path d="M8 12.3l2.6 2.6a1.9 1.9 0 0 0 2.8 0l2.6-2.6"/><path d="M3 11.5l4.5 4.5"/><path d="M21 11.5l-4.5 4.5"/>',
  building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 21v-3h6v3"/><path d="M8 7h1M8 10h1M8 13h1M12 7h1M12 10h1M12 13h1M16 7h1M16 10h1M16 13h1"/>',
  shieldCheck: '<path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z"/><path d="M9 12.2l2.1 2.1L15.5 10"/>',
  barsUpArrow: '<rect x="4" y="14" width="3" height="6" rx="0.5"/><rect x="9.5" y="10" width="3" height="10" rx="0.5"/><rect x="15" y="6" width="3" height="14" rx="0.5"/><path d="M16.5 6l4-4"/><path d="M17.3 2h3.2v3.2"/>',
  shareholderGroup: '<circle cx="12" cy="8" r="3"/><path d="M7 19c0-3 2.2-5 5-5s5 2 5 5"/><circle cx="5.5" cy="9.5" r="2.1"/><path d="M2.2 19c0-2.2 1.5-4 3.3-4"/><circle cx="18.5" cy="9.5" r="2.1"/><path d="M21.8 19c0-2.2-1.5-4-3.3-4"/>',
  fileCheckBadge: '<path d="M6 3h9l3 3v15H6z"/><path d="M15 3v3h3"/><path d="M9 10.5h6M9 13.5h4"/><circle cx="17" cy="17" r="4"/><path d="M15.3 17l1.2 1.2 2.2-2.2"/>',
};

function iconSVG(name, size) {
  size = size || 20;
  const inner = ICONS[name] || "";
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:block">${inner}</svg>`;
}

function renderIconPlaceholders(root) {
  (root || document).querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    const size = el.getAttribute("data-size") || 20;
    el.innerHTML = iconSVG(name, size);
    el.style.display = "inline-flex";
    el.style.lineHeight = "0";
  });
}

/* ==================================================================== */
/*  SEAL — the circular stamp signature element                          */
/* ==================================================================== */

let sealCounter = 0;
function sealSVG(size, tone) {
  const cls = tone === "paper" ? "seal tone-paper" : "seal";
  return `<img class="${cls}" src="images/logo-circle.png" width="${size}" height="${size}" alt="Arihant Finance Public Limited Company" style="border-radius:50%; display:block; width:${size}px; height:${size}px; object-fit:cover;" />`;
}

/* ==================================================================== */
/*  SERVICES DATA — the 9 loan products (used by header, footer,         */
/*  services.html and service-detail.html)                               */
/* ==================================================================== */

const SERVICES = [
  { id: "group-loan", num: "01", name: "Group Loan", icon: "users",
    tagline: "Strength in numbers, security in unity.",
    overview: "Our Joint Liability Group lending model brings together five to ten members of a community who co-guarantee one another's borrowing. Built for self-help groups, women's collectives and rural cooperatives, it turns shared trust into shared capital.",
    features: ["No collateral required — group guarantee replaces individual security", "Weekly, fortnightly or monthly repayment cycles matched to income patterns", "Financial literacy session included before first disbursal", "Top-up loans available once a clean repayment cycle is completed"],
    amount: "₹10,000 – ₹1,00,000 per member", tenure: "6 – 24 months", rate: "12% – 15% p.a. (reducing balance)", fee: "1% of sanctioned amount",
    eligibility: ["Group of 5–10 members from the same locality", "Each member aged 21–58 years", "Existing group savings history preferred, not mandatory"],
    documents: ["Group formation resolution", "Aadhaar & PAN of each member", "Passport-size photographs", "Bank passbook of group account"] },

  { id: "housing-loan", num: "02", name: "Housing Loan", icon: "home",
    tagline: "A home is not a loan. It's a ledger of belonging.",
    overview: "From the first foundation stone to the final coat of paint, our Housing Loan is structured around how construction actually happens — staged disbursals released against verified progress, so you never pay interest on money that's still sitting idle.",
    features: ["Stage-wise disbursal linked to construction milestones", "Financing for purchase, self-construction, extension or renovation", "Tenure up to 20 years for manageable EMIs", "Doorstep property and legal verification support"],
    amount: "₹3,00,000 – ₹75,00,000", tenure: "Up to 20 years", rate: "9.5% – 12% p.a.", fee: "0.5% – 1% of loan amount",
    eligibility: ["Salaried or self-employed applicants aged 23–60", "Clear property title and approved building plan", "Minimum 2 years of income continuity"],
    documents: ["Property title deed", "Approved building plan", "Income proof / ITR", "Identity & address proof"] },

  { id: "dairy-loan", num: "03", name: "Dairy Loan", icon: "milk",
    tagline: "Every pail of milk is a page in your family's ledger.",
    overview: "Designed for dairy farmers and milk-producer cooperatives, this loan finances milch animals, fodder storage, chilling units and small processing equipment — with a repayment calendar that follows the milk cycle, not the calendar month.",
    features: ["Financing for cattle purchase, cattle shed and fodder infrastructure", "Repayment aligned to milk procurement cycles", "Insurance cover for financed livestock included", "Veterinary and cooperative linkage support"],
    amount: "₹25,000 – ₹5,00,000", tenure: "12 – 48 months", rate: "10.5% – 13.5% p.a.", fee: "0.5% of sanctioned amount",
    eligibility: ["Active dairy farmer or member of a registered milk cooperative", "Land or shed for housing livestock", "Local veterinary health certificate for existing cattle, if any"],
    documents: ["Land / shed ownership or lease proof", "Cooperative membership card", "Identity & address proof", "Livestock valuation (for existing cattle)"] },

  { id: "business-loan", num: "04", name: "Business Loan", icon: "briefcase",
    tagline: "Fuel for the business you've already built.",
    overview: "Working capital and expansion finance for traders, retailers and service businesses that need capital to move at the speed of demand — restocking inventory, opening a second outlet, or bridging a seasonal gap.",
    features: ["Collateral-free options for loans up to ₹10,00,000", "Overdraft facility for fluctuating working-capital needs", "Flexible repayment matched to business cash flow", "Priority processing for existing account holders"],
    amount: "₹1,00,000 – ₹50,00,000", tenure: "12 – 60 months", rate: "13% – 17% p.a.", fee: "1% – 2% of loan amount",
    eligibility: ["Business vintage of at least 2 years", "Proprietorship, partnership or private limited entity", "Minimum annual turnover as per current lending policy"],
    documents: ["Business registration proof", "GST returns / bank statements (12 months)", "ITR of last 2 years", "KYC of proprietor / partners"] },

  { id: "vehicle-loan", num: "05", name: "Vehicle Loan", icon: "car",
    tagline: "Freedom, financed fairly.",
    overview: "Finance for two-wheelers, cars and commercial vehicles — for personal use or as an income-generating asset for drivers, delivery fleets and small transporters.",
    features: ["Up to 90% on-road funding for new vehicles", "Refinance available on existing commercial vehicles", "Quick sanction with minimal paperwork for salaried applicants", "Optional GAP insurance add-on"],
    amount: "₹50,000 – ₹15,00,000", tenure: "12 – 84 months", rate: "10% – 14% p.a.", fee: "1% of loan amount",
    eligibility: ["Applicant aged 21–65 with valid driving licence", "Stable income source, salaried or self-employed", "Commercial vehicle applicants require route / permit details"],
    documents: ["Driving licence", "Income proof", "Vehicle quotation / proforma invoice", "Identity & address proof"] },

  { id: "jit-loan", num: "06", name: "Just-in-Time (JIT) Loan", icon: "zap",
    tagline: "When the need can't wait, neither do we.",
    overview: "A rapid-disbursal facility for genuine short-notice needs — a medical bill, a broken machine, an urgent school fee. Pre-approved customers can access funds within hours of application, without repeating full documentation.",
    features: ["Disbursal within 24–48 hours for pre-approved customers", "Minimal documentation, leveraging existing customer records", "Short tenure designed for quick closure", "Digital application and e-sign facility"],
    amount: "₹5,000 – ₹1,00,000", tenure: "3 – 12 months", rate: "14% – 18% p.a.", fee: "Flat ₹200 – ₹500 processing charge",
    eligibility: ["Existing Arihant Finance customer in good standing, preferred", "Verified income source", "Valid active bank account for instant transfer"],
    documents: ["Aadhaar & PAN", "Latest bank statement", "Existing loan account number, if applicable"] },

  { id: "personal-loan", num: "07", name: "Personal Loan", icon: "user",
    tagline: "For the life you're building between milestones.",
    overview: "Unsecured finance for weddings, education, travel or consolidating other debts into one predictable EMI — sanctioned on your income and repayment history rather than collateral.",
    features: ["No collateral or guarantor required", "Fixed EMI for the entire tenure — no surprises", "Part-prepayment permitted after 6 EMIs", "Top-up available on existing personal loans"],
    amount: "₹25,000 – ₹10,00,000", tenure: "6 – 60 months", rate: "13.5% – 18% p.a.", fee: "1% – 2.5% of loan amount",
    eligibility: ["Salaried or self-employed applicants aged 21–58", "Minimum 1 year in current job or business", "Satisfactory credit history"],
    documents: ["Salary slips / income proof", "Bank statement (6 months)", "Identity & address proof", "Photograph"] },

  { id: "insurance", num: "08", name: "Insurance", icon: "umbrella",
    tagline: "Protection filed alongside every loan we write.",
    overview: "Life, health and asset-protection cover bundled with our lending or purchased on its own — because a good loan agreement should never leave a family exposed to what it couldn't plan for.",
    features: ["Loan-protection life cover available on all secured loans", "Health and personal accident policies for individuals and families", "Livestock and asset insurance for financed cattle, vehicles and equipment", "Assistance with claims filing and settlement"],
    amount: "Sum insured as per policy chosen", tenure: "Annual or loan-tenure aligned", rate: "Premium as per policy schedule", fee: "No processing fee on bundled policies",
    eligibility: ["Available to all active loan customers", "Standalone policies open to walk-in applicants", "Age and health disclosures per insurer norms"],
    documents: ["Identity & address proof", "Age proof", "Medical declaration (for health cover)"] },

  { id: "sme-loan", num: "09", name: "SME Loan", icon: "factory",
    tagline: "Small and medium in size, never in ambition.",
    overview: "Structured term loans and working-capital lines for manufacturing units, workshops and service enterprises ready to invest in machinery, capacity or a stronger balance sheet.",
    features: ["Term loans for machinery and capacity expansion", "Working capital lines against receivables and inventory", "Structured moratorium options during ramp-up phase", "Dedicated relationship manager for account servicing"],
    amount: "₹5,00,000 – ₹1,00,00,000", tenure: "12 – 84 months", rate: "12.5% – 16% p.a.", fee: "1% – 2% of loan amount",
    eligibility: ["Registered MSME / Udyam certificate", "Minimum 3 years of operating history", "Audited financials for the last 2 years"],
    documents: ["Udyam / MSME registration", "Audited financial statements", "GST & ITR filings", "KYC of promoters"] },
];

/* Convenience: render a service card (used on services.html and service-detail.html) */
function serviceCardHTML(s) {
  return `
    <a class="service-card" href="service-detail.html?id=${s.id}"
       onclick="sessionStorage.setItem('serviceId','${s.id}')">
      <span class="service-card-num">${s.num}</span>
      <span class="icon-badge violet">${iconSVG(s.icon, 24)}</span>
      <h3>${s.name}</h3>
      <p>${s.tagline}</p>
      <span class="service-card-link">View details ${iconSVG("arrowRight", 14)}</span>
    </a>`;
}

/* ==================================================================== */
/*  HEADER + FOOTER (shared markup is already in every page's HTML;      */
/*  this fills in the dynamic bits: mega-menu, mobile submenu, footer    */
/*  links, scroll shadow, dropdown/mobile toggling)                      */
/* ==================================================================== */

function renderHeaderFooterData() {
  const dropdownGrid = document.getElementById("dropdownGrid");
  if (dropdownGrid) {
    dropdownGrid.innerHTML = SERVICES.map((s) => `
      <a class="dropdown-card" href="service-detail.html?id=${s.id}"
         onclick="sessionStorage.setItem('serviceId','${s.id}')">
        <span class="dropdown-card-icon">${iconSVG(s.icon, 20)}</span>
        <span class="dropdown-card-body"><strong>${s.name}</strong><span>${s.tagline}</span></span>
      </a>`).join("");
  }

  const mobileServiceLinks = document.getElementById("mobileServiceLinks");
  if (mobileServiceLinks) {
    mobileServiceLinks.innerHTML = SERVICES.map((s) =>
      `<a class="mobile-sublink" href="service-detail.html?id=${s.id}"
          onclick="sessionStorage.setItem('serviceId','${s.id}')">${s.num} — ${s.name}</a>`).join("");
  }

  const footerServiceLinks = document.getElementById("footerServiceLinks");
  if (footerServiceLinks) {
    footerServiceLinks.innerHTML = "<h4>Loan Products</h4>" +
      SERVICES.slice(0, 5).map((s) => `<a href="service-detail.html?id=${s.id}" onclick="sessionStorage.setItem('serviceId','${s.id}')">${s.name}</a>`).join("") +
      `<a href="services.html">View All →</a>`;
  }

  ["brandSeal"].forEach((id) => { const el = document.getElementById(id); if (el) el.innerHTML = sealSVG(44, "accent"); });
  const footerSeal = document.getElementById("footerSeal");
  if (footerSeal) footerSeal.innerHTML = sealSVG(64, "paper");
}

function initHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  });

  const wrap = document.getElementById("servicesDropdownWrap");
  const panel = document.getElementById("dropdownPanel");
  if (wrap && panel) {
    // Open on click — 100% reliable, no timing issues
    wrap.querySelector('.nav-link').addEventListener('click', function(e) {
      e.preventDefault();
      panel.classList.toggle('open');
    });
    // Close when clicking anywhere outside
    document.addEventListener('click', function(e) {
      if (!wrap.contains(e.target)) {
        panel.classList.remove('open');
      }
    });
    // Also open on hover for desktop UX
    wrap.addEventListener('mouseenter', function() {
      panel.classList.add('open');
    });
    // Close only when mouse leaves BOTH the wrap AND the panel
    let leaveTimer;
    wrap.addEventListener('mouseleave', function() {
      leaveTimer = setTimeout(function() {
        if (!panel.matches(':hover')) panel.classList.remove('open');
      }, 300);
    });
    panel.addEventListener('mouseenter', function() {
      clearTimeout(leaveTimer);
    });
    panel.addEventListener('mouseleave', function() {
      panel.classList.remove('open');
    });
  }

  const mobileToggle = document.getElementById("mobileToggle");
  if (mobileToggle) mobileToggle.addEventListener("click", () => document.getElementById("mobileMenu").classList.toggle("open"));

  const mobileServicesToggle = document.getElementById("mobileServicesToggle");
  if (mobileServicesToggle) mobileServicesToggle.addEventListener("click", () => document.getElementById("mobileSubmenu").classList.toggle("open"));
}

/* Every page calls this once its own DOM is ready */
function initCommon() {
  renderHeaderFooterData();
  renderIconPlaceholders(document);
  initHeader();
}

document.addEventListener("DOMContentLoaded", initCommon);