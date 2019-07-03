'use strict';

(function () {
  var inputUploadElement = document.querySelector('.img-upload__input');

  window.backend.load(window.gallery.render, window.error.init);

  inputUploadElement.addEventListener('change', window.form.open);
})();
