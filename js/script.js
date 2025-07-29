// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const nav = document.querySelector(".nav")
const tabButtons = document.querySelectorAll(".tab-btn")
const tabContents = document.querySelectorAll(".tab-content")
const chatbotToggle = document.querySelector(".chatbot-toggle")
const chatbot = document.querySelector(".chatbot")
const chatbotForm = document.getElementById("chatbot-form")
const chatbotInput = document.getElementById("chatbot-message-input")
const chatbotMessages = document.getElementById("chatbot-messages")
const musicButton = document.getElementById("music-button")
const backgroundMusic = document.getElementById("background-music")
const currentYearElements = document.querySelectorAll("#current-year")
const contactForm = document.getElementById("contact-form")
const formSuccess = document.getElementById("form-success")
const galleryItems = document.querySelectorAll(".gallery-item")
const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightbox-img")
const lightboxCaption = document.getElementById("lightbox-caption")
const lightboxClose = document.getElementById("lightbox-close")
const lightboxPrev = document.getElementById("lightbox-prev")
const lightboxNext = document.getElementById("lightbox-next")

// Initialize current year
currentYearElements.forEach((el) => {
  el.textContent = new Date().getFullYear()
})

// Mobile Menu Toggle
function initMobileMenu() {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active")
    nav.classList.toggle("active")
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".header-content")) {
      mobileMenuToggle.classList.remove("active")
      nav.classList.remove("active")
    }
  })
}

// Tabs
function initTabs() {
  if (tabButtons.length === 0) return

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      button.classList.add("active")
      const tabId = button.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")
    })
  })
}

// Chatbot
function initChatbot() {
  chatbotToggle.addEventListener("click", () => {
    chatbotToggle.classList.toggle("active")
    chatbot.classList.toggle("active")
  })

  chatbotForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const message = chatbotInput.value.trim()
    if (!message) return

    // Add user message
    addChatMessage(message, "user")
    chatbotInput.value = ""

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I'm sorry, I didn't understand that. Can you please try asking something else?"

      const lowerMsg = message.toLowerCase()

      if (lowerMsg.includes("menu") || lowerMsg.includes("food") || lowerMsg.includes("dish")) {
        botResponse =
          "Our menu features authentic Nepali dishes like Momo, Dal Bhat, Thukpa, and more. You can view our full menu on the Menu page."
      } else if (lowerMsg.includes("reservation") || lowerMsg.includes("book") || lowerMsg.includes("table")) {
        botResponse =
          "We'd be happy to reserve a table for you! Please call us at (123) 456-7890 or visit our Contact page to make a reservation."
      } else if (lowerMsg.includes("location") || lowerMsg.includes("address") || lowerMsg.includes("where")) {
        botResponse =
          "We're located at 123 Himalayan Street, Kathmandu Valley, 44600. You can find directions on our Contact page."
      } else if (lowerMsg.includes("hour") || lowerMsg.includes("open") || lowerMsg.includes("time")) {
        botResponse =
          "We're open Monday to Thursday from 11:00 AM to 10:00 PM, Friday to Saturday from 11:00 AM to 11:00 PM, and Sunday from 12:00 PM to 9:00 PM."
      }

      addChatMessage(botResponse, "bot")
    }, 1000)
  })

  function addChatMessage(message, type) {
    const messageDiv = document.createElement("div")
    messageDiv.classList.add("message", type)
    messageDiv.innerHTML = `<p>${message}</p>`
    chatbotMessages.appendChild(messageDiv)
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
  }
}

// Background Music
function initMusicToggle() {
  let isPlaying = false

  musicButton.addEventListener("click", () => {
    if (isPlaying) {
      backgroundMusic.pause()
      musicButton.classList.remove("playing")
    } else {
      backgroundMusic.play().catch((e) => {
        console.log("Audio play failed:", e)
      })
      musicButton.classList.add("playing")
    }
    isPlaying = !isPlaying
  })
}

// Contact Form
function initContactForm() {
  if (!contactForm) return

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Simulate form submission
    setTimeout(() => {
      contactForm.style.display = "none"
      formSuccess.classList.add("active")
    }, 1000)
  })
}

// Gallery Lightbox
function initGallery() {
  if (galleryItems.length === 0) return

  let currentIndex = 0

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentIndex = index
      const img = item.querySelector("img")
      const caption = item.querySelector(".gallery-caption").textContent

      lightboxImg.src = img.src
      lightboxCaption.textContent = caption
      lightbox.classList.add("active")
    })
  })

  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active")
  })

  lightboxPrev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
    updateLightbox()
  })

  lightboxNext.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryItems.length
    updateLightbox()
  })

  function updateLightbox() {
    const img = galleryItems[currentIndex].querySelector("img")
    const caption = galleryItems[currentIndex].querySelector(".gallery-caption").textContent

    lightboxImg.src = img.src
    lightboxCaption.textContent = caption
  }

  // Close lightbox with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      lightbox.classList.remove("active")
    }
  })
}

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll("[data-aos]")

  if (animatedElements.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

// Initialize all functions
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu()
  initTabs()
  initChatbot()
  initMusicToggle()
  initContactForm()
  initGallery()
  initScrollAnimations()
})


function handleItemClick(name, price) {
  addToCart(name, price);                  // ✅ Add to cart
  window.location.href = "addtocart.html"; // ✅ Redirect to cart page
}

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}
 let cart = JSON.parse(localStorage.getItem('cart')) || [];

        function renderCart() {
            const tbody = document.getElementById('cart-body');
            let total = 0;
            tbody.innerHTML = '';

            cart.forEach((item, index) => {
                const subtotal = item.price * item.qty;
                total += subtotal;

                const row = `
                    <tr>
                        <td style="border: 1px solid var(--border-color); padding: var(--spacing-sm);">${item.name}</td>
                        <td style="border: 1px solid var(--border-color); padding: var(--spacing-sm);">$${item.price.toFixed(2)}</td>
                        <td style="border: 1px solid var(--border-color); padding: var(--spacing-sm);">${item.qty}</td>
                        <td style="border: 1px solid var(--border-color); padding: var(--spacing-sm);">$${subtotal.toFixed(2)}</td>
                        <td style="border: 1px solid var(--border-color); padding: var(--spacing-sm);">
                            <button onclick="removeFromCart(${index})" style="background-color: var(--primary-color); color: white; border: none; padding: 6px 10px; border-radius: var(--border-radius); cursor: pointer;">Remove</button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });

            document.getElementById('total').innerText = 'Total: $' + total.toFixed(2);
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }

        renderCart();
// add by me
function showCartPreview() {
    const preview = document.getElementById("cart-preview");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    preview.innerHTML = "";

    if (cart.length === 0) {
        preview.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.innerHTML = `<strong>${item.name}</strong> x ${item.qty}`;
            preview.appendChild(itemDiv);
        });
    }

    preview.classList.remove("hidden");
    preview.classList.add("visible");
}

function hideCartPreview() {
    const preview = document.getElementById("cart-preview");
    preview.classList.remove("visible");
    preview.classList.add("hidden");
}
function proceedToPayment() {
    // alert("Redirecting to payment gateway...");
    window.location.href = "payment.html"; // Optional redirect
}


