const desk = window.matchMedia('(min-width: 960px)');
const mob = window.matchMedia('(min-width: 0px) and (max-width: 639px)');
const tab = window.matchMedia('(min-width: 640px) and (max-width: 959px)');

const addClass = (elem, classs) => {
  elem.classList.add(classs);
};

const addClassArray = (elems, classs) => {
  elems.forEach((elem) => {
    addClass(elem, classs);
  });
};

const addListener = (elem, action, callback) => {
  elem.addEventListener(action, callback);
};

const addListenerArray = (array, action, callback) => {
  array.forEach((elem) => {
    elem.addEventListener(action, callback);
  });
};

const changeText = (array, text) => {
  array.forEach((elem) => {
    elem.textContent = text;
  });
};

const cloneSlides = (parent, elems, array) => {
  elems.forEach((elem) => {
    const clone = elem.cloneNode(true);
    clone.setAttribute('aria-hidden', true);
    array.push(clone);
    parent.appendChild(clone);
  });
};

// const debounce = (callback, timeoutDelay = 500) => {
//   let timeoutId;
//   return (...rest) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
//   };
// };

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isKeydown = (evt, keydown) => evt.key === keydown;

const isTarget = (evt, selector) => evt.target.closest(selector);

const removeClass = (elem, classs) => {
  elem.classList.remove(classs);
};

const removeClassArray = (array, classs) => {
  array.forEach((elem) => {
    if (elem.classList.contains(classs)) {
      elem.classList.remove(classs);
    }
  });
};

const removeListener = (elem, action, callback) => {
  elem.removeEventListener(action, callback);
};

const removeListenerArray = (array, action, callback) => {
  array.forEach((elem) => {
    elem.removeEventListener(action, callback);
  });
};

const resetClassArray = (array, classs, id) => {
  removeClassArray(array, classs);
  array[id].classList.add(classs);
};

const setDataId = (elems) => {
  for (let i = 0; i < elems.length; i++) {
    elems[i].dataset.id = i;
  }
};

const toggleClass = (elem, classs) => {
  elem.classList.toggle(classs);
};

const toggleDisabled = (button, flag) => {
  button.disabled = flag;
  button.textContent = flag ? 'Отправляем...' : 'Отправить';
};

export {
  desk,
  mob,
  tab,
  addClass,
  addClassArray,
  addListener,
  addListenerArray,
  changeText,
  cloneSlides,
  // debounce,
  getRandomInteger,
  isKeydown,
  isTarget,
  removeClass,
  removeClassArray,
  resetClassArray,
  removeListener,
  removeListenerArray,
  setDataId,
  toggleClass,
  toggleDisabled
};
