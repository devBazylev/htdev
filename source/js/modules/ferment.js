import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';
import {cloneSlides, mob, tab, setDataId} from '../utils/util.js';

const ferment = document.querySelector('.ferment');
const sliderWrapper = ferment.querySelector('.ferment__wrapper');
const slides = document.querySelectorAll('.ferment__slide');

const ACTIVE_BULLET_RANGE = 5;
const PAGINATION_WIDTH = '64px';
let screenWidth;
let swiperWidth;
let clonedSlides = [];

const outerPadding = {
  mob: 15,
  tab: 15,
};

const innerPadding = {
  mob: 15,
  tab: 20,
};

const calcSwiperWidth = () => {
  screenWidth = window.innerWidth;
  if (mob.matches) {
    swiperWidth = Math.round(screenWidth - outerPadding.mob * 2 - innerPadding.mob * 2);
  }
  if (tab.matches) {
    swiperWidth = Math.round(screenWidth - outerPadding.tab * 2 - innerPadding.tab * 2);
  }
};

calcSwiperWidth();

// Иначе у пагинации на планшете не 6 буллетов, а 5
if (tab.matches) {
  cloneSlides(sliderWrapper, slides, clonedSlides);
}

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
      width: swiperWidth,
      spaceBetween: 15,
    },
    640: {
      width: swiperWidth,
      spaceBetween: 25,
    },
    960: {
      simulateTouch: false,
      spaceBetween: 0,
    },
  },
  on: {
    breakpoint: function () {
      if (mob.matches || tab.matches) {
        this.enable();
        calcSwiperWidth();
        this.update();
      } else {
        this.disable();
        setTimeout(() => {
          sliderWrapper.style.transform = 'translate3d(0px, 0px, 0px)';
        }, 300);
      }
    },
    resize: function () {
      if (mob.matches || tab.matches) {
        this.enable();
        calcSwiperWidth();
        this.update();
      } else {
        this.disable();
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
  const activeBulletId = +activeBullet.getAttribute('data-id');
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
};

const swiperInit = () => {
  if (mob.matches || tab.matches) {
    swiper.init();
    renderPagination();
  }
};

swiperInit();
swiper.on('paginationUpdate', renderPagination);
