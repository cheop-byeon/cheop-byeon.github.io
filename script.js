// Theme toggle — defaults to light; remembers the viewer's choice
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀'; // sun — click to go light
  } else {
    root.removeAttribute('data-theme');
    themeToggle.textContent = '☽'; // moon — click to go dark
  }
}

applyTheme(localStorage.getItem('theme') || 'light');

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
navToggle.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});
navMobile.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => navMobile.classList.remove('open'));
});

// Role rotator
const roles = [
  'AI Engineer',
  'PhD Researcher in Generative AI',
  'LLM & RAG Systems Engineer',
  '.NET / C# Developer',
];
let roleIndex = 0;
const roleEl = document.getElementById('roleText');
setInterval(() => {
  roleIndex = (roleIndex + 1) % roles.length;
  roleEl.style.opacity = 0;
  setTimeout(() => {
    roleEl.textContent = roles[roleIndex];
    roleEl.style.opacity = 1;
  }, 250);
}, 2800);
roleEl.style.transition = 'opacity 0.25s ease';

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Prism pipeline diagram — animate in once scrolled into view
const prismDiagram = document.getElementById('prismDiagram');
if (prismDiagram) {
  const diagramObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        prismDiagram.classList.add('in-view');
        diagramObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });
  diagramObserver.observe(prismDiagram);
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
