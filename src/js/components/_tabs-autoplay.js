import { TABS_DELAY } from "./../_vars.js";
import { openDetails } from './_accordion.js';

const extendTabsWithAutoplay = (tab, tabLinks, tabContents) => {
  const isAccordion = tab.querySelector('.accordion');

  let intervalId = null;
  let currentIndex = 0;

  // функция при переключении таба
  const activateTab = (index) => {
    const targetLink = tabLinks[index];
    const section = targetLink.dataset.tab;

    tabLinks.forEach(link => link.classList.remove('tabs__tablink--active'));
    tabContents.forEach(content => content.classList.remove('tabs__tabcontent--active'));

    tab.querySelector(`[data-tab-content="${section}"]`).classList.add('tabs__tabcontent--active');
    targetLink.classList.add('tabs__tablink--active');
  };

  // автоматическое переключение
  intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % tabLinks.length;
    activateTab(currentIndex);

    if (isAccordion) {
      const currentButton = tabLinks[currentIndex];
      const fakeEvent = {
        target: currentButton
      };
      openDetails(fakeEvent);
    }
  }, TABS_DELAY);

  // остановка автоматического переключения
  tabLinks.forEach((link) => {
    link.addEventListener('click', () => {
      clearInterval(intervalId);
    });
  });
};

export { extendTabsWithAutoplay };