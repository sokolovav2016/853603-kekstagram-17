'use strict';

(function () {
  var MAX_CHARACTERS_IN_COMMENT = 140;

  var formElement = document.querySelector('.img-upload__form');
  var editingImgElement = formElement.querySelector('.img-upload__overlay');
  var closeFormElement = editingImgElement.querySelector('.img-upload__cancel');
  var commentElement = formElement.querySelector('.text__description');
  var hashtagElement = formElement.querySelector('.text__hashtags');

  function onCommentInput(evt) {
    if (evt.target.value.length > MAX_CHARACTERS_IN_COMMENT) {
      evt.target.setCustomValidity('Давай покороче, максимум 140 символов');
      evt.target.style = 'box-shadow: 0 0 0 5px red;';
    } else {
      evt.target.setCustomValidity('');
      evt.target.style = 'borderRadius: 5px; box-shadow: none;';
    }
  }

  function onHashtagInput(evt) {
    var hashtags = evt.target.value.split(' ')
    .map(function (element) {
      return element.toLowerCase();
    });

    if (hashtags.length > 5) {
      evt.target.setCustomValidity('максимум 5 хэш-тегов');
      evt.target.style = 'box-shadow: 0 0 0 5px red;';
    } else {
      for (var i = 0; i < hashtags.length; i++) {
        var hashtag = hashtags[i];

        evt.target.style = 'box-shadow: 0 0 0 5px red;';

        if (evt.target.value === '') {
          evt.target.setCustomValidity('');
          evt.target.style = 'box-shadow: none;';
          break;
        } else if (hashtag[0] !== '#') {
          evt.target.setCustomValidity('Хэш-тег должен начинаться с #');
          break;
        } else if (hashtag.length < 2) {
          evt.target.setCustomValidity('Пустой хэш-тег');
          break;
        } else if (hashtags.indexOf(hashtag) !== i) {
          evt.target.setCustomValidity('Повторяющийся хэш-тег');
          break;
        } else if (hashtag.length > 20) {
          evt.target.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
          break;
        } else {
          evt.target.setCustomValidity('');
          evt.target.style = 'box-shadow: none;';
        }
      }
    }
  }

  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, closePopup);
  }

  function onElementFocus(evt) {
    function onElementBlur() {
      document.addEventListener('keydown', onPopupEscPress);
      evt.target.addEventListener('focus', onElementFocus);
      evt.target.removeEventListener('blur', onElementBlur);
    }

    document.removeEventListener('keydown', onPopupEscPress);
    evt.target.removeEventListener('focus', onElementFocus);
    evt.target.addEventListener('blur', onElementBlur);
  }

  function openPopup() {
    editingImgElement.classList.remove('hidden');

    window.scale.setDefault();
    window.filter.setDefault();
    window.slider.setDefault();

    window.scale.addListeners();
    window.filter.addListeners();
    window.slider.addListeners();

    document.addEventListener('keydown', onPopupEscPress);

    commentElement.addEventListener('focus', onElementFocus);
    commentElement.addEventListener('input', onCommentInput);

    hashtagElement.addEventListener('focus', onElementFocus);
    hashtagElement.addEventListener('input', onHashtagInput);

    formElement.addEventListener('submit', window.backend.save);

    closeFormElement.addEventListener('click', closePopup);
  }

  function closePopup() {
    formElement.reset();

    editingImgElement.classList.add('hidden');

    window.scale.removeListeners();
    window.filter.removeListeners();
    window.slider.removeListeners();

    document.removeEventListener('keydown', onPopupEscPress);

    commentElement.removeEventListener('focus', onElementFocus);
    commentElement.removeEventListener('input', onCommentInput);

    hashtagElement.removeEventListener('focus', onElementFocus);
    hashtagElement.removeEventListener('input', onHashtagInput);

    closeFormElement.removeEventListener('click', closePopup);
  }

  window.form = {
    open: openPopup,
    close: closePopup
  };
})();
