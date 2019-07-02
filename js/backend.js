'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';

  function backendLoad(onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('GET', URL_LOAD);
    xhr.send();
  }

  window.backend = {
    load: backendLoad
  };
})();
