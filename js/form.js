'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var priceField = adForm.querySelector('#price');
  var typeField = adForm.querySelector('#type');
  var arriveField = adForm.querySelector('#timein');
  var departureField = adForm.querySelector('#timeout');
  var rooms = adForm.querySelector('#room_number');
  var roomsFields = Array.from(rooms.querySelectorAll('option'));
  var capacityFields = Array.from(adForm.querySelectorAll('#capacity option'));
  var accomodationTypes = ['palace', 'flat', 'house', 'bungalo'];
  var accommodationPrices = [10000, 1000, 5000, 0];
  var RoomsToGuests = {
    1: '1',
    2: '2',
    3: '3',
    100: '0'
  };

  var onAccommodationTypeClick = function () {
    var checkedType = typeField.querySelector('option:checked');
    for (var i = 0; i < accomodationTypes.length; i++) {
      if (checkedType.value === accomodationTypes[i]) {
        priceField.min = accommodationPrices[i];
        priceField.placeholder = '' + accommodationPrices[i];
      }
    }
  };
  var onRoomsFieldClick = function () {
    var checkedRoomsValue = rooms.querySelector('option:checked').value;

    roomsFields.forEach(function () {
      capacityFields.forEach(function (it) {
        it.setAttribute('disabled', 'disabled');
        it.removeAttribute('selected');
      });
      var abledGuestFields = capacityFields.filter(function (it) {
        return it.value <= RoomsToGuests[checkedRoomsValue] && it.value > 0;
      });
      if (checkedRoomsValue === '100') {
        abledGuestFields = capacityFields.filter(function (it) {
          return it.value === RoomsToGuests[checkedRoomsValue];
        });
      }
      window.utils.removeAtributeFromElement(abledGuestFields, 'disabled');
      abledGuestFields[0].setAttribute('selected', 'selected');
    });
  };
  typeField.addEventListener('click', onAccommodationTypeClick);
  arriveField.addEventListener('click', function () {
    window.utils.synchronizeTwoFields(arriveField, departureField);
  });
  departureField.addEventListener('click', function () {
    window.utils.synchronizeTwoFields(departureField, arriveField);
  });
  rooms.addEventListener('click', onRoomsFieldClick);
  adForm.addEventListener('submit', function () {
    window.utils.createSuccessMessage();
  });
})();
