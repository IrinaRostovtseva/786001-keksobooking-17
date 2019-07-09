'use strict';

(function () {
  window.fragment = document.createDocumentFragment();
  var filter = document.querySelector('.map__filters');
  var mapPinsBlock = document.querySelector('.map__pins');
  var ADS_MAX_AMOUNT = 5;
  var lastTimeout;
  var onSuccess = function (data) {
    filter.addEventListener('click', function () {
      var pins = mapPinsBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (it) {
        it.remove();
      });
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(window.utils.onFilterClick(data, ADS_MAX_AMOUNT), 500);
      mapPinsBlock.appendChild(window.fragment);
    });
  };

  window.recieveData(onSuccess, window.utils.onError);
})();
