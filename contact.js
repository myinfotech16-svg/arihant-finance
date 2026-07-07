function renderInterestOptions() {
  const select = document.getElementById("fInterest");
  SERVICES.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s.name;
    opt.textContent = s.name;
    select.appendChild(opt);
  });
  ["General Enquiry", "Career"].forEach((v) => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    select.appendChild(opt);
  });
}

function initContactForm() {
  const form = document.getElementById("enquiryForm");
  const success = document.getElementById("enquirySuccess");
  const successText = document.getElementById("successText");
  const submitBtn = form.querySelector('button[type="submit"]');

  document.getElementById("successSeal").innerHTML = sealSVG(90, "accent");
  document.getElementById("contactSeal").innerHTML = sealSVG(110, "accent");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("fName").value.trim();
    const email = document.getElementById("fEmail").value.trim();
    const phone = document.getElementById("fPhone").value.trim();
    const interest = document.getElementById("fInterest").value;
    const message = document.getElementById("fMessage").value.trim();
    const website = document.getElementById("fWebsite") ? document.getElementById("fWebsite").value : "";

    let valid = true;
    const setErr = (id, show) => document.getElementById(id).classList.toggle("show", show);

    if (!name) { setErr("errName", true); valid = false; } else setErr("errName", false);
    if (!/^\S+@\S+\.\S+$/.test(email)) { setErr("errEmail", true); valid = false; } else setErr("errEmail", false);
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) { setErr("errPhone", true); valid = false; } else setErr("errPhone", false);
    if (!interest) { setErr("errInterest", true); valid = false; } else setErr("errInterest", false);

    if (!valid) return;

    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Submitting…";

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, interest, message, website }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      successText.innerHTML = `Thank you, ${name.split(" ")[0]}. Your enquiry regarding <strong>${interest}</strong> has been logged. A relationship manager will contact you at ${phone} within one working day.`;
      form.classList.add("hide");
      success.classList.add("show");
    } catch (err) {
      alert(err.message || "Could not submit your enquiry. Please check your connection and try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

  document.getElementById("anotherEnquiryBtn").addEventListener("click", () => {
    form.reset();
    form.classList.remove("hide");
    success.classList.remove("show");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderInterestOptions();
  initContactForm();
});