'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 200;
var PHOTO_COUNT = 25;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var AUTHOR_NAMES = [
  'Артем',
  'Никита',
  'Федор',
  'Илья',
  'Мария',
  'Светлана'
];
var MAX_AVATAR_NUMBER = 6;
var MAX_SENTENCES_IN_COMMENT = 2;
var ESC_KEYCODE = 27;

var MIN_SCALE = 25;
var MAX_SCALE = 100; // Сделать объект (перечисление) Scale?

var EFFECTS = [
  'none',
  'chrome',
  'sepia',
  'marvin',
  'phobos',
  'heat'
];

var FILTERS = [
  {
    name: 'grayscale',
    min: 0,
    max: 1,
    suffix: ''
  },
  {
    name: 'sepia',
    min: 0,
    max: 1,
    suffix: ''
  },
  {
    name: 'invert',
    min: 0,
    max: 100,
    suffix: '%'
  },
  {
    name: 'blur',
    min: 0,
    max: 3,
    suffix: 'px'
  },
  {
    name: 'brightness',
    min: 1,
    max: 3,
    suffix: ''
  },
];

var FILTER_VALUE_DEFAULT = 100;

var imageContainerElement = document.querySelector('.pictures');
var randomUserTemplateElement = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var fragment = document.createDocumentFragment();

var formElement = imageContainerElement.querySelector('.img-upload__form');
var inputUploadElement = formElement.querySelector('.img-upload__input');
var blockEditingImgElement = formElement.querySelector('.img-upload__overlay');
var formCloseElement = blockEditingImgElement.querySelector('.img-upload__cancel');

var blockScalingImgElement = blockEditingImgElement.querySelector('.img-upload__scale');
var controlScaleSmallerElement = blockScalingImgElement.querySelector('.scale__control--smaller');
var controlScaleBiggerElement = blockScalingImgElement.querySelector('.scale__control--bigger');
var inputScaleValueElement = blockScalingImgElement.querySelector('.scale__control--value');

var blockPreviewElement = blockEditingImgElement.querySelector('.img-upload__preview');
var blockPreviewImgElement = blockPreviewElement.children[0]; // Так норм (class же нету)?

var blockEffectsElement = blockEditingImgElement.querySelector('.img-upload__effects');

var controlSaturationElement = blockEditingImgElement.querySelector('.img-upload__effect-level');
var controlSaturationButtonElement = controlSaturationElement.querySelector('.effect-level__pin');

// -------- Наполнение главной страницы фото с рандомными комментами и лайками --------

function getRandomIntegerInRange(min, max) { // Произвольное число в диапозоне
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomArrayElement(arr) {
  var index = getRandomIntegerInRange(0, arr.length - 1);
  return arr[index];
}

function getRandomSentence(maxSentences, arrSentences) { // Произвольное предложение в комментарии
  var sentence = '';
  var max = getRandomIntegerInRange(1, maxSentences);

  for (i = 1; i <= max; i++) {
    sentence += getRandomArrayElement(arrSentences);
    if (i < max) {
      sentence += ' ';
    }
  }

  return sentence;
}

function getRandomComments() { // Произвольный массив комментариев
  var arrComments = [];
  var maxComments = getRandomIntegerInRange(1, MAX_AVATAR_NUMBER);

  for (var i = 1; i <= maxComments; i++) {
    var randomAvatar = getRandomIntegerInRange(1, MAX_AVATAR_NUMBER);

    arrComments.push({
      avatar: 'img/avatar-' + randomAvatar + '.svg',
      message: getRandomSentence(MAX_SENTENCES_IN_COMMENT, COMMENTS),
      name: getRandomArrayElement(AUTHOR_NAMES)
    });
  }

  return arrComments;
}

function getPhotoDescriptions(numberOfPhotos) {
  var arr = [];

  for (var i = 1; i <= numberOfPhotos; i++) {
    arr.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomIntegerInRange(MIN_LIKES, MAX_LIKES),
      comments: getRandomComments()
    });
  }

  return arr;
}

function renderPhotoDescriptions(descriptionPhoto) {
  var descriptionElement = randomUserTemplateElement.cloneNode(true); // Копирует шаблон

  descriptionElement.querySelector('.picture__img').src = descriptionPhoto.url;
  descriptionElement.querySelector('.picture__likes').textContent = descriptionPhoto.likes;
  descriptionElement.querySelector('.picture__comments').textContent = descriptionPhoto.comments.length;

  return descriptionElement;
}

var descriptionPhotos = getPhotoDescriptions(PHOTO_COUNT); // Это оставляем здесь?

for (var i = 0; i < descriptionPhotos.length; i++) {
  fragment.appendChild(renderPhotoDescriptions(descriptionPhotos[i]));
}
imageContainerElement.appendChild(fragment);

