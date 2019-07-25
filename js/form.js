'use strict';

(function () {
  var MAX_CHARACTERS_IN_COMMENT = 140;
  var MAX_NUMBER_OF_HASHTAGS = 5;
  var Hashtag = {
    MAX_LENGTH: 20,
    MIN_LENGTH: 2,
  };
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
      .filter(function (element) {
        return element.length > 0;
      })
      .map(function (element) {
        return element.toLowerCase();
      });

    var inputElement = evt.currentTarget;

    if (hashtags.length > MAX_NUMBER_OF_HASHTAGS) {
      inputElement.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      inputElement.style = 'box-shadow: 0 0 0 5px red;';
    } else if (inputElement.value === '') {
      inputElement.setCustomValidity('');
      inputElement.style = 'box-shadow: none;';
    } else {
      for (var i = 0; i < hashtags.length; i++) {
        var hashtag = hashtags[i];

        inputElement.style = 'box-shadow: 0 0 0 5px red;';

        if (hashtag[0] !== '#') {
          inputElement.setCustomValidity('хэш-тег начинается с символа #');
          break;
        } else if (hashtag.length < Hashtag.MIN_LENGTH) {
          inputElement.setCustomValidity('хеш-тег не может состоять только из одной решётки');
          break;
        } else if (hashtags.indexOf(hashtag) !== i) {
          inputElement.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
          break;
        } else if (hashtag.length > Hashtag.MAX_LENGTH) {
          inputElement.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
          break;
        }

        inputElement.setCustomValidity('');
        inputElement.style = 'box-shadow: none;';
      }
    }

  }

  function onPopupEscPress(evt) {
    if (window.util.isEscEvent(evt)) {
      closePopup();
    }
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

  function onFormSubmit(evt) {
    window.backend.save(evt);
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

    formElement.addEventListener('submit', onFormSubmit);

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

    formElement.removeEventListener('submit', onFormSubmit);

    closeFormElement.removeEventListener('click', closePopup);
  }

  window.form = {
    open: openPopup,
    close: closePopup
  };
})();
