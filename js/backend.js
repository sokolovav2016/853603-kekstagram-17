'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';

  function backendLoad(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
        // onLoad(window.data);

      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        // onLoad(window.data);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
      // onLoad(window.data);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      // onLoad(window.data);
    });

    xhr.timeout = 3000;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  }

  window.backend = {
    load: backendLoad
  };
})();
