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

var imageContainer = document.querySelector('.pictures');
var randomUserTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var fragment = document.createDocumentFragment();

function getRandomIntegerInRange(min, max) { // Произвольное число в диапозоне
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomElementArr(arr) { // Произвольный элемент массива
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSentence(maxSentences, arrSentences) { // Произвольное предложение в комментарии
  var sentence = '';
  var max = getRandomIntegerInRange(1, maxSentences);

  for (i = 1; i <= max; i++) {
    sentence += getRandomElementArr(arrSentences);
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
      name: getRandomElementArr(AUTHOR_NAMES)
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
  var descriptionElement = randomUserTemplate.cloneNode(true); // Копирует шаблон

  descriptionElement.querySelector('.picture__img').src = descriptionPhoto.url;
  descriptionElement.querySelector('.picture__likes').textContent = descriptionPhoto.likes;
  descriptionElement.querySelector('.picture__comments').textContent = descriptionPhoto.comments.length;

  return descriptionElement;
}

var descriptionPhotos = getPhotoDescriptions(PHOTO_COUNT);

for (var i = 0; i < descriptionPhotos.length; i++) {
  fragment.appendChild(renderPhotoDescriptions(descriptionPhotos[i]));
}
imageContainer.appendChild(fragment);
