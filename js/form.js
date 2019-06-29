'use strict';

(function () {
  var MAX_CHARACTERS_IN_COMMENT = 140;

  var editingImgElement = document.querySelector('.img-upload__overlay');
  var closeFormElement = editingImgElement.querySelector('.img-upload__cancel');
  var commentElement = document.querySelector('.text__description');

  function onCommentInput(evt) {
    if (evt.target.value.length > MAX_CHARACTERS_IN_COMMENT) {
      evt.target.setCustomValidity('Давай покороче, максимум 140 символов');
    } else {
      evt.target.setCustomValidity('');
    }
  }

  function openPopup() {
    editingImgElement.classList.remove('hidden');

    window.filter.setDefault();
    window.slider.setDefault();

    window.scale.addListeners();
    window.filter.addListeners();
    window.slider.addListeners();
    window.escPress.addListeners();

    commentElement.addEventListener('input', onCommentInput);
    closeFormElement.addEventListener('click', closePopup);
  }

  function closePopup() {
    var formElement = document.querySelector('.img-upload__form');
    formElement.reset();

    editingImgElement.classList.add('hidden');

    window.scale.removeListeners();
    window.filter.removeListeners();
    window.slider.removeListeners();
    window.escPress.removeListeners();

    commentElement.removeEventListener('input', onCommentInput);
    closeFormElement.removeEventListener('click', closePopup);
  }

  window.form = {
    open: openPopup,
    close: closePopup
  };
})();
