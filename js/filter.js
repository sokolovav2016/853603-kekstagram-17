'use strict';

(function () {
  var FILTER_VALUE_DEFAULT = 100;
  var SLIDER_WIDTH = 453;
  var Filters = {
    grayscale: {
      name: 'grayscale',
      min: 0,
      max: 1,
      suffix: ''
    },
    sepia: {
      name: 'sepia',
      min: 0,
      max: 1,
      suffix: ''
    },
    invert: {
      name: 'invert',
      min: 0,
      max: 100,
      suffix: '%'
    },
    blur: {
      name: 'blur',
      min: 0,
      max: 3,
      suffix: 'px'
    },
    brightness: {
      name: 'brightness',
      min: 1,
      max: 3,
      suffix: ''
    }
  };
  var previewImgElement = document.querySelector('.img-upload__preview').children[0];
  var effectsElement = document.querySelector('.img-upload__effects');
  var checkedFilterType = effectsElement.querySelector('input[checked]').value;
  var valueToClassname = {
    'none': 'effects__preview--none',
    'chrome': 'effects__preview--chrome',
    'sepia': 'effects__preview--sepia',
    'marvin': 'effects__preview--marvin',
    'phobos': 'effects__preview--phobos',
    'heat': 'effects__preview--heat'
  };

  function hideSlider(type) {
    var sliderElement = document.querySelector('.img-upload__effect-level');

    if (type === 'none') {
      sliderElement.classList.add('hidden');
    } else {
      sliderElement.classList.remove('hidden');
    }
  }

  function setPreviewClass(type) {
    previewImgElement.className = valueToClassname[type];
  }

  function getFilterValue(filter, value) {
    var coefficient = value / 100;
    var filterValue = (filter.max - filter.min) * coefficient + filter.min;
    return filter.name + '(' + filterValue + filter.suffix + ')';
  }

  function setPreviewFilterStyle(type, value) {
    switch (type) {
      case 'none':
        previewImgElement.style.filter = '';
        break;
      case 'chrome':
        previewImgElement.style.filter = getFilterValue(Filters.grayscale, value);
        break;
      case 'sepia':
        previewImgElement.style.filter = getFilterValue(Filters.sepia, value);
        break;
      case 'marvin':
        previewImgElement.style.filter = getFilterValue(Filters.invert, value);
        break;
      case 'phobos':
        previewImgElement.style.filter = getFilterValue(Filters.blur, value);
        break;
      case 'heat':
        previewImgElement.style.filter = getFilterValue(Filters.brightness, value);
        break;
    }
  }

  function setFilter(type, value) {
    hideSlider(type);
    setPreviewClass(type);
    setPreviewFilterStyle(type, value);
  }

  function onFilterChange(evt) {
    setFilter(evt.target.value, FILTER_VALUE_DEFAULT);
    window.slider.set(SLIDER_WIDTH, FILTER_VALUE_DEFAULT);
  }

  function addFilterListeners() {
    effectsElement.addEventListener('change', onFilterChange);
  }

  function removeFilterListeners() {
    effectsElement.removeEventListener('change', onFilterChange);
  }

  function setFilterDefault() {
    setFilter(checkedFilterType, FILTER_VALUE_DEFAULT);
  }

  window.filter = {
    addListeners: addFilterListeners,
    removeListeners: removeFilterListeners,
    set: setFilter,
    setDefault: setFilterDefault
  };
})();
