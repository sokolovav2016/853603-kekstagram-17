'use strict';

(function () {
  var imageContainerElement = document.querySelector('.pictures');

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
    var pictureElements = imageContainerElement.querySelectorAll('.picture');
    for (var j = 0; j < pictureElements.length; j++) {
      pictureElements[j].remove();
    }

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < descriptionPhotos.length; i++) {
      fragment.appendChild(renderPhotoDescriptions(descriptionPhotos[i]));
    }

    imageContainerElement.appendChild(fragment);
  }

  window.gallery = {
    render: renderGallery
  };
})();
