'use strict';

(function () {
  var priceField = document.querySelector('#price');
  var typeField = document.querySelector('#type');
  var arriveField = document.querySelector('#timein');
  var departureField = document.querySelector('#timeout');

  var accomodationTypes = ['palace', 'flat', 'house', 'bungalo'];
  var accommodationPrices = [10000, 1000, 5000, 0];

  var onAccommodationTypeClick = function () {
    var checkedType = typeField.querySelector('option:checked');
    for (var i = 0; i < accomodationTypes.length; i++) {
      if (checkedType.value === accomodationTypes[i]) {
        priceField.min = accommodationPrices[i];
        priceField.placeholder = '' + accommodationPrices[i];
      }
    }
  };

  typeField.addEventListener('click', onAccommodationTypeClick);
  arriveField.addEventListener('click', function () {
    window.utils.synchronizeTwoFields(arriveField, departureField);
  });
  departureField.addEventListener('click', function () {
    window.utils.synchronizeTwoFields(departureField, arriveField);
  });
})();
