'use strict';

(function () {
  function addPreviewListener() {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    var fileChooserElement = document.querySelector('.img-upload__input');
    var previewImgElement = document.querySelector('.img-upload__preview img');

    fileChooserElement.addEventListener('change', function () {
      var file = fileChooserElement.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          previewImgElement.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  }

  window.preview = {
    init: addPreviewListener
  };
})();
