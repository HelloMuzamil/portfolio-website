// Mobile menu functionality
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navMenu = document.querySelector(".nav ul");

mobileMenuBtn.addEventListener("click", function () {
  mobileMenuBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav ul li a");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    mobileMenuBtn.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
  if (!event.target.closest(".nav")) {
    mobileMenuBtn.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const nav = document.querySelector(".nav");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animate skill bars when they come into view
// Animate skill bars when they come into view
const skillBars = document.querySelectorAll(".progress");

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progress = entry.target;
        const finalWidth = progress.getAttribute("data-width"); // custom attribute se final width milegi
        progress.style.width = finalWidth; // smoothly animate hoga
        observer.unobserve(progress); // ek dafa animate hone ke baad dobara na ho
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach((bar) => {
  // HTML me set ki width ko data-width me daal do
  const width = bar.style.width;
  bar.setAttribute("data-width", width);
  bar.style.width = "0%"; // start from 0
  skillObserver.observe(bar);
});

// Form submission with animation
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = this.querySelector(".btn");
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.style.transform = "scale(0.95)";

  // Simulate form submission
  setTimeout(() => {
    submitBtn.textContent = "Message Sent!";
    submitBtn.style.background = "#28a745";
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = "";
      submitBtn.style.transform = "";
      form.reset();
    }, 2000);
  }, 1000);
});
