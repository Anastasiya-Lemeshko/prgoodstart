export default {
  windowEl: window,
  documentEl: document,
  htmlEl: document.documentElement,
  bodyEl: document.body,
}

export const TABLET_WIDTH = window.matchMedia('(min-width: 768px)');
export const SMALL_DESKTOP_WIDTH = window.matchMedia('(min-width: 1024px)');
export const DESKTOP_WIDTH = window.matchMedia('(min-width: 1366px)');

export const HEADER_FIXED_OFFSET = 500;

export const MODAL_TIMER = 3000000;

export const MODAL_CONTENT = {
  'title': {
    'individual-calc': 'Получите индивидуальный расчёт под ваш проект',
    'request': 'Оставьте заявку — мы подберём оптимальное решение для вашей перголы',
    'order': 'Закажите перголу с гарантией результата',
    'cost': 'Точная стоимость — для вашего проекта под ключ',
    'question': 'Не нашли нужной информации? Спросите нас напрямую',
    'design': 'Закажите перголу с индивидуальным дизайном',
  },
  'desc': {
    'question': 'Мы на связи и готовы помочь с выбором, расчётом или техническими нюансами.',
  },
  'pattern': {
    'individual-design': 'Заказать перголу {title} по индивидуальному дизайну',
  },
}

export const SLIDER_CONFIG = {
  'default': {
    'mobile_count': 1,
    'tablet_count': 2,
    'desktop_count': 3,
  },
  'marquee': {
    'mobile_count': 'auto',
    'tablet_count': 'auto',
    'desktop_count': 'auto',
    'freeMode': true,
    'loop': true,
    'desktop_width': SMALL_DESKTOP_WIDTH,
  },
};

export const RANGE_VALUES = {
  'default': {
    'min': 0,
    'max': 100,
    'step': 1,
    'start': 0,
    'end': 100,
  },
  'min-price': {
    'min': 350000,
    'max': 500000,
    'step': 10000,
    'start': 300000,
  },
  'max-price': {
    'min': 500000,
    'max': 700000,
    'step': 10000,
    'start': 450000,
  },
  'price': {
    'min': 350000,
    'max': 700000,
    'step': 10000,
    'start': 300000,
    'end': 700000,
  },
  'years': {
    'min': 1,
    'max': 24,
    'step': 1,
    'start': 1,
    'end': 24,
  },
  'people': {
    'min': 1,
    'max': 24,
    'step': 1,
    'start': 1,
    'end': 24,
  },
};

export const COUNT_GRID_COLUMNS = {
  default: 2,
  multiform: {
    mobile: 1,
    tablet: 2,
    desktop: 3
  },
};
