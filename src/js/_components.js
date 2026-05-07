import { toggleBurgerMenu } from './components/_open-mobile-menu.js';
import { openVisibleContent, setAccordeonToggles } from './components/_accordion.js';
import { setTabs } from './components/_tabs.js';
import { setNavigationSwiper } from './components/_navigation-swiper.js';
import { setMarquee } from './components/_marquee.js';

document.addEventListener('DOMContentLoaded', () => {
  toggleBurgerMenu();
  openVisibleContent();
  setAccordeonToggles();
  setTabs();
  setNavigationSwiper();
  setMarquee();
});
