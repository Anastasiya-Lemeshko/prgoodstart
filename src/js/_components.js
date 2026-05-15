import { toggleBurgerMenu } from './components/_open-mobile-menu.js';
import { openVisibleContent, setAccordeonToggles } from './components/_accordion.js';
import { setTabs } from './components/_tabs.js';
import { setNavigationSwiper } from './components/_navigation-swiper.js';
import { setMarquee } from './components/_marquee.js';
import { setScrollAnimation } from './components/_scroll-trigger-animation.js';
import { playVideo } from './components/_video.js';
import { moveFooter } from './components/_move-footer.js';
import { setModals } from './components/_modal.js';
import { setTextareaHeight } from './components/_textarea-height.js';

document.addEventListener('DOMContentLoaded', () => {
  toggleBurgerMenu();
  openVisibleContent();
  setAccordeonToggles();
  setTabs();
  setNavigationSwiper();
  setMarquee();
  setScrollAnimation();
  playVideo();
  moveFooter();
  setModals();
  setTextareaHeight();
});

