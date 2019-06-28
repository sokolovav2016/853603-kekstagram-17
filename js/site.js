'use strict';

(function () {
  var photos = window.data.get;
  window.gallery.render(photos);

  var inputUploadElement = document.querySelector('.img-upload__input');
  inputUploadElement.addEventListener('change', window.form.open);
})();

