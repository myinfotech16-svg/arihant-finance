/* ==================================================================== */
/*  HOME PAGE DATA                                                       */
/* ==================================================================== */

const SLIDES = [
  { image: "images/slide5.jpg", alt: "Arihant Finance — Empowering Dreams. Building Tomorrow." },
  { image: "images/slide3.jpg", alt: "Arihant Finance — Your Growth. Our Commitment." },
  { image: "images/slide2.jpg", alt: "Arihant Finance — Trust. Transparency. Together We Prosper." },
  { image: "images/slide4.jpg", alt: "Arihant Finance — Financing Today. Transforming Tomorrow." },
  { image: "images/slide1.jpg", alt: "Arihant Finance — Secure Investments. Promising Futures." },
];

/* ==================================================================== */
/*  WHY CHOOSE US                                                         */
/* ==================================================================== */

const WHY_US = [
  { icon: "target", name: "Goal Based Solutions", desc: "Customized financial solutions to help you achieve your goals." },
  { icon: "badgeCheck", name: "Trust & Transparency", desc: "We believe in building lasting relationships through integrity." },
  { icon: "trendingUp", name: "Sustainable Growth", desc: "Focused on creating long-term value and financial stability." },
  { icon: "handshake", name: "Expert Guidance", desc: "Our experienced team is with you at every step of your journey." },
  { glyph: "₹", name: "Secure Future", desc: "Ensuring your wealth is protected for a better tomorrow." },
];

function renderWhyUs() {
  const el = document.getElementById("whyGrid");
  if (!el) return;
  el.innerHTML = WHY_US.map((w) => `
    <div class="why-item">
      <span class="why-icon-ring">${w.glyph ? `<span class="why-glyph">${w.glyph}</span>` : iconSVG(w.icon, 30)}</span>
      <h4>${w.name}</h4>
      <p>${w.desc}</p>
    </div>`).join("");
}



function initHeroSlideshow() {
  const el = document.getElementById("heroSlideshow");
  const dotsEl = document.getElementById("heroDots");
  if (!el) return;
  const scrim = el.querySelector(".hero-slide-scrim");

  SLIDES.forEach((sl, i) => {
    const slide = document.createElement("div");
    slide.className = "hero-slide" + (i === 0 ? " active" : "");
    slide.innerHTML = `<img src="${sl.image}" alt="${sl.alt}" class="hero-slide-img" />`;
    el.insertBefore(slide, scrim);
  });

  dotsEl.innerHTML = SLIDES.map((_, i) => `<button class="hero-dot ${i === 0 ? "active" : ""}" data-slide="${i}" aria-label="Slide ${i + 1}"></button>`).join("");

  let current = 0;
  const slideEls = el.querySelectorAll(".hero-slide");
  const dotEls = dotsEl.querySelectorAll(".hero-dot");

  function show(i) {
    slideEls.forEach((s, idx) => s.classList.toggle("active", idx === i));
    dotEls.forEach((d, idx) => d.classList.toggle("active", idx === i));
    current = i;
  }

  dotEls.forEach((d) => d.addEventListener("click", () => show(parseInt(d.getAttribute("data-slide"), 10))));
  setInterval(() => show((current + 1) % SLIDES.length), 5000);
}

/* ==================================================================== */
/*  EMI CALCULATOR                                                        */
/* ==================================================================== */

function formatINR(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function initEMICalculator() {
  const amountEl = document.getElementById("calcAmount");
  const rateEl = document.getElementById("calcRate");
  const tenureEl = document.getElementById("calcTenure");
  if (!amountEl) return;

  const amountValueEl = document.getElementById("calcAmountValue");
  const rateValueEl = document.getElementById("calcRateValue");
  const tenureValueEl = document.getElementById("calcTenureValue");
  const emiEl = document.getElementById("calcEMI");
  const principalOut = document.getElementById("calcPrincipalOut");
  const interestOut = document.getElementById("calcInterestOut");
  const totalOut = document.getElementById("calcTotalOut");

  function recalc() {
    const P = parseFloat(amountEl.value);
    const annualRate = parseFloat(rateEl.value);
    const n = parseInt(tenureEl.value, 10);
    const r = annualRate / 12 / 100;

    let emi;
    if (r === 0) {
      emi = P / n;
    } else {
      const factor = Math.pow(1 + r, n);
      emi = (P * r * factor) / (factor - 1);
    }
    const total = emi * n;
    const interest = total - P;

    amountValueEl.textContent = formatINR(P);
    rateValueEl.textContent = annualRate + "%";
    tenureValueEl.textContent = n < 12 ? n + " months" : (n / 12).toFixed(n % 12 === 0 ? 0 : 1) + " yrs (" + n + " mo)";
    emiEl.textContent = formatINR(emi);
    principalOut.textContent = formatINR(P);
    interestOut.textContent = formatINR(interest);
    totalOut.textContent = formatINR(total);
  }

  [amountEl, rateEl, tenureEl].forEach((el) => el.addEventListener("input", recalc));
  recalc();
}

document.addEventListener("DOMContentLoaded", () => {
  renderWhyUs();
  renderIconPlaceholders(document);
  initHeroSlideshow();
  initEMICalculator();
});