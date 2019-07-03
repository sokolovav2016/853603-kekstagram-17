'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';

  function backendLoad(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('GET', URL_LOAD);
    xhr.send();
  }

  window.backend = {
    load: backendLoad
  };
})();
