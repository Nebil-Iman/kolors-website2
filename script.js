// Kolor The Barber — site interactions
// 1. Header state on scroll
// 2. Mobile nav toggle
// 3. Scroll-reveal via IntersectionObserver
// 4. Footer year

document.addEventListener('DOMContentLoaded', () => {

  // --- Footer year ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Header scrolled state ---
  const header = document.getElementById('site-header');
  const setHeaderState = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  // --- Mobile nav toggle ---
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close mobile nav when a link is tapped
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // --- Scroll reveal ---
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything immediately
    revealEls.forEach(el => el.classList.add('in-view'));
  }

});
