'use strict';

(function () {
  var editingImgElement = document.querySelector('.img-upload__overlay');
  var closeFormElement = editingImgElement.querySelector('.img-upload__cancel');
  var commentElement = document.querySelector('.text__description');

  function onUserCommentElementInput(evt) {
    var MAX_CHARACTERS_IN_COMMENT = 140;

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

  window.scale.add();
  window.filter.add();
  window.slider.add();
  window.escPress.add();

  commentElement.addEventListener('input', onUserCommentElementInput);
  closeFormElement.addEventListener('click', closePopup);
}

function closePopup() {
  var formElement = document.querySelector('.img-upload__form');
  formElement.reset();

  editingImgElement.classList.add('hidden');

  window.scale.remove();
  window.filter.remove();
  window.slider.remove();
  window.escPress.remove();

  commentElement.removeEventListener('input', onUserCommentElementInput);
  closeFormElement.removeEventListener('click', closePopup);
}

  window.form = {
    open: openPopup,
    close: closePopup
  }
})();
