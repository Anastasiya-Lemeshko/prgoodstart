import { setMediaHeight } from './_media-height.js';
import { debounce } from './../_utils.js';

const accordionButtons = document.querySelectorAll('.accordion-button');

const openVisibleContent = () => {
  const visibleContent = document.querySelectorAll('.accordion-content--opened');

  if (!accordionButtons.length || !visibleContent.length) return;

  visibleContent.forEach((element) => {
    element.style.maxHeight = `${element.scrollHeight}px`;
    setMediaHeight(element.scrollHeight);
  });
};

const openDetails = (evt) => {
  const currentButton = evt.target.closest('button');
  const currentContent = currentButton.parentElement.querySelector('.accordion-content');

  const accordionContainer = currentButton.closest('.accordion');
  const isSingleMode = accordionContainer && accordionContainer.dataset.accordion === 'single';

  if (isSingleMode) {
    const allButtons = accordionContainer.querySelectorAll('.accordion-button');
    const allContents = accordionContainer.querySelectorAll('.accordion-content');

    allButtons.forEach((button) => {
      if (button !== currentButton) {
        button.classList.remove('accordion-button--active');
      }
    });

    allContents.forEach((content) => {
      if (content !== currentContent) {
        content.classList.remove('accordion-content--opened');
        content.style.maxHeight = null;
      }
    });
  }

  currentContent.classList.toggle('accordion-content--opened');
  currentButton.classList.toggle('accordion-button--active');

  if (currentContent.classList.contains('accordion-content--opened')) {
    currentContent.style.maxHeight = `${currentContent.scrollHeight}px`;
    setMediaHeight(currentContent.scrollHeight);
  } else {
    currentContent.style.maxHeight = null;
    setMediaHeight(0);
  }
};

const setAccordeonToggles = () => {
  if (!accordionButtons.length) return;

  accordionButtons.forEach((button) => {
    button.addEventListener('click', openDetails);
  });
};

// пересчет высоты при ресайзе
const recalcOpenedAccordionHeight = () => {
  const openedContents = document.querySelectorAll('.accordion-content--opened');
  if (!openedContents.length) return;

  openedContents.forEach((content) => {
    content.style.maxHeight = null;
    setTimeout(() => {
      content.style.maxHeight = `${content.scrollHeight}px`;
      if (typeof setMediaHeight === 'function') {
        setMediaHeight(content.scrollHeight);
      }
    }, 0);
  });
};

const debounsedRecalc = debounce(recalcOpenedAccordionHeight, 50);
window.addEventListener('resize', debounsedRecalc);

export { openVisibleContent, setAccordeonToggles, openDetails };
