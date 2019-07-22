'use strict';

(function () {
  var NUMBER_OF_DEFAULT_COMMENTS = 5;
  var pictureElement = document.querySelector('.big-picture');
  var commentsLoaderElement = pictureElement.querySelector('.comments-loader');

  function renderComment(comment) {
    var newComment = document.createElement('li');
    var commentImgElement = document.createElement('img');
    var commentPElement = document.createElement('p');

    newComment.className = 'social__comment';

    commentImgElement.className = 'social__picture';
    commentImgElement.src = comment.avatar;
    commentImgElement.alt = comment.name;
    commentImgElement.width = '35';
    commentImgElement.height = '35';

    commentPElement.textContent = comment.message;
    commentPElement.className = 'social__text';

    newComment.appendChild(commentImgElement);
    newComment.appendChild(commentPElement);

    return newComment;
  }

  function createsComments(comments, numberOfComments) {
    var commentsListElement = document.querySelector('.social__comments');
    var commentElements = commentsListElement.querySelectorAll('.social__comment');
    var fragment = document.createDocumentFragment();

    commentsLoaderElement.classList.remove('hidden');

    for (var j = 0; j < commentElements.length; j++) {
      commentElements[j].remove();
    }

    for (var i = 0; i < numberOfComments; i++) {
      if (comments[i]) {
        fragment.appendChild(renderComment(comments[i]));
      } else {
        commentsLoaderElement.classList.add('hidden');
      }
    }

    commentsListElement.appendChild(fragment);
  }

  function showPicture(picture) {
    var numberOfComments = NUMBER_OF_DEFAULT_COMMENTS;
    var closePictureElement = pictureElement.querySelector('.big-picture__cancel');

    function onCommentsLoaderClick() {
      numberOfComments += 5;
      createsComments(picture.comments, numberOfComments);
    }

    function closePicture() {
      pictureElement.classList.add('hidden');
      commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
      closePictureElement.removeEventListener('click', closePicture);
      document.removeEventListener('keydown', onPictureEscPress);
    }

    function onPictureEscPress(evt) {
      if (window.util.isEscEvent(evt)) {
        closePicture();
      }
    }

    pictureElement.classList.remove('hidden');

    pictureElement.querySelector('.big-picture__img img').src = picture.url;
    pictureElement.querySelector('.likes-count').textContent = picture.likes;
    pictureElement.querySelector('.comments-count').textContent = picture.comments.length;
    pictureElement.querySelector('.social__caption').textContent = picture.description;
    pictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');

    createsComments(picture.comments, numberOfComments);

    commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
    closePictureElement.addEventListener('click', closePicture);
    document.addEventListener('keydown', onPictureEscPress);
  }

  window.picture = {
    show: showPicture
  };
})();
