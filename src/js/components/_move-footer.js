import { TABLET_WIDTH } from "./../_vars.js";

const footer = document.querySelector('.footer__bottom');
const logo =  footer ? footer.querySelector('.footer__logo') : null;

let isFooterMoved = false;

const moveFooter = () => {
  if (logo && TABLET_WIDTH.matches && !isFooterMoved) {
    footer.prepend(logo);

    isFooterMoved = true;
  }

  if (logo && !TABLET_WIDTH.matches && isFooterMoved) {
    footer.appendChild(logo);

    isFooterMoved = false;
  }
};

TABLET_WIDTH.addEventListener('change', moveFooter);

export { moveFooter };