// -------- Открытие / закрытие попапа и логика внутри --------

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}

function onСontrolScaleSmallerClick() { // Откидывание знака % с помощью parseInt, норм?
  var value = parseInt(inputScaleValueElement.value, 10); // Одинаковая переменная в двух функциях, норм?
  if (value > MIN_SCALE) {
    value -= MIN_SCALE;
    inputScaleValueElement.value = value + '%';
    blockPreviewImgElement.style.transform = 'scale(' + value / 100 + ')';
  }
}

function onСontrolScaleBiggerClick() {
  var value = parseInt(inputScaleValueElement.value, 10);
  if (value < MAX_SCALE) {
    value += MIN_SCALE;
    inputScaleValueElement.value = value + '%';
    blockPreviewImgElement.style.transform = 'scale(' + value / 100 + ')';
  }
}

function onFilterChange(evt) {
  setFilter(evt.target.value, FILTER_VALUE_DEFAULT);
}

function setFilter(type, value) {
  toggleRangeElementVisibility(type);
  addFilterClassname(type);
  setFilterEffectStyle(type, value);
}

function toggleRangeElementVisibility(filterType) {
  if (filterType !== 'none') {
    controlSaturationElement.classList.remove('hidden');
  } else {
    controlSaturationElement.classList.add('hidden');
  }
}

function addFilterClassname(filterType) {
  switch (filterType) {
    case 'none':
      blockPreviewImgElement.className = 'effects__preview--none';
      break;
    case 'chrome':
      blockPreviewImgElement.className = 'effects__preview--chrome';
      break;
    case 'sepia':
      blockPreviewImgElement.className = 'effects__preview--sepia';
      break;
    case 'marvin':
      blockPreviewImgElement.className = 'effects__preview--marvin';
      break;
    case 'phobos':
      blockPreviewImgElement.className = 'effects__preview--phobos';
      break;
    case 'heat':
      blockPreviewImgElement.className = 'effects__preview--heat';
      break;
  }
}

function setFilterEffectStyle(filterType, filterValue) {
  switch (filterType) {
      case 'none':
      blockPreviewImgElement.style.filter = 'none';
      break;
    case 'chrome':
      blockPreviewImgElement.style.filter = getCurrentFilterValue(FILTERS[0], filterValue);
      break;
    case 'sepia':
      blockPreviewImgElement.style.filter = getCurrentFilterValue(FILTERS[1], filterValue);
      break;
    case 'marvin':
      blockPreviewImgElement.style.filter = getCurrentFilterValue(FILTERS[2], filterValue);
      break;
    case 'phobos':
      blockPreviewImgElement.style.filter = getCurrentFilterValue(FILTERS[3], filterValue);
      break;
    case 'heat':
      blockPreviewImgElement.style.filter = getCurrentFilterValue(FILTERS[4], filterValue);
      break;
  }
}

function getCurrentFilterValue(currentFilter, filterValue) {
  var coefficient = filterValue / 100;
  var finalFilterValue = (currentFilter.max - currentFilter.min) * coefficient + currentFilter.min;
  var currentFilterValue = currentFilter.name + '(' + finalFilterValue + currentFilter.suffix + ')';
  return currentFilterValue;
}

function onPinMouseUp() {
  var checkedFilterType = blockEffectsElement.querySelector('input:checked').value;
  setFilter(checkedFilterType, 60);
}

function openPopup() {
  blockEditingImgElement.classList.remove('hidden');

  var checkedFilterType = blockEffectsElement.querySelector('input[checked]').value;
  setFilter(checkedFilterType, FILTER_VALUE_DEFAULT);

  document.addEventListener('keydown', onPopupEscPress);
  controlScaleSmallerElement.addEventListener('click', onСontrolScaleSmallerClick);
  controlScaleBiggerElement.addEventListener('click', onСontrolScaleBiggerClick);
  blockEffectsElement.addEventListener('change', onFilterChange);
  controlSaturationButtonElement.addEventListener('mouseup', onPinMouseUp);
  formCloseElement.addEventListener('click', closePopup);
}

function closePopup() {
  blockEditingImgElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  controlScaleSmallerElement.removeEventListener('click', onСontrolScaleSmallerClick);
  controlScaleBiggerElement.removeEventListener('click', onСontrolScaleBiggerClick);
  blockEffectsElement.removeEventListener('change', onFilterChange);
  controlSaturationButtonElement.removeEventListener('mouseup', onPinMouseUp);
  formCloseElement.removeEventListener('click', closePopup);
  formElement.reset();
}

inputUploadElement.addEventListener('change', function () {
  openPopup();
});

