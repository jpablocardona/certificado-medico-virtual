// Certificado Médico Virtual — animaciones de scroll

// Hamburger menu
(function () {
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  // Cerrar al hacer clic en un enlace del menú
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    });
  });

  // Cerrar al hacer clic fuera
  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    }
  });
})();
(function () {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Contador animado (ej: años de experiencia)
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count-to"), 10);
    if (isNaN(target)) return;
    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }
    var duration = 1200;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    window.requestAnimationFrame(step);
  }

  var countEls = document.querySelectorAll("[data-count-to]");
  var revealEls = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    countEls.forEach(function (el) { el.textContent = el.getAttribute("data-count-to"); });
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var countObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  countEls.forEach(function (el) { countObserver.observe(el); });

  var revealObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) { revealObserver.observe(el); });
})();
