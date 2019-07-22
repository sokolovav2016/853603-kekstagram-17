'use strict';

(function () {
  function renderError(errorMessage) {
    if (document.body.contains(document.querySelector('.error'))) {
      document.querySelector('.error').remove();
    }

    var node = document.createElement('div');
    node.className = 'error';
    node.style = 'width: 100%; height: 100px; display: flex; justify-content: center; align-items: center; text-content: center; z-index: 100; background-color: rgba(255, 0, 0, 0.7);';
    node.style.position = 'absolute';
    node.style.top = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.error = {
    init: renderError
  };
})();
