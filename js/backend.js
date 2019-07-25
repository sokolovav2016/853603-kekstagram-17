'use strict';

(function () {
  var Url = {
    LOAD: 'https://js.dump.academy/kekstagram/data',
    SAVE: 'https://js.dump.academy/kekstagra'
  };
  var TIMEOUT = 3000;
  var HTTP_OK = 200;
  var mainElement = document.querySelector('main');
  var formElement = mainElement.querySelector('.img-upload__form');

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

      closeElements.forEach(function (el) {
        if (evt.target === el) {
          messageElement.remove();
          document.removeEventListener('keydown', onMessageElementEscPress);
        }
      });
    });

    document.addEventListener('keydown', onMessageElementEscPress);
  }

  // --------------- LOAD ---------------

  function backendLoad(onLoad, onError, listener) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_OK) {
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

    xhr.timeout = TIMEOUT;

    xhr.open('GET', Url.LOAD);
    xhr.send();
  }

  // --------------- SAVE ---------------

  function backendSave(evt) {
    evt.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_OK) {
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
