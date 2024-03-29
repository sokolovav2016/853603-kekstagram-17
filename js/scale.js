'use strict';

(function () {
  var Scale = {
    MIN: 25,
    MAX: 100
  };
  var scaleSmallElement = document.querySelector('.scale__control--smaller');
  var scaleBigElement = document.querySelector('.scale__control--bigger');
  var scaleValueElement = document.querySelector('.scale__control--value');
  var previewImgElement = document.querySelector('.img-upload__preview img');

  function onСontrolScaleSmallerClick() {
    var value = parseInt(scaleValueElement.value, 10);

    if (value > Scale.MIN) {
      value -= Scale.MIN;
      scaleValueElement.value = value + '%';
      previewImgElement.style.transform = 'scale(' + value / 100 + ')';
    }
  }

  function onСontrolScaleBiggerClick() {
    var value = parseInt(scaleValueElement.value, 10);

    if (value < Scale.MAX) {
      value += Scale.MIN;
      scaleValueElement.value = value + '%';
      previewImgElement.style.transform = 'scale(' + value / 100 + ')';
    }
  }

  function addScaleListeners() {
    scaleSmallElement.addEventListener('click', onСontrolScaleSmallerClick);
    scaleBigElement.addEventListener('click', onСontrolScaleBiggerClick);
  }

  function removeScaleListeners() {
    scaleSmallElement.removeEventListener('click', onСontrolScaleSmallerClick);
    scaleBigElement.removeEventListener('click', onСontrolScaleBiggerClick);
  }

  function setScaleDefault() {
    previewImgElement.style.transform = 'scale(1)';
  }

  window.scale = {
    addListeners: addScaleListeners,
    removeListeners: removeScaleListeners,
    setDefault: setScaleDefault
  };
})();
