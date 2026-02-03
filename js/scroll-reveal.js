/**
 * Global Scroll Reveal Animations
 * Adds smooth fade-in and slide-up animations to elements as they enter viewport
 */

(function () {
    'use strict';

    // Configuration
    const config = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // CSS for scroll reveal animations
    const style = document.createElement('style');
    style.textContent = `
    /* Scroll Reveal Animation Classes */
    .scroll-reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                  transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .scroll-reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }

    /* Stagger delays for multiple elements */
    .scroll-reveal.delay-1 { transition-delay: 0.1s; }
    .scroll-reveal.delay-2 { transition-delay: 0.2s; }
    .scroll-reveal.delay-3 { transition-delay: 0.3s; }
    .scroll-reveal.delay-4 { transition-delay: 0.4s; }
    .scroll-reveal.delay-5 { transition-delay: 0.5s; }
    .scroll-reveal.delay-6 { transition-delay: 0.6s; }
  `;
    document.head.appendChild(style);

    // Intersection Observer for scroll reveals
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Stop observing once revealed (one-time animation)
                observer.unobserve(entry.target);
            }
        });
    }, config);

    // Initialize scroll reveals
    function initScrollReveals() {
        // Find all elements with scroll-reveal class
        const revealElements = document.querySelectorAll('.scroll-reveal');

        revealElements.forEach(function (element) {
            observer.observe(element);
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollReveals);
    } else {
        initScrollReveals();
    }

    // Also run when dynamic content is loaded via include.js
    document.addEventListener('includesLoaded', initScrollReveals);

    // Re-scan for new elements (in case content is dynamically loaded)
    window.refreshScrollReveals = initScrollReveals;

})();
