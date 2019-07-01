'use strict';

(function () {
  var MAX_SENTENCES_IN_COMMENT = 2;
  var MAX_AVATAR_NUMBER = 6;
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
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

  function getRandomSentence(maxSentences, arrSentences) {
    var sentence = '';
    var max = window.util.getRandomIntegerInRange(1, maxSentences);

    for (var i = 1; i <= max; i++) {
      sentence += window.util.getRandomArrayElement(arrSentences);
      if (i < max) {
        sentence += ' ';
      }
    }

    return sentence;
  }

  function getRandomComments() {
    var arrComments = [];
    var maxComments = window.util.getRandomIntegerInRange(1, MAX_AVATAR_NUMBER);

    for (var i = 1; i <= maxComments; i++) {
      var randomAvatar = window.util.getRandomIntegerInRange(1, MAX_AVATAR_NUMBER);

      arrComments.push({
        avatar: 'img/avatar-' + randomAvatar + '.svg',
        message: getRandomSentence(MAX_SENTENCES_IN_COMMENT, COMMENTS),
        name: window.util.getRandomArrayElement(AUTHOR_NAMES)
      });
    }

    return arrComments;
  }

  function getPhotoDescriptions(numberOfPhotos) {
    var arr = [];

    for (var i = 1; i <= numberOfPhotos; i++) {
      arr.push({
        url: 'photos/' + i + '.jpg',
        likes: window.util.getRandomIntegerInRange(MIN_LIKES, MAX_LIKES),
        comments: getRandomComments()
      });
    }

    return arr;
  }

  window.data = {
    get: getPhotoDescriptions
  };
})();
