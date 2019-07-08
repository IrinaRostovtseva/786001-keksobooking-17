'use strict';

(function () {
  window.recieveData = function (onSuccess, onError) {
    var url = 'https://js.dump.academy/keksobooking/data';
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
  window.sendData = function (onSuccess, onError) {
    var url = 'https://js.dump.academy/keksobooking';
    var form = document.querySelector('.ad-form');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess();
      } else {
        onError(xhr.status + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка подключения');
    });
    xhr.send(new FormData(form));
  };
})();
