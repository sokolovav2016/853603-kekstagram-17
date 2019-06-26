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
var MAX_SCALE = 100;

var MAX_CHARACTERS_IN_COMMENT = 140;

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
var PIN_WIDTH = 18;
var SLIDER_WIDTH = 453;

var imageContainerElement = document.querySelector('.pictures');
var randomUserTemplateElement = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var fragment = document.createDocumentFragment();

var formElement = imageContainerElement.querySelector('.img-upload__form');
var inputUploadElement = formElement.querySelector('.img-upload__input');
var editingImgElement = formElement.querySelector('.img-upload__overlay');
var closeFormElement = editingImgElement.querySelector('.img-upload__cancel');

var scaleImgElement = editingImgElement.querySelector('.img-upload__scale');
var scaleSmallElement = scaleImgElement.querySelector('.scale__control--smaller');
var scaleBigElement = scaleImgElement.querySelector('.scale__control--bigger');
var scaleValueElement = scaleImgElement.querySelector('.scale__control--value');

var previewElement = editingImgElement.querySelector('.img-upload__preview');
var previewImgElement = previewElement.children[0];

var effectsElement = editingImgElement.querySelector('.img-upload__effects');

var sliderElement = editingImgElement.querySelector('.img-upload__effect-level');
var sliderControlElement = sliderElement.querySelector('.effect-level__pin');
var sliderBarElement = sliderElement.querySelector('.effect-level__depth');
var sliderLineElement = sliderElement.querySelector('.effect-level__line');
var sliderValueElement = sliderElement.querySelector('.effect-level__value');
var sliderControlDefault = SLIDER_WIDTH / FILTER_VALUE_DEFAULT * sliderValueElement.value;

var commentElement = formElement.querySelector('.text__description');

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

function onCommentFocus() {
  document.removeEventListener('keydown', onPopupEscPress);
  commentElement.addEventListener('blur', onCommentBlur);
  commentElement.removeEventListener('focus', onCommentFocus);
}

function onCommentBlur() {
  document.addEventListener('keydown', onPopupEscPress);
  commentElement.addEventListener('focus', onCommentFocus);
  commentElement.removeEventListener('blur', onCommentBlur);
}

// Размеры Preview

function onСontrolScaleSmallerClick() {
  var value = parseInt(scaleValueElement.value, 10);

  if (value > MIN_SCALE) {
    value -= MIN_SCALE;
    scaleValueElement.value = value + '%';
    previewImgElement.style.transform = 'scale(' + value / 100 + ')';
  }
}

function onСontrolScaleBiggerClick() {
  var value = parseInt(scaleValueElement.value, 10);

  if (value < MAX_SCALE) {
    value += MIN_SCALE;
    scaleValueElement.value = value + '%';
    previewImgElement.style.transform = 'scale(' + value / 100 + ')';
  }
}

// Добавление фильтра

function onFilterChange(evt) {
  setFilter(evt.target.value, FILTER_VALUE_DEFAULT);
  setSlider(SLIDER_WIDTH, FILTER_VALUE_DEFAULT);
}

function setFilter(type, value) {
  hideSlider(type);
  setPreviewClass(type);
  setPreviewFilterStyle(type, value);
}

function hideSlider(type) {
  (type === 'none') ? sliderElement.classList.add('hidden') : sliderElement.classList.remove('hidden');
}

function setPreviewClass(type) {
  switch (type) {
    case 'none':
      previewImgElement.className = 'effects__preview--none';
      break;
    case 'chrome':
      previewImgElement.className = 'effects__preview--chrome';
      break;
    case 'sepia':
      previewImgElement.className = 'effects__preview--sepia';
      break;
    case 'marvin':
      previewImgElement.className = 'effects__preview--marvin';
      break;
    case 'phobos':
      previewImgElement.className = 'effects__preview--phobos';
      break;
    case 'heat':
      previewImgElement.className = 'effects__preview--heat';
      break;
  }
}

function getFilterValue(filter, value) {
  var coefficient = value / 100;
  var filterValue = (filter.max - filter.min) * coefficient + filter.min;
  return filter.name + '(' + filterValue + filter.suffix + ')';
}

function setPreviewFilterStyle(type, value) {
  switch (type) {
    case 'none':
      previewImgElement.style.filter = '';
      break;
    case 'chrome':
      previewImgElement.style.filter = getFilterValue(FILTERS[0], value);
      break;
    case 'sepia':
      previewImgElement.style.filter = getFilterValue(FILTERS[1], value);
      break;
    case 'marvin':
      previewImgElement.style.filter = getFilterValue(FILTERS[2], value);
      break;
    case 'phobos':
      previewImgElement.style.filter = getFilterValue(FILTERS[3], value);
      break;
    case 'heat':
      previewImgElement.style.filter = getFilterValue(FILTERS[4], value);
      break;
  }
}

// Перемещение ползунка

function onPinMouseDown(evt) {
  elementDrag(evt);
}

function setSlider(shift, value) {
  sliderControlElement.style.left = shift + 'px';
  sliderBarElement.style.width = value + '%';
  sliderValueElement.value = value;

  var checkedFilterType = effectsElement.querySelector('input:checked').value;
  setFilter(checkedFilterType, value);
}

function elementDrag(evt) {
  evt.preventDefault();

  var dragElement = evt.target;
  var startCoord = evt.clientX;

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    var line = sliderLineElement.getBoundingClientRect();

    if (moveEvt.clientX > line.left - (PIN_WIDTH / 2) && moveEvt.clientX < line.left + line.width + (PIN_WIDTH / 2)) {
      var shift = startCoord - moveEvt.clientX;
      var parentShift = dragElement.offsetLeft - shift;

      if (parentShift >= 0 && parentShift <= line.width) {
        startCoord = moveEvt.clientX;
        var value = Math.round(parentShift / line.width * 100);

        setSlider(parentShift, value);
      }
    }
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

// Валидация

function onUserCommentElementInput(evt) {
  if (evt.target.value.length > MAX_CHARACTERS_IN_COMMENT) {
    evt.target.setCustomValidity('Давай покороче, максимум 140 символов');
  } else {
    evt.target.setCustomValidity('');
  }
}

// Основной блок

function openPopup() {
  editingImgElement.classList.remove('hidden');

  var checkedFilterType = effectsElement.querySelector('input[checked]').value;
  setFilter(checkedFilterType, FILTER_VALUE_DEFAULT);
  setSlider(sliderControlDefault, sliderValueElement.value);

  document.addEventListener('keydown', onPopupEscPress);
  scaleSmallElement.addEventListener('click', onСontrolScaleSmallerClick);
  scaleBigElement.addEventListener('click', onСontrolScaleBiggerClick);
  effectsElement.addEventListener('change', onFilterChange);
  sliderControlElement.addEventListener('mousedown', onPinMouseDown);
  commentElement.addEventListener('input', onUserCommentElementInput);
  commentElement.addEventListener('focus', onCommentFocus);
  closeFormElement.addEventListener('click', closePopup);
}

function closePopup() {
  editingImgElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  scaleSmallElement.removeEventListener('click', onСontrolScaleSmallerClick);
  scaleBigElement.removeEventListener('click', onСontrolScaleBiggerClick);
  effectsElement.removeEventListener('change', onFilterChange);
  closeFormElement.removeEventListener('click', closePopup);
  commentElement.removeEventListener('input', onUserCommentElementInput);
  commentElement.removeEventListener('focus', onCommentFocus);
  formElement.reset();
}

inputUploadElement.addEventListener('change', function () {
  openPopup();
});

