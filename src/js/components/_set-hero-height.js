import { TABLET_WIDTH } from "./../_vars.js";

const setHeroHeight = () => {
  const heroImg = document.querySelector('.hero__img');
  if (!heroImg || TABLET_WIDTH.matches) return;

  const setHeight = () => {
    const minHeight = Math.max(window.innerHeight, 450);
    heroImg.style.minHeight = `${minHeight}px`;
  };

  setHeight();
};

export { setHeroHeight };
