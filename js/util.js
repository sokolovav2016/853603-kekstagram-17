'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.util = {
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },

    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    getRandomIntegerInRange: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    removeDebounce: function (cb) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    }
  };
})();
