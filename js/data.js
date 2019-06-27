'use strict';

(function () {
  window.recieveData = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.status + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка подключения');
    });
    xhr.send();
  };
})();
