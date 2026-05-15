import { TEXTAREA_LINEHEIGHT, TABLET_WIDTH, DESKTOP_WIDTH } from "./../_vars.js";

const textareaFields = document.querySelectorAll('.textarea');

const setTextareaHeight = () => {
  if (!textareaFields || !textareaFields.length) return;

  textareaFields.forEach((field) => {
    const span = field.querySelector('span');
    const textarea = field.querySelector('textarea');

    if (!span || !textarea) return;

    const height = span.offsetHeight;
    const stringCount = Math.max(height / TEXTAREA_LINEHEIGHT);
    textarea.setAttribute('rows', stringCount)
  });
};

TABLET_WIDTH.addEventListener('change', setTextareaHeight);
DESKTOP_WIDTH.addEventListener('change', setTextareaHeight);

export { setTextareaHeight };
