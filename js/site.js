'use strict';

(function () {
  var inputUploadElement = document.querySelector('.img-upload__input');

  function onUploadChange() {
    window.form.open();
  }

  window.backend.load(window.gallery.render, window.error.init, window.sort.init);
  inputUploadElement.addEventListener('change', onUploadChange);
})();
