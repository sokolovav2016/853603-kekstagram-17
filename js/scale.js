'use strict';

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;

  var scaleSmallElement = document.querySelector('.scale__control--smaller');
  var scaleBigElement = document.querySelector('.scale__control--bigger');
  var scaleValueElement = document.querySelector('.scale__control--value');
  var previewImgElement = document.querySelector('.img-upload__preview').children[0];

  function onСontrolScaleSmallerClick() {
    var value = parseInt(scaleValueElement.value, 10);

    if (value > MIN_SCALE) {
      value -= MIN_SCALE;
      scaleValueElement.value = value + '%';
      previewImgElement.style.transform = 'scale(' + value / 100 + ')';
    }
  }

  function onСontrolScaleBiggerClick() {
    var value = parseInt(scaleValueElement.value, 10);

    if (value < MAX_SCALE) {
      value += MIN_SCALE;
      scaleValueElement.value = value + '%';
      previewImgElement.style.transform = 'scale(' + value / 100 + ')';
    }
  }

  function addScale() {
    scaleSmallElement.addEventListener('click', onСontrolScaleSmallerClick);
    scaleBigElement.addEventListener('click', onСontrolScaleBiggerClick);
  }

  function removeScale() {
    scaleSmallElement.removeEventListener('click', onСontrolScaleSmallerClick);
    scaleBigElement.removeEventListener('click', onСontrolScaleBiggerClick);
  }

  window.scale = {
    addListeners: addScale,
    removeListeners: removeScale
  };
})();
