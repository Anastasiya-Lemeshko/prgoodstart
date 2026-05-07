import {
  isEscapeKey,
  isTabKey,
  isEnterKey,
} from '../_utils.js';
import { renderPhotoToModal, renderModalContent } from '../components/_modal-render.js';
import { TABLET_WIDTH, MODAL_TIMER } from "./../_vars.js";

class ModalWindow {
  constructor(buttons) {
    this.html = document.querySelector('html');
    this.buttons = buttons || [];
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;
  }

  handleOpen() {
    if (this.buttons.length === 0) return;

    this.buttons.forEach(button => {
      button.addEventListener('click', () => {
        const modalName = button.getAttribute('data-modal-button');

        if (!modalName) return;

        this.modal = document.querySelector(`[data-modal="${modalName}"]`);
        if (!this.modal) return;

        if (modalName === 'image-full' && !TABLET_WIDTH.matches) return;

        // проверка необходимости отрисовки элементов в модальном окне
        if (modalName === 'image-full') {
          renderPhotoToModal(this.modal, button);
        }
        renderModalContent(this.modal, button);

        this.modalWindow = this.modal.querySelector('.modal__container');
        this.closeBtn = this.modal.querySelector('.modal-close');

        const focusableElements = Array.from(this.modal.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'));
        this.firstFocusableElement = focusableElements[0];
        this.lastFocusableElement = focusableElements[focusableElements.length - 1];

        this.addEventListeners();
        this.openModal(this.modal);
      });

      // обработка enter, если вызов модалки идет через тег <a>
      if (button.tagName === 'A' && !button.href) {
        button.addEventListener('keydown', (evt) => {
          if (isEnterKey(evt)) {
            evt.preventDefault();
            button.click();
          }
        });
      }
    });
  }

  // открывает модальные окна по истечении таймера
  timerStart() {
    const subscribeModal = document.querySelector('[data-modal="subscribe"]');

    if (!subscribeModal) return;

    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);

      inactivityTimer = setTimeout(() => {
        const otherModalOpened = document.querySelector('.modal.open');
        if (otherModalOpened) return;

        this.modal = subscribeModal;
        this.modalWindow = subscribeModal.querySelector('.modal__container');
        this.closeBtn = subscribeModal.querySelector('.modal-close');

        const focusableElements = Array.from(subscribeModal.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'));
        this.firstFocusableElement = focusableElements[0];
        this.lastFocusableElement = focusableElements[focusableElements.length - 1];

        this.addEventListeners();
        this.openModal(subscribeModal);
      }, MODAL_TIMER);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('click', resetTimer);

    resetTimer();
  }

  addEventListeners() {
    if (!this.modal || !this.modalWindow || !this.closeBtn) return;

    // Закрытие по кнопке
    this.closeBtn.addEventListener('click', this.handleClose);

    // Закрытие по Escape
    this.escapeHandler = evt => {
      if (isEscapeKey(evt)) this.closeModal(this.modal);
    };

    window.addEventListener('keydown', this.escapeHandler);

    // Закрытие по клику вне модального окна
    this.modalWindow.addEventListener('click', evt => {
      evt.stopPropagation();
    });

    this.modal.addEventListener('click', this.handleOverlayClick);

    // Зацикливание фокуса
    this.modal.addEventListener('keydown', this.loopFocus);
  }

  removeEventListeners() {
    if (this.closeBtn) {
      this.closeBtn.removeEventListener('click', this.handleClose);
    }

    window.removeEventListener('keydown', this.escapeHandler);

    if (this.modal) {
      this.modal.removeEventListener('click', this.handleOverlayClick);
      this.modal.removeEventListener('keydown', this.loopFocus);
    }
  }

  handleClose = () => {
    this.closeModal(this.modal);
  };

  handleOverlayClick = evt => {
    if (evt.target === this.modal) {
      this.closeModal(this.modal);
    }
  };

  loopFocus = evt => {
    if (!isTabKey(evt)) {
      return;
    }

    if (isTabKey(evt) && evt.shiftKey && document.activeElement === this.firstFocusableElement) {
      evt.preventDefault();
      this.lastFocusableElement.focus();
    } else if (isTabKey(evt) && !evt.shiftKey && document.activeElement === this.lastFocusableElement) {
      evt.preventDefault();
      this.firstFocusableElement.focus();
    }
  }

  openModal(modal) {
    if (!modal) return;

    modal.classList.add('open');
    this.closeBtn.focus();
  }

  openModalSuccess(modalSuccess) {
    if (!modalSuccess) return;

    this.closeAllModal();

    this.modal = modalSuccess;

    this.modalWindow = this.modal.querySelector('.modal__container');
    this.closeBtn = this.modal.querySelector('.modal-close');

    const focusableElements = Array.from(this.modal.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'));
    this.firstFocusableElement = focusableElements[0];
    this.lastFocusableElement = focusableElements[focusableElements.length - 1];

    this.addEventListeners();
    this.openModal(this.modal);
  }

  closeModal(modal) {
    if (!modal) return;

    modal.classList.remove('open');
    this.removeEventListeners();
  }

  closeAllModal() {
    const allModal = document.querySelectorAll('.modal');

    if (!allModal) return;

    allModal.forEach(el => {
      if (el.classList.contains('open')) {
        el.classList.remove('open');
      }
    });

    this.removeEventListeners();
  }

  init() {
    this.handleOpen();
    this.timerStart();
  }
}

const setModals = () => {
  const openButtons = document.querySelectorAll('[data-modal-button]');
  const modalWindow = new ModalWindow(openButtons);
  const modalSuccess = document.querySelector('[modal-success]');
  modalWindow.init();

  // Проверка наличия jQuery
  if (typeof jQuery === 'undefined' && typeof $ === 'undefined') {
    console.warn('jQuery is not loaded.');
    return;
  }

  $(document).on('af_complete', (evt, res) => {
    if (modalSuccess) if (res.success) modalWindow.openModalSuccess(modalSuccess);
  });
};

export { setModals };
