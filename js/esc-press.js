'use strict';

(function () {
  var commentElement = document.querySelector('.text__description');

  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, window.form.close);
  }

  function onCommentFocus() {
    document.removeEventListener('keydown', onPopupEscPress);
    commentElement.removeEventListener('focus', onCommentFocus);
    commentElement.addEventListener('blur', onCommentBlur);
  }

  function onCommentBlur() {
    document.addEventListener('keydown', onPopupEscPress);
    commentElement.addEventListener('focus', onCommentFocus);
    commentElement.removeEventListener('blur', onCommentBlur);
  }

  function addEscPress() {
    document.addEventListener('keydown', onPopupEscPress);
    commentElement.addEventListener('focus', onCommentFocus);
  }

  function removeEscPress() {
    document.removeEventListener('keydown', onPopupEscPress);
    commentElement.removeEventListener('focus', onCommentFocus);
  }

  window.escPress = {
    add: addEscPress,
    remove: removeEscPress
  };
})();
