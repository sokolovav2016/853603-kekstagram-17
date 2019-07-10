'use strict';

(function () {
  // var imageContainerElement = document.querySelector('.pictures');

  function showPicture(photos) {
    var pictureElement = document.querySelector('.big-picture');

    pictureElement.classList.remove('hidden');
    pictureElement.querySelector('.big-picture__img').children[0].src = photos[0].url;
    pictureElement.querySelector('.likes-count').textContent = photos[0].likes;
    pictureElement.querySelector('.comments-count').textContent = photos[0].comments.length;
    pictureElement.querySelector('.social__caption').textContent = photos[0].description;
    pictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
    pictureElement.querySelector('.comments-loader').classList.add('visually-hidden');

    createsComments(photos[0].comments);

  }

  function renderComment(comment) {
    var newComment = document.createElement('li');
    var commentImg = document.createElement('img');
    var commentP = document.createElement('p');

    newComment.className = 'social__comment';

    commentImg.className = 'social__picture';
    commentImg.src = 'img/avatar-' + window.util.getRandomIntegerInRange(1, 6) + '.svg';
    commentImg.alt = 'Аватар комментатора фотографии';
    commentImg.width = '35';
    commentImg.height = '35';

    commentP.textContent = comment.message;

    newComment.appendChild(commentImg);
    newComment.appendChild(commentP);

    return newComment;
  }

  function createsComments(comments) {
    var commentsElement = document.querySelector('.social__comments');
    var commentElements = commentsElement.querySelectorAll('.social__comment');
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < commentElements.length; j++) {
      commentElements[j].remove();
    }

    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(renderComment(comments[i]));
    }

    commentsElement.appendChild(fragment);
  }


  window.picture = {
    init: showPicture
  };
})();
