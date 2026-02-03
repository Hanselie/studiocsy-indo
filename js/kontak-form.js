// kontak-form.js - Contact Form Handler
// This script handles form validation and submission to Google Sheets

function initKontakForm() {
    const form = document.getElementById('kontakForm');
    const success = document.getElementById('success');
    const btn = document.getElementById('submitBtn');
    const reset = document.getElementById('reset');

    // Exit if form not found (not on this page yet)
    if (!form || !btn) {
        return false;
    }

    // Prevent multiple initializations
    if (form.dataset.initialized === 'true') {
        return true;
    }
    form.dataset.initialized = 'true';

    // Validation rules for each field
    const validations = {
        nama: v => v && v.trim().length >= 2,
        email: v => v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        brand: v => v && v.trim().length >= 2,
        produk: v => v && v.trim().length >= 2,
        telpon: v => v && v.replace(/\D/g, '').length >= 10
    };

    const scriptURL = "https://script.google.com/macros/s/AKfycbwjnAOQnzef-sELRJLOGt-Xg4PvY7kJcG7hpthQAbmGs7h88jc5HBUuW_1-15zuE_zTEw/exec";

    // Function to show/hide error for an input
    function setError(fieldName, hasError) {
        const input = document.getElementById(fieldName);
        const errorSpan = document.getElementById('error-' + fieldName);
        if (input && errorSpan) {
            if (hasError) {
                input.classList.add('input-error');
                errorSpan.classList.add('show');
            } else {
                input.classList.remove('input-error');
                errorSpan.classList.remove('show');
            }
        }
    }

    // Clear all errors
    function clearAllErrors() {
        ['nama', 'email', 'brand', 'produk', 'telpon'].forEach(field => {
            setError(field, false);
        });
    }

    // Real-time validation on blur and input
    ['nama', 'email', 'brand', 'produk', 'telpon'].forEach(fieldName => {
        const input = document.getElementById(fieldName);
        if (input) {
            input.addEventListener('blur', function () {
                const value = this.value;
                const isValid = validations[fieldName](value);
                setError(fieldName, !isValid && value.length > 0);
            });
            input.addEventListener('input', function () {
                // Clear error when user starts typing correctly
                if (validations[fieldName](this.value)) {
                    setError(fieldName, false);
                }
            });
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = new FormData(form);
        let hasErrors = false;

        // Validate each field and show inline errors
        ['nama', 'email', 'brand', 'produk', 'telpon'].forEach(fieldName => {
            const value = data.get(fieldName);
            const isValid = validations[fieldName](value);
            setError(fieldName, !isValid);
            if (!isValid) hasErrors = true;
        });

        if (hasErrors) {
            return;
        }

        btn.dataset.state = "loading";
        btn.disabled = true;

        try {
            const res = await fetch(scriptURL, {
                method: "POST",
                body: data
            });

            const text = await res.text();

            if (!res.ok || !text.includes("SUCCESS")) {
                throw new Error(text);
            }

            form.style.opacity = "0";
            form.style.transform = "scale(0.95)";

            setTimeout(() => {
                form.style.display = "none";
                success.style.opacity = "1";
                success.style.pointerEvents = "auto";
                success.style.transform = "scale(1)";
            }, 300);

        } catch (err) {
            console.error("Form submission error:", err);
            alert("Gagal kirim data: " + err.message);
        }

        btn.dataset.state = "";
        btn.disabled = false;
    });

    if (reset) {
        reset.onclick = () => {
            form.reset();
            clearAllErrors();
            success.style.opacity = "0";
            success.style.pointerEvents = "none";
            form.style.display = "flex";
            setTimeout(() => {
                form.style.opacity = "1";
                form.style.transform = "scale(1)";
            }, 50);
        };
    }

    console.log("Kontak form initialized successfully");
    return true;
}

// Export for use by include.js callback
window.initKontakForm = initKontakForm;
