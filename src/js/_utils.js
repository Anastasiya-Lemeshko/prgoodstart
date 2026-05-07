import {
  SLIDER_CONFIG,
  DESKTOP_WIDTH,
  TABLET_WIDTH
} from './_vars.js';

const isEscapeKey = (evt) => evt.key === 'Escape';
const isArrowDownKey = (evt) => evt.key === 'ArrowDown';
const isArrowUpKey = (evt) => evt.key === 'ArrowUp';
const isEnterKey = (evt) => evt.key === 'Enter';
const isTabKey = (evt) => evt.key === 'Tab';

const getScrollWidth = () => {
  const div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  document.body.append(div);

  const scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;
};

const setTabIndex = (array) => {
  array.forEach((link) => {
    link.setAttribute('tabindex', '0');
  });
};

const removeTabIndex = (array) => {
  array.forEach((link) => {
    link.setAttribute('tabindex', '-1');
  });
};

const getSlidesCount = (swiper) => {
  const swiperList = swiper.querySelector('[class*="swiper-wrapper"]');
  return swiperList.children.length;
};

const getAutoSlidesCount = (swiper) => {
  const swiperSlide = swiper.querySelector('[class*="swiper-wrapper"] li');
  const slideWidth = swiperSlide.offsetWidth;
  return Math.floor(window.innerWidth / slideWidth);
}

const addSwiperClass = (swiper, el) => {
  const swiperWrapper = swiper.querySelector(`.${el}swiper-wrapper`);
  const swiperSlides = swiper.querySelectorAll(`.${el}slide`);

  swiper.classList.add('swiper');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.classList.remove('no-swiper');
  swiperSlides.forEach((slide) => {
    slide.classList.add('swiper-slide');
  });
};

const removeSwiperClass = (swiper, el) => {
  const swiperWrapper = swiper.querySelector(`.${el}swiper-wrapper`);
  const swiperSlides = swiper.querySelectorAll(`.${el}slide`);

  swiper.classList.remove('swiper');
  swiperWrapper.classList.remove('swiper-wrapper');
  swiperWrapper.classList.add('no-swiper');
  swiperSlides.forEach((slide) => {
    slide.classList.remove('swiper-slide');
  });
};

const getSwiperClass = (swiper) => {
  const className = swiper.className.split(' ').find(cls =>
    cls.includes('swiper') && cls !== 'swiper'
  );
  return className ? className.replace('swiper', '') : null;
};

const getBlockClass = (element) => {
  const className = element.className.split(' ').find(cls =>
    cls.includes('__') && !cls.endsWith('__')
  );

  if (className) {
    const prefix = className.split('__')[0];
    return prefix;
  }

  return null;
};

const findActiveSlides = (index, activeIndex, numberOfActiveSlides) => {
  for (let i = 0; i < numberOfActiveSlides; i++) {
    if (index === activeIndex + i) {
      return true;
    }
  }
  return false;
};

const setSlidesTabIndex = (swiper, countVisibleSlides) => {
  swiper.slides.forEach((slide, index) => {

    const isActive = findActiveSlides(index, swiper.activeIndex, countVisibleSlides);
    slide.querySelectorAll('a, button, input, textarea, select, [tabindex]')
      .forEach((el) => {
        el.tabIndex = isActive ? 0 : -1;
      });
  });
};

const checkVisibleSlides = (block) => {
  if (SLIDER_CONFIG[block]) {
    if (DESKTOP_WIDTH.matches) {
      return SLIDER_CONFIG[block].desktop_count;
    } else if (TABLET_WIDTH.matches) {
      return SLIDER_CONFIG[block].tablet_count;
    }
    return SLIDER_CONFIG[block].mobile_count;
  } else {
    return SLIDER_CONFIG.default;
  }
};

const formatNumber = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};

const setSwiperProgress = (swiper) => {
  const progressElement = swiper.el.querySelector('.swiper-progress');

  if (!progressElement) return;

  const activeIndex = swiper.realIndex;
  const totalSlides = swiper.slides.length;

  progressElement.textContent = `${formatNumber(activeIndex + 1)}/${formatNumber(totalSlides)}`;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  isEscapeKey,
  isArrowDownKey,
  isArrowUpKey,
  isEnterKey,
  isTabKey,
  getScrollWidth,
  setTabIndex,
  removeTabIndex,
  getSlidesCount,
  getAutoSlidesCount,
  addSwiperClass,
  removeSwiperClass,
  getSwiperClass,
  getBlockClass,
  setSlidesTabIndex,
  checkVisibleSlides,
  setSwiperProgress,
  debounce
};
