'use strict';

(function () {
  var FILTER_VALUE_DEFAULT = 100;
  var PIN_WIDTH = 18;
  var SLIDER_WIDTH = 453;
  var sliderValueElement = document.querySelector('.effect-level__value');
  var sliderControlElement = document.querySelector('.effect-level__pin');

  function setSlider(shift, value) {
    var sliderBarElement = document.querySelector('.effect-level__depth');
    var checkedFilterType = document.querySelector('input:checked').value;

    sliderControlElement.style.left = shift + 'px';
    sliderBarElement.style.width = value + '%';
    sliderValueElement.value = value;

    window.filter.set(checkedFilterType, value);
  }

  function elementDrag(evt) {
    evt.preventDefault();

    var dragElement = evt.target;
    var startСoordinate = evt.clientX;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var sliderLineElement = document.querySelector('.effect-level__line');
      var line = sliderLineElement.getBoundingClientRect();

      if (moveEvt.clientX > line.left - (PIN_WIDTH / 2) && moveEvt.clientX < line.left + line.width + (PIN_WIDTH / 2)) {
        var shift = startСoordinate - moveEvt.clientX;
        var parentShift = dragElement.offsetLeft - shift;

        if (parentShift >= 0 && parentShift <= line.width) {
          startСoordinate = moveEvt.clientX;
          var value = Math.round(parentShift / line.width * 100);

          setSlider(parentShift, value);
        }
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onPinMouseDown(evt) {
    elementDrag(evt);
  }

  function addSliderListeners() {
    sliderControlElement.addEventListener('mousedown', onPinMouseDown);
  }

  function removeSliderListeners() {
    sliderControlElement.removeEventListener('mousedown', onPinMouseDown);
  }

  function setSliderDefault() {
    var sliderControlDefault = SLIDER_WIDTH / FILTER_VALUE_DEFAULT * sliderValueElement.value;

    setSlider(sliderControlDefault, sliderValueElement.value);
  }

  window.slider = {
    addListeners: addSliderListeners,
    removeListeners: removeSliderListeners,
    set: setSlider,
    setDefault: setSliderDefault
  };
})();
