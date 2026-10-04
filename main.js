/* ============================================================
   SWISS INTERNATIONAL — Shared JavaScript
   ============================================================ */

// ── Mobile Nav Toggle ──────────────────────────────────────
function initMobileNav() {
  const toggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    // Animate hamburger → X
    const spans = toggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

// ── Animate numbers counting up ───────────────────────────
function animateCounter(el) {
  const target = parseFloat(el.dataset.target || el.textContent.replace(/[^0-9.]/g, ''));
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();
  const isFloat = target % 1 !== 0;

  function frame(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = prefix + (isFloat ? value.toFixed(1) : Math.round(value).toLocaleString()) + suffix;
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ── FAQ Accordion ──────────────────────────────────────────
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const body    = item.querySelector('.faq-body');
    const icon    = item.querySelector('.faq-icon');
    if (!trigger || !body) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      body.style.maxHeight = isOpen ? body.scrollHeight + 'px' : '0';
      if (icon) icon.style.transform = isOpen ? 'rotate(45deg)' : 'rotate(0deg)';
      trigger.setAttribute('aria-expanded', isOpen);
    });
  });
}

// ── Smooth scroll for in-page anchors ─────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Intersection Observer for entrance animations ──────────
function initEntranceAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.5s ease-out, transform 0.5s ease-out; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }
    .reveal-delay-4 { transition-delay: 0.4s; }
  `;
  document.head.appendChild(style);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Notification bar dismiss ───────────────────────────────
function initAlertBar() {
  const bar = document.querySelector('.alert-bar[data-dismissible]');
  if (!bar) return;
  const close = bar.querySelector('.alert-bar__close');
  if (close) close.addEventListener('click', () => bar.remove());
}

// ── Tab switcher ───────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(container => {
    const triggers = container.querySelectorAll('[data-tab-trigger]');
    const panels   = container.querySelectorAll('[data-tab-panel]');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const target = trigger.dataset.tabTrigger;
        triggers.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.hidden = true);
        trigger.classList.add('active');
        const panel = container.querySelector(`[data-tab-panel="${target}"]`);
        if (panel) panel.hidden = false;
      });
    });

    // Activate first tab by default
    if (triggers.length) triggers[0].click();
  });
}

// ── Init all ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCounters();
  initFAQ();
  initSmoothScroll();
  initEntranceAnimations();
  initAlertBar();
  initTabs();
});
