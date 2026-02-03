// Load HTML includes with callback support
document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('[data-include]');
  let loadedCount = 0;
  const totalCount = elements.length;

  function onAllLoaded() {
    // Initialize contact form after all includes are loaded
    if (typeof window.initKontakForm === 'function') {
      // Small delay to ensure DOM is fully updated
      setTimeout(() => {
        window.initKontakForm();
      }, 100);
    }

    // Dispatch custom event for other scripts that need to know
    document.dispatchEvent(new CustomEvent('includesLoaded'));
  }

  function checkAllLoaded() {
    loadedCount++;
    if (loadedCount === totalCount) {
      onAllLoaded();
    }
  }

  if (totalCount === 0) {
    onAllLoaded();
    return;
  }

  elements.forEach(function (element) {
    const file = element.getAttribute('data-include');

    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${file}`);
        }
        return response.text();
      })
      .then(data => {
        element.innerHTML = data;
        checkAllLoaded();
      })
      .catch(error => {
        console.error('Error loading include:', error);
        element.innerHTML = '<!-- Failed to load ' + file + ' -->';
        checkAllLoaded();
      });
  });
});
