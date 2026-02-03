// Testimonial Carousel Arrow Navigation
function initTestimonialCarousel() {
    const carousel = document.getElementById('testimonial-carousel');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');

    if (!carousel || !prevBtn || !nextBtn) {
        console.log('Testimonial carousel elements not found yet');
        return false;
    }

    // Prevent multiple initializations
    if (carousel.dataset.initialized === 'true') {
        return true;
    }
    carousel.dataset.initialized = 'true';

    // Get card width for scroll amount
    const getScrollAmount = () => {
        const card = carousel.querySelector('.testimonial-card');
        if (card) {
            return card.offsetWidth + 28; // card width + gap
        }
        return 340; // fallback
    };

    // Scroll left
    prevBtn.addEventListener('click', function () {
        carousel.scrollBy({
            left: -getScrollAmount(),
            behavior: 'smooth'
        });
    });

    // Scroll right
    nextBtn.addEventListener('click', function () {
        carousel.scrollBy({
            left: getScrollAmount(),
            behavior: 'smooth'
        });
    });

    console.log('Testimonial carousel arrows initialized');
    return true;
}

// Try to initialize on various events
document.addEventListener('DOMContentLoaded', function () {
    initTestimonialCarousel();
});

// Also listen for includesLoaded event (fired by include.js)
document.addEventListener('includesLoaded', function () {
    initTestimonialCarousel();
});

// Fallback: try again after a short delay
setTimeout(function () {
    initTestimonialCarousel();
}, 500);

// Export for global access
window.initTestimonialCarousel = initTestimonialCarousel;
