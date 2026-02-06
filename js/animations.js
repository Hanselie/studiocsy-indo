// CSY mobile menu — event delegation (works when header loaded via include)
(function () {
  function openMenu() {
    var overlay = document.getElementById("csy-mobile-menu");
    var btn = document.querySelector(".csy-burger");
    if (!overlay || !btn) return;
    overlay.classList.add("is-open");
    btn.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close menu");
    overlay.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("csy-no-scroll");
  }

  function closeMenu() {
    var overlay = document.getElementById("csy-mobile-menu");
    var btn = document.querySelector(".csy-burger");
    if (!overlay || !btn) return;
    overlay.classList.remove("is-open");
    btn.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
    overlay.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("csy-no-scroll");
  }

  function toggleMenu() {
    var overlay = document.getElementById("csy-mobile-menu");
    if (!overlay) return;
    overlay.classList.contains("is-open") ? closeMenu() : openMenu();
  }

  document.addEventListener("click", function (e) {
    var overlay = document.getElementById("csy-mobile-menu");
    if (!overlay) return;

    if (e.target.closest(".csy-burger")) {
      e.preventDefault();
      toggleMenu();
      return;
    }
    if (e.target === overlay) {
      closeMenu();
      return;
    }
    if (e.target.closest("#csy-mobile-menu a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var overlay = document.getElementById("csy-mobile-menu");
    if (overlay && overlay.classList.contains("is-open")) closeMenu();
  });
})();

// Scroll progress bar
(function () {
  var bar = document.getElementById("scroll-progress");
  if (!bar) return;

  function onScroll() {
    var doc = document.documentElement;
    var scrollTop = doc.scrollTop || document.body.scrollTop;
    var scrollHeight = doc.scrollHeight - doc.clientHeight;
    var progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    bar.style.transform = "scaleX(" + progress + ")";
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// Dynamic Tab Title (Visibility Change)
(function () {
  const originalTitle = document.title;

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      document.title = "StudioCSY adalah studio produksi kreatif yang spesialis dalam video iklan dengan konversi tinggi, materi kreatif statis, dan konten UGC untuk brand e-commerce. Tingkatkan ROAS Anda dengan visual yang menghentikan scroll.";
    } else {
      document.title = originalTitle;
    }
  });
})();
