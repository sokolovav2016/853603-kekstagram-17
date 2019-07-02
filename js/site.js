'use strict';

(function () {
  window.backend.load(window.gallery.render);

  var inputUploadElement = document.querySelector('.img-upload__input');
  inputUploadElement.addEventListener('change', window.form.open);
})();
