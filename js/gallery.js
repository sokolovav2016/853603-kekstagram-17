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

    descriptionElement.addEventListener('click', window.picture.onPictureClick);

    descriptionElement.addEventListener('click', function () {
      window.picture.show(descriptionPhoto);
    });

    return descriptionElement;
  }

  function renderGallery(descriptionPhotos) {
    var imageContainerElement = document.querySelector('.pictures');
    var pictureElements = imageContainerElement.querySelectorAll('.picture');
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < pictureElements.length; j++) {
      pictureElements[j].remove();
    }

    for (var i = 0; i < descriptionPhotos.length; i++) {
      fragment.appendChild(renderPhotoDescriptions(descriptionPhotos[i]));
    }

    imageContainerElement.appendChild(fragment);
  }

  window.gallery = {
    render: renderGallery
  };
})();
