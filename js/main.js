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

var EFFECTS = [
  'effect-none',
  'effect-chrome',
  'effect-sepia',
  'effect-marvin',
  'effect-phobos',
  'effect-heat'
];
var PREVIEW_EFFECTS = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];

var FILTERS = [
  {
    name: '',
    min: 0,
    max: 0,
    suffix: ''
  },
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

var CONTROL_SATURATION_DEFAULT = 100;

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
var controlSaturationValueElement = controlSaturationElement.querySelector('.effect-level__value');
var controlSaturationButtonElement = controlSaturationElement.querySelector('.effect-level__pin');
var controlSaturationDepthElement = controlSaturationElement.querySelector('.effect-level__depth');

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

function openPopup() {
  blockEditingImgElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  formCloseElement.addEventListener('click', closePopup);
  blockScalingImgElement.addEventListener('click', onControlScaleClick);
  blockEffectsElement.addEventListener('click', onEffectClick);
}

function closePopup() {
  blockEditingImgElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  formCloseElement.removeEventListener('click', closePopup);
  blockScalingImgElement.removeEventListener('click', onControlScaleClick);
  blockEffectsElement.removeEventListener('click', onEffectClick);
  formElement.reset();
}

inputUploadElement.addEventListener('change', function () {
  openPopup();
});

// Просто привожу controlValueElement.value к числу (parseInt) и знак % сам отбрасывается, так верно?
function onControlScaleClick(evt) {
  var value = parseInt(inputScaleValueElement.value, 10);
  if (evt.target === controlScaleSmallerElement && value > MIN_SCALE) {
    value -= MIN_SCALE;
    inputScaleValueElement.value = value + '%';
    blockPreviewImgElement.style.transform = 'scale(' + value / 100 + ')';
  } else if (evt.target === controlScaleBiggerElement && value < MAX_SCALE) {
    value += MIN_SCALE;
    inputScaleValueElement.value = value + '%';
    blockPreviewImgElement.style.transform = 'scale(' + value / 100 + ')';
  }
}

function onEffectClick(evt) {
  var currentEffect = PREVIEW_EFFECTS[EFFECTS.indexOf(evt.target.id)];

  if (evt.target.classList.contains('effects__radio')) {
    blockPreviewImgElement.className = currentEffect; // Это тогда не нужно?...
    controlSaturationValueElement.value =  CONTROL_SATURATION_DEFAULT;
    onSaturationButtonMouseup(CONTROL_SATURATION_DEFAULT);
    if (evt.target.id !== 'effect-none') {
      controlSaturationElement.classList.remove('hidden');
    } else {
      controlSaturationElement.classList.add('hidden');
      blockPreviewImgElement.style.filter = 'none';
    }
  }
}

function onSaturationButtonMouseup (value) {
  controlSaturationValueElement.value =  value;
  var currentFilter = FILTERS[PREVIEW_EFFECTS.indexOf(blockPreviewImgElement.className)];
  var coefficient = controlSaturationValueElement.value / 100
  var filterValue = (currentFilter.max - currentFilter.min) * coefficient + currentFilter.min;
  var currentFilterValue = currentFilter.name + '(' + filterValue + currentFilter.suffix + ')';
  blockPreviewImgElement.style.filter = currentFilterValue;
}

controlSaturationButtonElement.addEventListener('mouseup', function () {
  onSaturationButtonMouseup(25); // Для примера
});
