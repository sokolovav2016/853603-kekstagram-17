'use strict';

(function () {
  var Url = {
    LOAD: 'https://js.dump.academy/kekstagram/data',
    SAVE: 'https://js.dump.academy/kekstagram'
  };
  var formElement = document.querySelector('.img-upload__form');

  var successElement = document.querySelector('#success')
    .content
    .querySelector('.success')
    .cloneNode(true);
  var successCloseElements = successElement.querySelectorAll('.success__button');

  var errorElement = document.querySelector('#error')
    .content
    .querySelector('.error')
    .cloneNode(true);
  var errorCloseElements = errorElement.querySelectorAll('.error__button');

  // --------------- MESSAGE ---------------

  function showMessage(messageElement, closeElements) {
    var mainElement = document.querySelector('main');

    function onMessageElementEscPress(evt) {
      if (window.util.isEscEvent(evt)) {
        messageElement.remove();
        document.removeEventListener('keydown', onMessageElementEscPress);
      }
    }

    mainElement.appendChild(messageElement);

    messageElement.addEventListener('click', function (evt) {
      if (evt.target === messageElement) {
        messageElement.remove();
        document.removeEventListener('keydown', onMessageElementEscPress);
      }

      for (var i = 0; i < closeElements.length; i++) {
        if (evt.target === closeElements[i]) {
          messageElement.remove();
          document.removeEventListener('keydown', onMessageElementEscPress);
        }
      }
    });

    document.addEventListener('keydown', onMessageElementEscPress);
  }

  // --------------- LOAD ---------------

  function backendLoad(onLoad, onError, listener) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
        listener(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 3000;

    xhr.open('GET', Url.LOAD);
    xhr.send();
  }

  // --------------- SAVE ---------------

  function backendSave(evt) {
    evt.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        showMessage(successElement, successCloseElements);
      } else {
        showMessage(errorElement, errorCloseElements);
      }

      window.form.close();
    });

    xhr.addEventListener('error', function () {
      window.error.init('Произошла ошибка соединения');
    });

    xhr.open('POST', Url.SAVE);
    xhr.send(new FormData(formElement));
  }

  window.backend = {
    load: backendLoad,
    save: backendSave
  };
})();
