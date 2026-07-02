// Certificado Médico Virtual — animaciones de scroll
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
