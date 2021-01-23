/* eslint-disable no-param-reassign */
export const calcPosX = (posX: number, step: number) => posX + posX / step;

export const toggleFormElements = (form: HTMLFormElement, status: boolean) => {
  const inputs = [...form.getElementsByTagName('input')];
  inputs.forEach(input => {
    input.disabled = status;
  });
  const selects = [...form.getElementsByTagName('select')];
  selects.forEach(select => {
    select.disabled = status;
  });
  const textareas = [...form.getElementsByTagName('textarea')];
  textareas.forEach(textarea => {
    textarea.disabled = status;
  });
  const buttons = [...form.getElementsByTagName('button')];
  buttons.forEach(button => {
    button.disabled = status;
  });
};
