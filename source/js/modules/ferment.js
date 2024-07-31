import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';
import {addClassArray, addListener, cloneSlides, desk, mob, removeClassArray, removeListener, tab, setDataId} from '../utils/util.js';

const ferment = document.querySelector('.ferment');
const sliderWrapper = ferment.querySelector('.ferment__wrapper');
const slides = document.querySelectorAll('.ferment__slide');

const ACTIVE_BULLET_RANGE = 5;
const PAGINATION_WIDTH = '64px';

let clonedSlides = [];

// Иначе у пагинации на планшете не 6 буллетов, а 5
const recalcSlides = () => {
  if (clonedSlides.length === 0) {
    cloneSlides(sliderWrapper, slides, clonedSlides);
  }
  if (mob.matches || desk.matches) {
    addClassArray(clonedSlides, 'ferment__slide--none');
  }
  if (tab.matches) {
    removeClassArray(clonedSlides, 'ferment__slide--none');
  }
};

const swiper = new Swiper('.ferment__container', {
  modules: [Navigation, Pagination],
  init: false,
  watchSlidesProgress: true,
  observer: true,
  slidesPerView: 'auto',
  resizeObserver: true,
  updateOnWindowResize: true,
  navigation: {
    prevEl: '.ferment__btn--prev',
    nextEl: '.ferment__btn--next',
  },
  pagination: {
    el: '.ferment__pagination',
    bulletActiveClass: 'ferment__bullet--active',
    bulletClass: 'ferment__bullet',
    type: 'bullets',
    bulletElement: 'div',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 6,
    renderBullet: function (index, className) {
      return `<button class="${className}" type="button" tabindex="0"></button>`;
    },
  },
  breakpoints: {
    320: {
      spaceBetween: 15,
    },
    640: {
      spaceBetween: 25,
    },
    960: {
      simulateTouch: false,
      spaceBetween: 0,
    },
  },
  on: {
    breakpoint: function () {
      if (tab.matches) {
        recalcSlides();
      }
    },
    resize: function () {
      if (mob.matches) {
        this.enable();
        recalcSlides();
      }
      if (tab.matches) {
        this.enable();
        recalcSlides();
      }
      if (desk.matches) {
        this.disable();
        recalcSlides();
        setTimeout(() => {
          sliderWrapper.style.transform = 'translate3d(0px, 0px, 0px)';
        }, 300);
      }
    },
  },
});

const renderPagination = () => {
  const pagination = ferment.querySelector('.ferment__pagination');
  const bullets = pagination.querySelectorAll('.ferment__bullet');
  setDataId(bullets);
  const activeBullet = pagination.querySelector('.ferment__bullet--active');
  let activeBulletId;
  // try/catch исправляет баг когда слайдер не зациклен, стоит на последнем слайде и при ресайзе количество полностью видимых слайдов изменяется, а вместе с этим изменяется количество буллетов
  try {
    activeBulletId = +activeBullet.getAttribute('data-id');
    if (activeBulletId >= ACTIVE_BULLET_RANGE && activeBulletId < bullets.length - 1) {
      const indexBeforeActive = activeBulletId - ACTIVE_BULLET_RANGE;
      const indexAfterActive = activeBulletId + 1;
      bullets[indexBeforeActive].classList.remove('ferment__bullet--active-main');
      bullets[indexAfterActive].classList.add('ferment__bullet--active-main');
    }
    if (!activeBulletId < 1 && activeBulletId < bullets.length - ACTIVE_BULLET_RANGE) {
      const indexBeforeActive = activeBulletId - 1;
      const indexAfterActive = activeBulletId + ACTIVE_BULLET_RANGE;
      bullets[indexBeforeActive].classList.add('ferment__bullet--active-main');
      bullets[indexAfterActive].classList.remove('ferment__bullet--active-main');
    }
    if (mob.matches || tab.matches) {
      pagination.style.width = PAGINATION_WIDTH;
    }
  } catch (e) {
    activeBulletId = bullets.length - 1;
  }
};

const onScreen = () => {
  if (mob.matches || tab.matches) {
    swiper.init();
    renderPagination();
    swiper.on('paginationUpdate', renderPagination);
    removeListener(window, 'resize', onScreen);
  }
  removeListener(window, 'load', onScreen);
};

const initSwiperFerment = () => {
  addListener(window, 'load', onScreen);
  addListener(window, 'resize', onScreen);
};

export {initSwiperFerment};
