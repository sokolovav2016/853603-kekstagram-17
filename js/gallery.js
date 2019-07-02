'use strict';

(function () {
  function renderPhotoDescriptions(descriptionPhoto) {
    var randomUserTemplateElement = document.querySelector('#picture')
    .content
    .querySelector('.picture');
    var descriptionElement = randomUserTemplateElement.cloneNode(true);

    descriptionElement.querySelector('.picture__img').src = descriptionPhoto.url;
    descriptionElement.querySelector('.picture__likes').textContent = descriptionPhoto.likes;
    descriptionElement.querySelector('.picture__comments').textContent = descriptionPhoto.comments.length;

    return descriptionElement;
  }

  function renderGallery(descriptionPhotos) {
    var fragment = document.createDocumentFragment();
    var imageContainerElement = document.querySelector('.pictures');

    for (var i = 0; i < descriptionPhotos.length; i++) {
      fragment.appendChild(renderPhotoDescriptions(descriptionPhotos[i]));
    }

    imageContainerElement.appendChild(fragment);
  }

  window.gallery = {
    render: renderGallery
  };
})();
