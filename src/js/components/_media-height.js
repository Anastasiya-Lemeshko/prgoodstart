import { DESKTOP_WIDTH } from "./../_vars.js";

const media = document.querySelector('.media');
const tabsWrapper = media ? media.querySelector('.media__tabs-wrapper') : null;
const tablinksWrapper = media ? media.querySelector('.media__tablinks') : null;
const tablinksHeight = tablinksWrapper ? tablinksWrapper.scrollHeight : null;

const setMediaHeight = (contentHeight) => {
  if (!tabsWrapper || !tablinksWrapper) return;

  if (DESKTOP_WIDTH.matches) {
    tabsWrapper.style.height = '';
  } else {
    tabsWrapper.style.height = `${tablinksHeight + contentHeight}px`;
  }
};


export { setMediaHeight };

