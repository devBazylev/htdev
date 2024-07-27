import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';
import {mob, tab} from '../utils/util.js';

const swiper = new Swiper('.adv__container', {
  modules: [Navigation, Pagination],
  init: false,
  loop: true,
  watchSlidesProgress: true,
  observer: true,
  slidesPerView: 'auto',
  resizeObserver: true,
  updateOnWindowResize: true,
  navigation: {
    prevEl: '.adv__btn--prev',
    nextEl: '.adv__btn--next',
  },
  // pagination: {
  //   el: '.news__pagination',
  //   bulletActiveClass: 'news__bullet--active',
  //   bulletClass: 'news__bullet',
  //   type: 'bullets',
  //   bulletElement: 'div',
  //   clickable: true,
  //   dynamicBullets: true,
  //   dynamicMainBullets: 4,
  //   renderBullet: function (index, className) {
  //     return `<button class="${className}" type="button" tabindex="0">${index + 1}</button>`;
  //   },
  // },
  breakpoints: {
    320: {
      spaceBetween: 15,
    },
    640: {
      spaceBetween: 25,
    },
    960: {
      spaceBetween: 0,
      simulateTouch: false,
    },
  },
  on: {
    breakpoint: function () {
      if (mob.matches || tab.matches) {
        this.enable();
      } else {
        this.disable();
      }
    },
    resize: function () {
      if (mob.matches || tab.matches) {
        this.enable();
      } else {
        this.disable();
      }
    },
  },
});

swiper.init();
