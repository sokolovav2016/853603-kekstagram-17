'use strict';

(function () {
  window.backend.load(window.sort.init, window.error.init);

  var inputUploadElement = document.querySelector('.img-upload__input');
  inputUploadElement.addEventListener('change', window.form.open);
})();
