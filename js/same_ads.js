'use strict';

(function () {
  window.fragment = document.createDocumentFragment();
  var filterBlockElement = document.querySelector('.map__filters');
  var mapPinsBlockElement = document.querySelector('.map__pins');
  var ADS_MAX_AMOUNT = 5;
  var lastTimeout;
  var onSuccess = function (data) {
    filterBlockElement.addEventListener('click', function () {
      var pinElements = mapPinsBlockElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      pinElements.forEach(function (it) {
        it.remove();
      });
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(window.utils.onFilterClick(data, ADS_MAX_AMOUNT), 500);
      mapPinsBlockElement.appendChild(window.fragment);
    });
  };

  window.recieveData(onSuccess, window.utils.onError);
})();
