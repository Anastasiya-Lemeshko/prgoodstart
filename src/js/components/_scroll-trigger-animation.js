import { DESKTOP_WIDTH } from "./../_vars.js";

const animatedElements = document.querySelectorAll('[data-animation]');

const getThreshold = () => {
  if (DESKTOP_WIDTH.matches) {
    return 0.6;
  }
  return 0.2;
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: getThreshold() });

const setScrollAnimation = () => {
  animatedElements.forEach((el) => observer.observe(el));
};

export { setScrollAnimation };
