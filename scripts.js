// ── translation ──
const lang = document.documentElement.dataset.lang;
const labels = {
  en: { more: 'Read More', less: 'Read Less' },
  pl: { more: 'Rozwiń',    less: 'Zwiń'      }
};


// ── Hamburger ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMenu();
});

// ── Scroll reveal ──
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── Navbar solid on scroll ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  const scrollY = window.scrollY;
  // płynne przejście między 0 a 300px scrolla
  const progress = Math.min(scrollY / 900, 1);
  nav.style.setProperty('--nav-progress', progress);
});

// ── Expand text section about ──
window.toggleAbout = function(btn) {
  const extra = document.querySelector('.about-extra');
  const shortParagraph = document.querySelector('.about-short');
  const decoDefault = document.getElementById('about-deco-default');
  const decoPeople = document.getElementById('about-deco-people');
  const isOpen = extra.classList.toggle('open');

  if (isOpen) {
    shortParagraph.style.display = 'none';
    decoDefault.classList.add('hide');
    decoPeople.classList.add('show');
  } else {
    shortParagraph.style.display = '';
    decoDefault.classList.remove('hide');
    decoPeople.classList.remove('show');
  }

  btn.textContent = isOpen ? labels[lang].less : labels[lang].more;
};

// ── Flip card in about section ──
window.flipCard = function(id) {
  const card = document.getElementById(id);
  card.classList.toggle('flipped');
};
