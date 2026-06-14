const themeBtn = document.getElementById('theme-button');
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

/* 2. SIDEBAR ACTIVE LINK */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.sidebar a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href.toLowerCase() === currentPage.toLowerCase()) {
        link.classList.add('active'); 
    }
});

/* 3. GALLERY LIGHTBOX MODAL (With Slideshow) */
const modal = document.getElementById("imageModal");
const expandedImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close-modal");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const galleryImages = Array.from(document.querySelectorAll(".gallery-image"));
let currentIndex = 0; 

function showImage(index) {
    if (index < 0) {
        currentIndex = galleryImages.length - 1; 
    } else if (index >= galleryImages.length) {
        currentIndex = 0; 
    } else {
        currentIndex = index;
    }
    
    const targetImage = galleryImages[currentIndex];
    expandedImg.src = targetImage.dataset.src || targetImage.src;
    expandedImg.alt = targetImage.alt;
}

if (modal && galleryImages.length > 0) {
    galleryImages.forEach(function(img, index) {
        img.addEventListener("click", function() {
            modal.style.display = "flex";
            showImage(index); 
        });
    });

    if (prevBtn) prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    document.addEventListener("keydown", function(event) {
        if (modal.style.display === "flex") {
            if (event.key === "Escape") modal.style.display = "none";
            if (event.key === "ArrowLeft") showImage(currentIndex - 1);
            if (event.key === "ArrowRight") showImage(currentIndex + 1);
        }
    });
}