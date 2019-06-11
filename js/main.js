var MIN_LIKES = 15;
var MAX_LIKES = 200;
var NUMBER_OF_PHOTOS = 25;
var SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var AUTOR_NAMES = [ // Имена придумал сам, кол-во равно кол-ву аватарок и предложений
  'Артем',
  'Никита',
  'Федор',
  'Илья',
  'Мария',
  'Светлана'
];
var NUMBER_OF_AVATARS = 6;
var MAX_SENTENCES = 2; // Максимальное кол-во предложений в комментарии

// Вынес эти четыре переменные вверх, но рядом с функциями внизу они смотрятся более ясно.
// Все равно все переменные объявлять вверху?
var descriptionPhotos = getDescriptionPhotos(NUMBER_OF_PHOTOS);
var similarListElement = document.querySelector('.pictures');
var similarUserTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture'); // Шаблон
var fragment = document.createDocumentFragment();

function getRandomIntegerInRange(min, max) { // Произвольное число в диапозоне
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomInteger(numberOfElements) { // Произвольное число от 1 до заданного
  return Math.floor(Math.random() * numberOfElements + 1);
}

function getRandomElementArr(arr) { // Произвольный элемент массива
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSentence(maxSentences, arrSentences) { // Произвольное предложение в комментарии
  var sentence = '';
  var max = getRandomInteger(maxSentences);

  for (i = 1; i <= max; i++) {
    sentence += getRandomElementArr(arrSentences);
    if (i < max) {
      sentence += ' ';
    }
  }

  return sentence;
}

function getDescriptionPhotos(numberOfPhotos) {
  var arr = [];

  for (var i = 1; i <= numberOfPhotos; i++) {

    function getRandomArrComments() { // Произвольный массив комментариев
      var arrComments = [];
      var maxComments = getRandomInteger(NUMBER_OF_AVATARS);

      for (var i = 1; i <= maxComments; i++) {
        var randomAvatar = getRandomInteger(NUMBER_OF_AVATARS);

        arrComments.push({
          avatar: 'img/avatar-' + randomAvatar + '.svg',
          message: getRandomSentence(MAX_SENTENCES, SENTENCES),
          name: getRandomElementArr(AUTOR_NAMES)
        });
      }

      return arrComments;
    }

    arr.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomIntegerInRange(MIN_LIKES, MAX_LIKES),
      comments: getRandomArrComments()
    });
  }

  return arr;
}

function renderDescriptionPhotos(descriptionPhoto) {
  var descriptionElement = similarUserTemplate.cloneNode(true); // Копирует шаблон

  descriptionElement.querySelector('.picture__img').src = descriptionPhoto.url;
  descriptionElement.querySelector('.picture__likes').textContent = descriptionPhoto.likes;
  descriptionElement.querySelector('.picture__comments').textContent = descriptionPhoto.comments.length;

  return descriptionElement;
}

for (var i = 0; i < descriptionPhotos.length; i++) {
  fragment.appendChild(renderDescriptionPhotos(descriptionPhotos[i]));
}
similarListElement.appendChild(fragment);
