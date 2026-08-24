// ==========================================================================
// Sakib Ahamad — Portfolio interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const cursorGlow = document.getElementById('cursorGlow');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar scroll state
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('mobile-open');
    });
    navLinkEls.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // Cursor glow follow (desktop only)
  if (cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // Active nav link on scroll (IntersectionObserver)
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinkEls.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((sec) => sectionObserver.observe(sec));

  // Reveal-on-scroll animation
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // Typed-text hero effect
  const typedTextEl = document.getElementById('typedText');
  const roles = [
    'Software Engineer',
    'Backend Developer',
    'Frappe & ERPNext Developer'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeLoop = () => {
    if (!typedTextEl) return;
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typedTextEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      charIndex--;
      typedTextEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 90);
  };
  typeLoop();

  // Contact form (client-side only — wire to a backend/service as needed)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      if (!formNote) return;
      formNote.textContent = `Thanks${name ? ', ' + name : ''}! Your message is ready — please email it to sakib10.cse@yahoo.com.`;
      window.location.href = `mailto:sakib10.cse@yahoo.com?subject=${encodeURIComponent(form.subject.value || 'Portfolio contact')}&body=${encodeURIComponent(form.message.value + '\n\n— ' + name + ' (' + form.email.value + ')')}`;
    });
  }
});
