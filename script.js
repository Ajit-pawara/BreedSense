window.addEventListener("load", () => {
  document.querySelector(".glass-card").classList.add("fade-in");
});

// CTA hover effect
const ctaBtn = document.querySelector(".cta");
ctaBtn.addEventListener("mouseenter", () => {
  ctaBtn.style.transform = "scale(1.08)";
  ctaBtn.style.boxShadow = "0 12px 40px rgba(0,255,200,0.55)";
});
ctaBtn.addEventListener("mouseleave", () => {
  ctaBtn.style.transform = "scale(1)";
  ctaBtn.style.boxShadow = "0 5px 25px rgba(0,255,200,0.3)";
});

// Navigation highlight on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".glass-nav nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; 
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// --- Image Identification Logic ---
const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "image/*";

ctaBtn.addEventListener("click", () => {
  fileInput.click();
});

// Glass card to show results
const resultCard = document.createElement("div");
resultCard.className = "glass-result fade-in";
document.body.appendChild(resultCard);

fileInput.addEventListener("change", async () => {
  const file = fileInput.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  resultCard.innerHTML = `<p>🔄 Identifying, please wait...</p>`;

  try {
    const res = await fetch("http://localhost:5000/identify", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    // Parse data.result JSON safely
    let parsed = {};
    try { parsed = JSON.parse(data.result); } catch { parsed = { type: "unknown", breed: null }; }

    if (parsed.type === "cow") {
      resultCard.innerHTML = `<h3>🐄 Cow detected!</h3><p>Breed: ${parsed.breed}</p>`;
    } else {
      resultCard.innerHTML = `<h3>⚠️ Not a cow!</h3><p>Detected: ${parsed.type}</p>`;
    }

  } catch (err) {
    console.error(err);
    
    // Create iOS-style popup
const showErrorPopup = (message) => {
  const popup = document.createElement("div");
  popup.className = "ios-popup fade-in";
  popup.innerHTML = `
    <h3>❌ Error</h3>
    <p>${message}</p>
    <button class="popup-close">OK</button>
  `;
  document.body.appendChild(popup);

  const closeBtn = popup.querySelector(".popup-close");
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("fade-in");
    popup.classList.add("fade-out");
    setTimeout(() => popup.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (popup.parentNode) {
      popup.classList.remove("fade-in");
      popup.classList.add("fade-out");
      setTimeout(() => popup.remove(), 300);
    }
  }, 5000);
};

// Usage
showErrorPopup("Unable to identify image. Please try again!");



  }
});
