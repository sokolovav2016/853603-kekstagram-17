'use strict';

(function () {
  var FILTER_VALUE_DEFAULT = 100;
  var previewImgElement = document.querySelector('.img-upload__preview').children[0];
  var effectsElement = document.querySelector('.img-upload__effects');
  var checkedFilterType = effectsElement.querySelector('input[checked]').value;

  function hideSlider(type) {
    var sliderElement = document.querySelector('.img-upload__effect-level');

    if (type === 'none') {
      sliderElement.classList.add('hidden');
    } else {
      sliderElement.classList.remove('hidden');
    }
  }

  function setPreviewClass(type) {
    switch (type) {
      case 'none':
        previewImgElement.className = 'effects__preview--none';
        break;
      case 'chrome':
        previewImgElement.className = 'effects__preview--chrome';
        break;
      case 'sepia':
        previewImgElement.className = 'effects__preview--sepia';
        break;
      case 'marvin':
        previewImgElement.className = 'effects__preview--marvin';
        break;
      case 'phobos':
        previewImgElement.className = 'effects__preview--phobos';
        break;
      case 'heat':
        previewImgElement.className = 'effects__preview--heat';
        break;
    }
  }

  function getFilterValue(filter, value) {
    var coefficient = value / 100;
    var filterValue = (filter.max - filter.min) * coefficient + filter.min;
    return filter.name + '(' + filterValue + filter.suffix + ')';
  }

  function setPreviewFilterStyle(type, value) {
    var FILTERS = [
      {
        name: 'grayscale',
        min: 0,
        max: 1,
        suffix: ''
      },
      {
        name: 'sepia',
        min: 0,
        max: 1,
        suffix: ''
      },
      {
        name: 'invert',
        min: 0,
        max: 100,
        suffix: '%'
      },
      {
        name: 'blur',
        min: 0,
        max: 3,
        suffix: 'px'
      },
      {
        name: 'brightness',
        min: 1,
        max: 3,
        suffix: ''
      },
    ];

    switch (type) {
      case 'none':
        previewImgElement.style.filter = '';
        break;
      case 'chrome':
        previewImgElement.style.filter = getFilterValue(FILTERS[0], value);
        break;
      case 'sepia':
        previewImgElement.style.filter = getFilterValue(FILTERS[1], value);
        break;
      case 'marvin':
        previewImgElement.style.filter = getFilterValue(FILTERS[2], value);
        break;
      case 'phobos':
        previewImgElement.style.filter = getFilterValue(FILTERS[3], value);
        break;
      case 'heat':
        previewImgElement.style.filter = getFilterValue(FILTERS[4], value);
        break;
    }
  }

  function setFilter(type, value) {
    hideSlider(type);
    setPreviewClass(type);
    setPreviewFilterStyle(type, value);
  }

  function onFilterChange(evt) {
    var SLIDER_WIDTH = 453;

    setFilter(evt.target.value, FILTER_VALUE_DEFAULT);
    window.slider.set(SLIDER_WIDTH, FILTER_VALUE_DEFAULT);
  }

  function addFilter() {
    effectsElement.addEventListener('change', onFilterChange);
  }

  function removeFilter() {
    effectsElement.removeEventListener('change', onFilterChange);
  }

  function setFilterDefault() {
    setFilter(checkedFilterType, FILTER_VALUE_DEFAULT);
  }

  window.filter = {
    add: addFilter,
    remove: removeFilter,
    set: setFilter,
    setDefault: setFilterDefault
  };
})();
