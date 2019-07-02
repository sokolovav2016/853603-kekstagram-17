'use strict';

(function () {
  var PHOTO_COUNT = 25;

  var photos = window.data.get(PHOTO_COUNT);
  var inputUploadElement = document.querySelector('.img-upload__input');

  window.gallery.render(photos);
  inputUploadElement.addEventListener('change', window.form.open);
})();

