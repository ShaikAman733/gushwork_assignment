document.addEventListener("DOMContentLoaded", () => {
    const stickyProductHeader = document.getElementById("sticky-product-header");
    const foldHeight = window.innerHeight * 0.8; // Appears after passing most of the hero section
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        // "appears when scrolling beyond the first fold"
        if (currentScrollY > foldHeight) {
            // "disappear when scrolling back up" - Hide it when returning above the fold
            if (currentScrollY < lastScrollY) {
                stickyProductHeader.classList.remove("show"); // scrolling back up
            } else {
                stickyProductHeader.classList.add("show"); // scrolling down
            }
        } else {
            stickyProductHeader.classList.remove("show");
        }

        lastScrollY = currentScrollY;
    });
});

// 2. IMAGE CAROUSEL WITH HOVER ZOOM & NAVIGATION
const carouselImages = [
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80'
];

let currentImageIndex = 0;
const mainImg = document.getElementById('zoom-img');
const thumbContainer = document.getElementById('thumbnail-container');
const zoomPreviewBox = document.getElementById('zoom-preview-box');

function initCarousel() {
    thumbContainer.innerHTML = '';
    carouselImages.forEach((imgUrl, index) => {
        const thumb = document.createElement('div');
        thumb.className = `thumbnail ${index === currentImageIndex ? 'active' : ''}`;
        thumb.onclick = () => setImage(index);

        const img = document.createElement('img');
        img.src = imgUrl;
        thumb.appendChild(img);

        thumbContainer.appendChild(thumb);
    });
    mainImg.src = carouselImages[currentImageIndex];

    // Pre-load the zoom image background
    zoomPreviewBox.style.backgroundImage = `url(${carouselImages[currentImageIndex]})`;
}

function setImage(index) {
    currentImageIndex = index;
    mainImg.src = carouselImages[currentImageIndex];
    zoomPreviewBox.style.backgroundImage = `url(${carouselImages[currentImageIndex]})`;

    document.querySelectorAll('.thumbnail').forEach((t, i) => {
        if (i === currentImageIndex) t.classList.add('active');
        else t.classList.remove('active');
    });
}

function navigateCarousel(direction) {
    let newIndex = currentImageIndex + direction;
    if (newIndex < 0) newIndex = carouselImages.length - 1;
    if (newIndex >= carouselImages.length) newIndex = 0;
    setImage(newIndex);
}

initCarousel();

// Dedicated External Zoom Preview logic
const zoomContainer = document.getElementById('zoom-container');
zoomContainer.addEventListener('mousemove', (e) => {
    const rect = zoomContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    // Move the background image of the preview box
    zoomPreviewBox.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
    zoomPreviewBox.style.backgroundSize = '250%'; // Scale modifier for zoom depth
});

// 3. FAQ ACCORDION FUNCTIONALITY
function toggleFAQ(button) {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!isActive) {
        item.classList.add('active');
    }
}

// 4. APPLICATIONS CAROUSEL SCROLL
function scrollApps(direction) {
    const carousel = document.getElementById('apps-carousel');
    const cardWidth = 300 + 24;
    carousel.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}

// 5. MANUFACTURING PROCESS TABS
function switchProcessTab(btn, tabId) {
    const tabs = document.querySelectorAll('.process-tab');
    tabs.forEach(t => t.classList.remove('active'));

    const contents = document.querySelectorAll('.process-content');
    contents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// 6. MODAL FUNCTIONALITY
function openDownloadModal() {
    const modal = document.getElementById('downloadModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDownloadModal() {
    const modal = document.getElementById('downloadModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function openQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

window.addEventListener('click', (e) => {
    const downloadModal = document.getElementById('downloadModal');
    const quoteModal = document.getElementById('quoteModal');

    if (e.target === downloadModal) {
        closeDownloadModal();
    }
    if (e.target === quoteModal) {
        closeQuoteModal();
    }
});