import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';
import {addClass, addListener, mob, tab, removeClass, toggleClass, setDataId} from '../utils/util.js';

const adv = document.querySelector('.adv');
const slides = adv.querySelectorAll('.adv__slide');
const sliderWrapper = adv.querySelector('.adv__wrapper');
const togglers = adv.querySelectorAll('.adv__toggler');
const pictures = adv.querySelectorAll('.adv__picture');
const subtitles = adv.querySelectorAll('.adv__subtitle');
const paragraphs = adv.querySelectorAll('.adv__text');

const ACTIVE_BULLET_RANGE = 5;
const PAGINATION_WIDTH = '64px';
let screenWidth;
let swiperWidth;

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

const onTogglers = () => {
  for (let i = 0; i < slides.length; i++) {
    addListener(togglers[i], 'click', () => {
      toggleClass(togglers[i], 'is-active');
      if (togglers[i].classList.contains('is-active')) {
        removeClass(subtitles[i], 'is-active');
        removeClass(pictures[i], 'is-active');
        addClass(paragraphs[i], 'is-active');
        addClass(slides[i], 'is-active');
      } else {
        addClass(subtitles[i], 'is-active');
        addClass(pictures[i], 'is-active');
        removeClass(paragraphs[i], 'is-active');
        removeClass(slides[i], 'is-active');
      }
    });
  }
};

const swiper = new Swiper('.adv__container', {
  modules: [Navigation, Pagination],
  init: false,
  watchSlidesProgress: true,
  observer: true,
  slidesPerView: 'auto',
  resizeObserver: true,
  updateOnWindowResize: true,
  navigation: {
    prevEl: '.adv__btn--prev',
    nextEl: '.adv__btn--next',
  },
  pagination: {
    el: '.adv__pagination',
    bulletActiveClass: 'adv__bullet--active',
    bulletClass: 'adv__bullet',
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
  const pagination = adv.querySelector('.adv__pagination');
  const bullets = pagination.querySelectorAll('.adv__bullet');
  setDataId(bullets);
  const activeBullet = pagination.querySelector('.adv__bullet--active');
  const activeBulletId = +activeBullet.getAttribute('data-id');
  if (activeBulletId >= ACTIVE_BULLET_RANGE && activeBulletId < bullets.length - 1) {
    const indexBeforeActive = activeBulletId - ACTIVE_BULLET_RANGE;
    const indexAfterActive = activeBulletId + 1;
    bullets[indexBeforeActive].classList.remove('adv__bullet--active-main');
    bullets[indexAfterActive].classList.add('adv__bullet--active-main');
  }
  if (!activeBulletId < 1 && activeBulletId < bullets.length - ACTIVE_BULLET_RANGE) {
    const indexBeforeActive = activeBulletId - 1;
    const indexAfterActive = activeBulletId + ACTIVE_BULLET_RANGE;
    bullets[indexBeforeActive].classList.add('adv__bullet--active-main');
    bullets[indexAfterActive].classList.remove('adv__bullet--active-main');
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
onTogglers();
swiper.on('paginationUpdate', renderPagination);
