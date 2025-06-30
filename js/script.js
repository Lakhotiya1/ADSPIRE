document.addEventListener("DOMContentLoaded", function() {
    
    // ✅ Navbar Click Fix - Ensures Links Work Correctly
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function(event) {
            let href = this.getAttribute("href");

            // Agar "#" hai to preventDefault NAHI karega
            if (href === "#" || href.startsWith("#")) return;

            // Agar link empty ya invalid hai toh prevent karega
            if (!href || href.trim() === "") {
                event.preventDefault();
                console.warn("Invalid link:", href);
            }
        });
    });

    // ✅ Smooth Scrolling for Navbar Links
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            } else {
                console.warn("Element not found:", targetId);
                window.location.href = this.href;
            }
        });
    });

    // ✅ Auto-Sliding Testimonials
    let reviewIndex = 0;
    function showNextReview() {
        let reviews = document.querySelectorAll('.review-box');
        reviews.forEach(review => review.style.display = "none");
        reviewIndex = (reviewIndex + 1) % reviews.length;
        reviews[reviewIndex].style.display = "block";
    }
    setInterval(showNextReview, 5000);

    // ✅ Hide Welcome Screen After 2 Seconds
    setTimeout(function() {
        document.querySelector(".welcome-screen").classList.add("fade-out");
        setTimeout(function() {
            document.querySelector(".welcome-screen").style.display = "none";
            document.querySelector(".main-content").classList.remove("hidden");
        }, 1000);
    }, 2000);

    // ✅ WhatsApp Inquiry Function
    function openWhatsApp(productName) {
        let phoneNumber = "+919266895253";
        let message = `Hello, I am interested in ${productName}. Please provide more details.`;
        let url = `https://wa.me/${+919266895253}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    }
    window.openWhatsApp = openWhatsApp; // Function ko globally accessable banaya

    // ✅ Contact Form Validation
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const name = document.querySelector('input[type="text"]').value;
            const email = document.querySelector('input[type="email"]').value;
            const message = document.querySelector("textarea").value;

            if (!name.trim() || !email.trim() || !message.trim()) {
                alert("Please fill in all fields.");
                return;
            }

            alert("Your inquiry has been sent successfully!");
            form.reset();
        });
    }

    // ✅ Product Image Hover Effect
    document.querySelectorAll(".products img").forEach(img => {
        img.addEventListener("mouseover", function() {
            this.style.transform = "scale(1.1)";
            this.style.transition = "0.3s";
        });

        img.addEventListener("mouseout", function() {
            this.style.transform = "scale(1)";
        });
    });

   

    // ✅ Preloader Hide After 2 Seconds
    setTimeout(function() {
        document.getElementById("preloader").style.opacity = "0";
        setTimeout(function() {
            document.getElementById("preloader").style.display = "none";
        }, 1000);
    }, 2000);

});
// ✅ Auto-Detect Images & Open Lightbox
document.addEventListener("DOMContentLoaded", function () {
    // Sabhi "View Image" buttons ko select karo
    let viewButtons = document.querySelectorAll(".view-btn");

    // Har button ke liye event listener add karo
    viewButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            let productImage = document.querySelectorAll(".product-img")[index].src;
            openLightbox(productImage);
        });
    });
});

// ✅ Lightbox Open Function
function openLightbox(imageSrc) {
    let lightboxImg = document.getElementById("lightbox-img");
    let lightbox = document.getElementById("lightbox");

    if (imageSrc) {
        lightboxImg.src = imageSrc;
        lightbox.style.display = "flex";
    } else {
        console.error("Image source not found!");
    }
}

// ✅ Lightbox Close Function
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}