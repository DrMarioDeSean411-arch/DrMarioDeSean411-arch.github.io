/* Motion layer for the jazz theme. Safe to delete: the site works without it. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reading progress bar
  var bar = document.createElement('div');
  bar.className = 'jz-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // Scroll reveal
  if (reduce || !('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll(
    '.page__content > h2, .page__content > h3, .page__content > p, .page__content > ul, .page__content > ol'
  );
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      // Reveal on entry, and also anything already scrolled past (fast jumps, End key)
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        entry.target.classList.add('jz-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

  targets.forEach(function (el, i) {
    el.classList.add('jz-reveal');
    el.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms';
    io.observe(el);
  });
})();
