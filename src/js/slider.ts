import calcPosX from './utils';

const imagesLength = 10;
let currentImage = 1;
const mode = 2;

const initTranslateXPos = -200;
let translateXPos = -200;
const translateStep = 100 / mode;
let offset: number;
let posInit: number;
let isDragging = false;

const imagesBoxEl = document.querySelector('.slider__img-box') as HTMLDivElement;
const mainImagesBoxEl = document.querySelector('.slider__main-img-box') as HTMLDivElement;
const wrapperEl = document.querySelector('.slider__wrapper') as HTMLDivElement;

let wrapperCoords = wrapperEl.getBoundingClientRect();
let wrapperLeftCoords = wrapperCoords.left;
let wrapperWidth = wrapperCoords.width;

const prevBtnEl = document.querySelector('.slider__btn-prev') as HTMLButtonElement;
const nextBtnEl = document.querySelector('.slider__btn-next') as HTMLButtonElement;

const blockBtns = () => {
  nextBtnEl.disabled = true;
  prevBtnEl.disabled = true;
};

const activateBtns = () => {
  nextBtnEl.disabled = false;
  prevBtnEl.disabled = false;
};

window.addEventListener('resize', () => {
  wrapperCoords = wrapperEl.getBoundingClientRect();
  wrapperLeftCoords = wrapperCoords.left;
  wrapperWidth = wrapperCoords.width;
});

const imagesList = [...document.querySelectorAll('.slider__img-item')];

const imageClickHandler = (e: Event) => {
  const divEl = e.currentTarget as HTMLDivElement;
  const { imgId } = divEl.dataset;

  mainImagesBoxEl.style.transform = `translate3d(${-(Number(imgId) - 1) * 100}%, 0px, 0px)`;
};

imagesList.forEach(el => {
  el.addEventListener('click', imageClickHandler);
});

const dragAction = (e: MouseEvent) => {
  imagesList.forEach(el => {
    el.removeEventListener('click', imageClickHandler);
  });
  const posX = e.pageX - wrapperLeftCoords;
  offset = ((posInit - posX) / wrapperWidth) * 100;
  const newTranslateXPos = translateXPos - offset;
  imagesBoxEl.style.transform = `translate3d(${calcPosX(newTranslateXPos, translateStep)}%, 0px, 0px)`;
};

const swipeAction = (e: TouchEvent) => {
  imagesList.forEach(el => {
    el.removeEventListener('click', imageClickHandler);
  });
  const posX = e.touches[0].clientX - wrapperLeftCoords;
  offset = ((posInit - posX) / wrapperWidth) * 100;
  const newTranslateXPos = translateXPos - offset;
  imagesBoxEl.style.transform = `translate3d(${calcPosX(newTranslateXPos, translateStep)}%, 0px, 0px)`;
};

const dragStart = (e: MouseEvent) => {
  isDragging = true;
  posInit = e.pageX - wrapperLeftCoords;
  wrapperEl.addEventListener('mousemove', dragAction);
  wrapperEl.addEventListener('touchmove', swipeAction);
};

const swipeStart = (e: TouchEvent) => {
  isDragging = true;
  posInit = e.touches[0].clientX - wrapperLeftCoords;
  wrapperEl.addEventListener('mousemove', dragAction);
  wrapperEl.addEventListener('touchmove', swipeAction);
};

const swipeEnd = () => {
  blockBtns();
  const prevCurrentImage = currentImage;
  isDragging = false;
  imagesBoxEl.style.transition = 'transform .5s';
  wrapperEl.removeEventListener('mousemove', dragAction);
  wrapperEl.removeEventListener('touchmove', swipeAction);

  if (offset < -translateStep / 2) {
    translateXPos += translateStep;
    currentImage -= 1;
    if (currentImage === 0) {
      currentImage = imagesLength;
    }
  }

  if (offset > translateStep / 2) {
    translateXPos -= translateStep;
    currentImage += 1;
    if (currentImage === imagesLength + 1) {
      currentImage = 1;
    }
  }

  offset = 0;

  imagesBoxEl.style.transform = `translate3d(${calcPosX(translateXPos, translateStep)}%, 0px, 0px)`;

  setTimeout(() => {
    imagesBoxEl.style.transition = '';
    if (currentImage === imagesLength && prevCurrentImage === 1) {
      translateXPos = initTranslateXPos - translateStep * (imagesLength - 1);
      imagesBoxEl.style.transform = `translate3d(${calcPosX(translateXPos, translateStep)}%, 0px, 0px)`;
    }

    if (currentImage === 1 && prevCurrentImage === imagesLength) {
      translateXPos = initTranslateXPos;
      imagesBoxEl.style.transform = `translate3d(${calcPosX(translateXPos, translateStep)}%, 0px, 0px)`;
    }
    activateBtns();
    imagesList.forEach(el => {
      el.addEventListener('click', imageClickHandler);
    });
  }, 500);
};

const swipeLeave = () => {
  if (isDragging) {
    swipeEnd();
  }
};

wrapperEl.addEventListener('mousedown', dragStart);
wrapperEl.addEventListener('touchstart', swipeStart);

wrapperEl.addEventListener('mouseup', swipeEnd);
wrapperEl.addEventListener('touchend', swipeEnd);

wrapperEl.addEventListener('mouseleave', swipeLeave);

prevBtnEl.addEventListener('click', () => {
  blockBtns();
  const prevCurrentImage = currentImage;
  imagesBoxEl.style.transition = 'transform .5s';
  translateXPos += translateStep;
  currentImage -= 1;
  if (currentImage === 0) {
    currentImage = imagesLength;
  }

  imagesBoxEl.style.transform = `translate3d(${calcPosX(translateXPos, translateStep)}%, 0px, 0px)`;

  setTimeout(() => {
    imagesBoxEl.style.transition = '';
    if (currentImage === imagesLength && prevCurrentImage === 1) {
      translateXPos = initTranslateXPos - translateStep * (imagesLength - 1);
      imagesBoxEl.style.transform = `translate3d(${calcPosX(translateXPos, translateStep)}%, 0px, 0px)`;
    }
    activateBtns();
  }, 500);
});

nextBtnEl.addEventListener('click', () => {
  blockBtns();
  const prevCurrentImage = currentImage;
  imagesBoxEl.style.transition = 'transform .5s';
  translateXPos -= translateStep;
  currentImage += 1;
  if (currentImage === imagesLength + 1) {
    currentImage = 1;
  }

  imagesBoxEl.style.transform = `translate3d(${calcPosX(translateXPos, translateStep)}%, 0px, 0px)`;

  setTimeout(() => {
    imagesBoxEl.style.transition = '';
    if (currentImage === 1 && prevCurrentImage === imagesLength) {
      translateXPos = initTranslateXPos;
      imagesBoxEl.style.transform = `translate3d(${calcPosX(translateXPos, translateStep)}%, 0px, 0px)`;
    }
    activateBtns();
  }, 500);
});
