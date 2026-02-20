/* --- Header: esconde no scroll down (desktop), aparece no scroll up --- */
const header = document.querySelector('.header');
let lastScroll = 0;

function onScroll() {
  const currentScroll = window.scrollY;
  const isMobile = window.innerWidth <= 768;

  // Fundo escuro após 50px (todos os dispositivos)
  header.classList.toggle('scrolled', currentScroll > 50);

  // Esconder/mostrar apenas no desktop
  if (!isMobile) {
    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrollando para BAIXO → esconde o header
      header.classList.add('header--hidden');
    } else {
      // Scrollando para CIMA → mostra o header
      header.classList.remove('header--hidden');
    }
  } else {
    // Mobile: nunca esconde o header (menu toggle cuida disso)
    header.classList.remove('header--hidden');
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll;
}

window.addEventListener('scroll', onScroll, { passive: true });

/* --- Menu mobile com overlay --- */
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
const overlay = document.getElementById('navOverlay');

function closeMenu() {
  menu.classList.remove('open');
  toggle.classList.remove('active');
  overlay.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (toggle && menu) {
  toggle.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    overlay.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  overlay.addEventListener('click', closeMenu);

  menu.querySelectorAll('.nav__link, .nav__cta').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
}