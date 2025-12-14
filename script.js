// Randomize the .pagina background image on every reload and manage nav UI.
document.addEventListener('DOMContentLoaded', () => {
  const paginaSections = document.querySelectorAll('.pagina');
  const backgrounds = [
    {
      url: 'imagenes/NS02b.png',
      position: '-20px -10px',
      size: '70%',
      mobileSize: 'cover'
    },
    {
      url: 'imagenes/NS03b.png',
      position: '-240px -20px',
      size: 'cover',
      mobileSize: 'cover'
    }
  ];

  const chosenBackground = paginaSections.length
    ? backgrounds[Math.floor(Math.random() * backgrounds.length)]
    : null;

  const applyBackgroundStyles = () => {
    if (!chosenBackground) {
      return;
    }
    const isMobile = window.innerWidth <= 700;
    const targetSize = isMobile && chosenBackground.mobileSize
      ? chosenBackground.mobileSize
      : chosenBackground.size;

    paginaSections.forEach((section) => {
      section.style.backgroundImage = `url("${chosenBackground.url}")`;
      section.style.backgroundPosition = chosenBackground.position;
      section.style.backgroundSize = targetSize;
    });
  };

  applyBackgroundStyles();
  window.addEventListener('resize', applyBackgroundStyles);

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('#nav-menu');
  const submenuButtons = document.querySelectorAll('.submenu-toggle');

  const closeMenu = () => {
    if (!navMenu || !navToggle) {
      return;
    }
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  const closeSubmenus = () => {
    document.querySelectorAll('.has-submenu').forEach((item) => {
      item.classList.remove('submenu-open');
    });
    submenuButtons.forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
    });
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen.toString());
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
        closeSubmenus();
      });
    });
  }

  submenuButtons.forEach((button) => {
    const parentLi = button.closest('.has-submenu');
    const submenu = parentLi?.querySelector('ul');
    if (!parentLi || !submenu) {
      return;
    }

    button.addEventListener('click', (event) => {
      if (window.innerWidth > 700) {
        return;
      }
      event.preventDefault();
      const isOpen = parentLi.classList.toggle('submenu-open');
      button.setAttribute('aria-expanded', isOpen.toString());
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) {
      closeMenu();
      closeSubmenus();
    }
  });
});
