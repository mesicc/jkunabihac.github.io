// Theme Toggle Functionality
const themeToggle = document.querySelector(".theme-toggle")
const html = document.documentElement

// Check localStorage and system preference on load
function initTheme() {
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = stored === "dark" || (!stored && prefersDark)

    if (shouldBeDark) {
        html.classList.add("dark")
    } else {
        html.classList.remove("dark")
    }
}

// Toggle theme
function toggleTheme() {
    const isDark = html.classList.contains("dark")

    if (isDark) {
        html.classList.remove("dark")
        localStorage.setItem("theme", "light")
    } else {
        html.classList.add("dark")
        localStorage.setItem("theme", "dark")
    }
}

// Dodatna provera da li element postoji pre dodavanja event listenera
if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
}


// Initialize theme on page load
initTheme()

// Mobile Menu Functionality
const hamburger = document.querySelector(".hamburger")
const mobileMenu = document.querySelector(".mobile-menu")
const mobileOverlay = document.querySelector(".mobile-overlay")
const mobileLinks = document.querySelectorAll(".mobile-link")

// Toggle mobile menu
function toggleMenu() {
    hamburger.classList.toggle("active")
    mobileMenu.classList.toggle("active")
    mobileOverlay.classList.toggle("active")

    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = ""
    }
}

// Close mobile menu
function closeMenu() {
    hamburger.classList.remove("active")
    mobileMenu.classList.remove("active")
    mobileOverlay.classList.remove("active")
    document.body.style.overflow = ""
}

// Dodatna provera da li element postoji pre dodavanja event listenera
if (hamburger) {
    hamburger.addEventListener("click", toggleMenu)
}
if (mobileOverlay) {
    mobileOverlay.addEventListener("click", closeMenu)
}


// Close menu when clicking on a link
mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu)
})

// Close menu on escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("active")) {
        closeMenu()
    }
})

// Handle window resize
let resizeTimer
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
        // Zatvori mobilni meni ako se prozor proširi na desktop veličinu (npr. 1024px)
        if (window.innerWidth >= 1024) {
            closeMenu()
        }
    }, 250)
})