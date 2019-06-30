'use strict';

(function () {
  window.fragment = document.createDocumentFragment();
  var accommodationTypeFilter = document.querySelector('#housing-type');
  var mapPinsBlock = document.querySelector('.map__pins');
  var ADS_MAX_AMOUNT = 5;

  var onSuccess = function (data) {
    accommodationTypeFilter.addEventListener('click', function () {
      var pin = mapPinsBlock.querySelector('.map__pin:not(.map__pin--main)');
      while (pin) {
        mapPinsBlock.removeChild(pin);
        pin = mapPinsBlock.querySelector('.map__pin:not(.map__pin--main)');
      }
      window.utils.onFilterTypeClick(data, ADS_MAX_AMOUNT);
      mapPinsBlock.appendChild(window.fragment);
    });
  };

  window.recieveData(onSuccess, window.utils.onError);
})();
