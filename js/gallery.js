'use strict';

(function () {
  function renderPhoto(photo) {
    var randomUserTemplateElement = document.querySelector('#picture')
      .content
      .querySelector('.picture');
    var photoElement = randomUserTemplateElement.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    photoElement.addEventListener('click', function () {
      window.picture.show(photo);
    });

    return photoElement;
  }

  function renderGallery(photos) {
    var imageContainerElement = document.querySelector('.pictures');
    var pictureElements = imageContainerElement.querySelectorAll('.picture');
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < pictureElements.length; j++) {
      pictureElements[j].remove();
    }

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }

    imageContainerElement.appendChild(fragment);
  }

  window.gallery = {
    render: renderGallery
  };
})();
