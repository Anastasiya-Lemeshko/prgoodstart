import { MODAL_CONTENT } from "./../_vars.js";

const renderPhotoToModal = (modal, button) => {
  const modalImgContainer = modal.querySelector('.modal-photo__img');
  const fullImgContainer = button.parentElement.querySelector('[data-full-photo]');

  if (!modalImgContainer || !fullImgContainer) return;

  const fullImg = fullImgContainer.querySelector('picture') || fullImgContainer.querySelector('img');
  if (!fullImg) return;

  const copyFullImg = fullImg.cloneNode(true);

  modalImgContainer.innerHTML = '';
  modalImgContainer.appendChild(copyFullImg);
};

const renderModalContent = (modal, button) => {
  // Отрисовка заголовка для модального окна
  if (button.hasAttribute('data-modal-title')) {
    const titleKey = button.getAttribute('data-modal-title');
    const modalTitle = modal.querySelector('[data-modal-title]');

    if (MODAL_CONTENT.title && MODAL_CONTENT.title[titleKey] && modalTitle) {
      modalTitle.textContent = MODAL_CONTENT.title[titleKey];
    };
  }

  // Отрисовка описания для модального окна
  if (button.hasAttribute('data-modal-desc')) {
    const descKey = button.getAttribute('data-modal-desc');
    const modalDesc = modal.querySelector('[data-modal-desc]');

    if (MODAL_CONTENT.title && MODAL_CONTENT.desc[descKey] && modalDesc) {
      modalDesc.textContent = MODAL_CONTENT.desc[descKey];
    };
  }

  // Отрисовка динамического заголовка
  if (button.hasAttribute('data-modal-dynamic')) {
    let sourceTitle = button.closest('[data-modal-title]');
    const modalTitle = modal.querySelector('[data-modal-title]');

    if (!sourceTitle) sourceTitle = button.parentElement.querySelector('[data-modal-title]');

    if (sourceTitle && modalTitle) {
      modalTitle.textContent = sourceTitle.textContent;
    };
  }

  // Отрисовка заголовка с паттерном
  if (button.hasAttribute('data-modal-pattern')) {
    let sourceTitle = button.closest('[data-modal-title]');
    const modalTitle = modal.querySelector('[data-modal-title]');
    const patternKey = button.getAttribute('data-modal-pattern');

    if (!sourceTitle) sourceTitle = button.parentElement.querySelector('[data-modal-title]');

    if (sourceTitle && modalTitle && MODAL_CONTENT.pattern[patternKey]) {
      const dynamicText = sourceTitle.textContent.trim();
      const pattern = MODAL_CONTENT.pattern[patternKey];
      modalTitle.textContent = pattern.replace('{title}', dynamicText);
    };
  }
};

export { renderPhotoToModal, renderModalContent };
