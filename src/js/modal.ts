/* eslint-disable no-param-reassign */
export {};

const closeModal = (modalEl: HTMLDivElement) => {
  modalEl.style.opacity = '0';
  modalEl.style.overflowY = 'inherit';
  modalEl.style.pointerEvents = 'none';
  document.body.style.overflowY = 'auto';
};

const openModal = (modalEl: HTMLDivElement) => {
  modalEl.style.opacity = '1';
  modalEl.style.overflowY = 'auto';
  modalEl.style.pointerEvents = 'auto';
  document.body.style.overflowY = 'hidden';
};

const modalElList = document.querySelectorAll('.modal');
const [policyModalEl, formModalEl] = modalElList;
const formModalWrapper = document.querySelector('.modal__form');
modalElList.forEach(modalEl => {
  modalEl.addEventListener('click', (e: Event) => {
    if (e.target === e.currentTarget || e.target === formModalWrapper) {
      const clickedModal = e.currentTarget as HTMLDivElement;
      closeModal(clickedModal);
    }
  });
});

const closeModalElList = document.querySelectorAll('.modal__close');
closeModalElList.forEach(closeEl => {
  closeEl.addEventListener('click', () => {
    modalElList.forEach(modalEL => {
      closeModal(modalEL as HTMLDivElement);
    });
  });
});

const formatBtnElList = document.querySelectorAll('.format__btn');
formatBtnElList.forEach(btn => {
  btn.addEventListener('click', () => {
    openModal(formModalEl as HTMLDivElement);
  });
});

const modalCallElList = document.querySelectorAll('.modal-form-call');
modalCallElList.forEach(el => {
  el.addEventListener('click', () => {
    openModal(formModalEl as HTMLDivElement);
  });
});

const policyCallElList = document.querySelectorAll('.policy-call');
policyCallElList.forEach(el => {
  el.addEventListener('click', () => {
    openModal(policyModalEl as HTMLDivElement);
  });
});

const presentBtnEl = document.querySelector('.js-present-btn');
const presentFormEl = document.querySelector('.js-present-form');
presentBtnEl?.addEventListener('click', () => {
  presentFormEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
