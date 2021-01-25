export {};

const nameLabelEl = document.querySelector(
  '.thanks__user-name',
) as HTMLSpanElement | null;

if (nameLabelEl) {
  nameLabelEl.textContent = localStorage.getItem('userName')
    ? `${localStorage.getItem('userName')?.toUpperCase()}, `
    : '';
}
