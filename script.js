/* =========================================
   KARATE CLUB — script.js
   Premium interactions & modal logic
   ========================================= */

/* =========================================
   1. DARK THEME TOGGLE
   Looks for #theme-button on the page.
   ========================================= */
const themeBtn = document.getElementById('theme-button');

// Apply saved theme immediately on page load
if (localStorage.getItem('karate-theme') === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeBtn) themeBtn.textContent = 'Light Mode';
}

if (themeBtn) {
    themeBtn.addEventListener('click', function () {
        const isDark = document.body.classList.toggle('dark-theme');
        themeBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        localStorage.setItem('karate-theme', isDark ? 'dark' : 'light');
    });
}

/* =========================================
   2. SIDEBAR ACTIVE LINK
   Highlights the link matching current page.
   ========================================= */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.sidebar a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href.toLowerCase() === currentPage.toLowerCase()) {
        link.classList.add('active'); // Ensure you add `.sidebar a.active` to your CSS if you want it visually distinct!
    }
});

/* =========================================
   3. CONTACT FOOTER HIDE ALGORITHM
   Fades out the footer so it doesn't 
   overlap bottom text.
   ========================================= */
const footer = document.querySelector('.contact-footer');

if (footer) {
    window.addEventListener('scroll', function () {
        const scrollBottom = window.scrollY + window.innerHeight;
        const pageHeight   = document.documentElement.scrollHeight;
        if (scrollBottom >= pageHeight - 10) {
            footer.style.opacity = '0';
            footer.style.pointerEvents = 'none';
        } else {
            footer.style.opacity = '1';
            footer.style.pointerEvents = 'auto';
        }
    }, { passive: true }); // passive: true is a pro-tip that tells the browser not to lag while scrolling!
}

/* =========================================
   4. GALLERY LIGHTBOX MODAL
   Handles the click-to-expand image logic
   ========================================= */
const modal = document.getElementById("imageModal"); // Fixed ID to match HTML
const expandedImg = document.getElementById("modalImg"); // Fixed ID to match HTML
const closeBtn = document.querySelector(".close-modal");
const galleryImages = document.querySelectorAll(".gallery-image");

if (modal && galleryImages.length > 0) {
    galleryImages.forEach(function(img) {
        img.addEventListener("click", function() {
            modal.style.display = "flex";
            expandedImg.src = this.dataset.src || this.src; // Fallback to normal src if dataset is missing
            expandedImg.alt = this.alt;
        });
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            modal.style.display = "none";
        }
    });
}