'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    getRandomIntegerInRange: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    getRandomArrayElement: function (arr) {
      var index = window.util.getRandomIntegerInRange(0, arr.length - 1);
      return arr[index];
    }
  };
})();
