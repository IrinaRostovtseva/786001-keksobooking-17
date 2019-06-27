'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainBlock = document.querySelector('main');
  window.fragment = document.createDocumentFragment();

  var URL = 'https://js.dump.academy/keksobooking/data';

  var onSuccess = function (data) {
    var sameAds = data;
    window.utils.createSameElement(sameAds, pinTemplate, window.fragment);
  };
  var onError = function (error) {
    var errorMessage = errorTemplate.cloneNode(true);
    errorMessage.querySelector('.error__message').textContent = error;
    mainBlock.appendChild(errorMessage);
    errorMessage.querySelector('.error__button').addEventListener('click', function (evt) {
      evt.preventDefault();
      mainBlock.removeChild(errorMessage);
      window.recieveData(URL, onSuccess, onError);
    });
  };
  window.recieveData(URL, onSuccess, onError);
})();
