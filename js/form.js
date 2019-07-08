'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pin');
  var adForm = document.querySelector('.ad-form');
  var allInputsAndSelects = document.querySelectorAll('input, select');
  var addressField = adForm.querySelector('#address');
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

  var PinSize = {
    PIN_WIDTH: document.querySelector('.map__pin--main').offsetWidth,
    PIN_HEIGHT: document.querySelector('.map__pin--main').offsetHeight
  };

  var PinInitialPosition = {
    PIN_Y: document.querySelector('.map__pin--main').offsetTop,
    PIN_X: document.querySelector('.map__pin--main').offsetLeft
  };

  addressField.value = (PinInitialPosition.PIN_X - (PinSize.PIN_WIDTH * 0.5)) + ',' + (PinInitialPosition.PIN_Y - PinSize.PIN_HEIGHT);

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

  var onSuccess = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    window.utils.createSuccessMessage();
    addressField.value = PinInitialPosition.PIN_X + ',' + PinInitialPosition.PIN_Y;
    window.utils.deactivateMap(map, adForm, 'map--faded', 'ad-form--disabled', allInputsAndSelects);
    pins.forEach(function (it) {
      it.remove();
    });
    mapPin.style = 'top: ' + PinInitialPosition.PIN_Y + 'px;' + 'left: ' + PinInitialPosition.PIN_X + 'px;';
  };

  departureField.addEventListener('click', function () {
    window.utils.synchronizeTwoFields(departureField, arriveField);
  });

  rooms.addEventListener('click', onRoomsFieldClick);

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.sendData(onSuccess, window.utils.onError);
  });
})();
