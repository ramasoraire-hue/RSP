/* Small enhancements; content, contact links and disclosures work without JS. */
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#nav-principal');
const compactScreen = window.matchMedia('(max-width: 800px)');

if (menuButton && navigation) {
  const setMenu = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('.menu-label').textContent = open ? 'Cerrar' : 'Menú';
    navigation.hidden = compactScreen.matches && !open;
  };
  const syncNavigation = () => {
    menuButton.hidden = !compactScreen.matches;
    setMenu(false);
  };
  menuButton.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a') && compactScreen.matches) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });
  compactScreen.addEventListener('change', syncNavigation);
  syncNavigation();
}

const trainingVideos = [...document.querySelectorAll('.film-frame video')];
trainingVideos.forEach((video) => {
  video.addEventListener('play', () => {
    trainingVideos.forEach((other) => { if (other !== video) other.pause(); });
  });
});

