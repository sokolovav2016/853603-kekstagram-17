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

    pictureElements.forEach(function (el) {
      el.remove();
    });

    photos.forEach(function (el) {
      fragment.appendChild(renderPhoto(el));
    });

    imageContainerElement.appendChild(fragment);
  }

  window.gallery = {
    render: renderGallery
  };
})();
