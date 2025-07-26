// DOM Elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll("section")
const skillCards = document.querySelectorAll(".skill-card")
const contactForm = document.getElementById("contactForm")

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Active navigation link detection
function updateActiveNavLink() {
  let current = ""
  const scrollPosition = window.pageYOffset + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-section") === current) {
      link.classList.add("active")
    }
  })
}

// Scroll event listener
window.addEventListener("scroll", () => {
  updateActiveNavLink()
  animateOnScroll()
  animateSkillBars()
  updateNavbarBackground()
})

// Animate elements on scroll
function animateOnScroll() {
  const animateElements = document.querySelectorAll(".animate-in")

  animateElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible")
    }
  })
}

// Animate skill bars when in view
function animateSkillBars() {
  skillCards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top
    const cardVisible = 150

    if (cardTop < window.innerHeight - cardVisible) {
      const progressBar = card.querySelector(".skill-progress")
      const targetWidth = progressBar.getAttribute("data-width")

      if (!progressBar.style.width || progressBar.style.width === "0%") {
        setTimeout(() => {
          progressBar.style.width = targetWidth + "%"
        }, 300)
      }
    }
  })
}

// Update navbar background on scroll
function updateNavbarBackground() {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(15, 23, 42, 0.95)"
    navbar.style.borderBottomColor = "rgba(59, 130, 246, 0.3)"
  } else {
    navbar.style.background = "rgba(15, 23, 42, 0.8)"
    navbar.style.borderBottomColor = "rgba(59, 130, 246, 0.2)"
  }
}

// Contact form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const formObject = {}
  formData.forEach((value, key) => {
    formObject[key] = value
  })

  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent

  submitButton.textContent = "Sending..."
  submitButton.disabled = true
  submitButton.classList.add("loading")

  setTimeout(() => {
    alert("Thank you for your message! I'll get back to you soon.")
    contactForm.reset()
    submitButton.textContent = originalText
    submitButton.disabled = false
    submitButton.classList.remove("loading")
  }, 2000)
})

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  // Add animate-in class to elements that should animate
  const elementsToAnimate = [".about-content", ".skill-card", ".project-card", ".contact-content", ".hero-content"]

  elementsToAnimate.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("animate-in")
      // Stagger animations
      element.style.transitionDelay = `${index * 0.1}s`
    })
  })

  // Initial checks
  animateOnScroll()
  updateActiveNavLink()
  updateNavbarBackground()
})

// Add click event listeners to navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetSection = link.getAttribute("data-section")
    scrollToSection(targetSection)
  })
})

// Enhanced parallax effect for floating elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-element")

  parallaxElements.forEach((element, index) => {
    const speed = 0.3 + index * 0.1
    const yPos = -(scrolled * speed)
    element.style.transform = `translateY(${yPos}px) scale(${1 + scrolled * 0.0001})`
  })
})

// Add enhanced hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
    card.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Add subtle animation to skill icons
document.querySelectorAll(".skill-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    icon.style.transform = "scale(1.1) rotate(5deg)"
    icon.style.transition = "all 0.3s ease"
  })

  icon.addEventListener("mouseleave", () => {
    icon.style.transform = "scale(1) rotate(0deg)"
  })
})

// Intersection Observer for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const elementsToObserve = document.querySelectorAll(".animate-in")
  elementsToObserve.forEach((el) => observer.observe(el))
})
