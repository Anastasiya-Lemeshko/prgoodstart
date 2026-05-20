import { TABLET_WIDTH } from '../_vars.js';
import { debounce } from './../_utils.js';

const grid = document.querySelectorAll('[data-align="grid"]');

const alignGridComponents = () => {
  if (!grid || !grid.length || !TABLET_WIDTH.matches) return;

  grid.forEach((item) => {
    const gridTitles = item.querySelectorAll('[data-align="title"]');
    const gridText = item.querySelectorAll('[data-align="text"]');

    let minTitleHeight = 0;
    let minTextHeight = 0;

    if (gridTitles && gridTitles.length) {
      gridTitles.forEach((title) => {
        title.style.minHeight = 'unset';
        minTitleHeight = Math.max(minTitleHeight, title.offsetHeight);
      });

      gridTitles.forEach((title) => {
        title.style.minHeight = `${minTitleHeight}px`;
      });
    }

    if (gridText && gridText.length) {
      gridText.forEach((text) => {
        text.style.minHeight = 'unset';
        minTextHeight = Math.max(minTextHeight, text.offsetHeight);
      });

      gridText.forEach((text) => {
        text.style.minHeight = `${minTextHeight}px`;
      });
    }
  });
};

const debouncedAlign = debounce(alignGridComponents, 100);

window.addEventListener('resize', debouncedAlign);

export { alignGridComponents };