// Mobile navigation toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Language switcher
const languageSelect = document.getElementById("language-select")
const translations = {
  bs: {
    home: "Početna",
    gallery: "Galerija",
    blog: "Blog",
    about: "O Klubu",
    tournament: "Turnir",
    contact: "Kontakt",
    heroTitle: "Judo Klub Una Bihać",
    heroSubtitle: "Tradicija, disciplina i uspjeh od 1986. godine",
    joinUs: "Pridruži se",
    learnMore: "Saznaj više",
  },
  en: {
    home: "Home",
    gallery: "Gallery",
    blog: "Blog",
    about: "About Club",
    tournament: "Tournament",
    contact: "Contact",
    heroTitle: "Judo Club Una Bihać",
    heroSubtitle: "Tradition, discipline and success since 1986",
    joinUs: "Join Us",
    learnMore: "Learn More",
  },
  de: {
    home: "Startseite",
    gallery: "Galerie",
    blog: "Blog",
    about: "Über den Verein",
    tournament: "Turnier",
    contact: "Kontakt",
    heroTitle: "Judo Club Una Bihać",
    heroSubtitle: "Tradition, Disziplin und Erfolg seit 1986",
    joinUs: "Mitmachen",
    learnMore: "Mehr erfahren",
  },
}

languageSelect.addEventListener("change", (e) => {
  const selectedLang = e.target.value
  updateLanguage(selectedLang)
  localStorage.setItem("selectedLanguage", selectedLang)
})

function updateLanguage(lang) {
  const t = translations[lang]
  if (!t) return

  // Update navigation
  const navLinks = document.querySelectorAll(".nav-link")
  const navTexts = ["home", "gallery", "blog", "about", "tournament", "contact"]

  navLinks.forEach((link, index) => {
    if (navTexts[index] && t[navTexts[index]]) {
      link.textContent = t[navTexts[index]]
    }
  })

  // Update hero section if exists
  const heroTitle = document.querySelector(".hero h1")
  const heroSubtitle = document.querySelector(".hero p")
  const joinBtn = document.querySelector(".btn")
  const learnBtn = document.querySelector(".btn-outline")

  if (heroTitle) heroTitle.textContent = t.heroTitle
  if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle
  if (joinBtn) joinBtn.textContent = t.joinUs
  if (learnBtn) learnBtn.textContent = t.learnMore
}

// Load saved language on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("selectedLanguage") || "bs"
  languageSelect.value = savedLang
  updateLanguage(savedLang)
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.background = "var(--card)"
    navbar.style.backdropFilter = "none"
  }
})
