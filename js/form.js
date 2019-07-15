'use strict';

(function () {
  var mapPinElement = document.querySelector('.map__pin');
  var adFormElement = document.querySelector('.ad-form');
  var addressFieldElement = adFormElement.querySelector('#address');
  var priceFieldElement = adFormElement.querySelector('#price');
  var typeFieldElement = adFormElement.querySelector('#type');
  var arriveFieldElement = adFormElement.querySelector('#timein');
  var departureFieldElement = adFormElement.querySelector('#timeout');
  var roomsElement = adFormElement.querySelector('#room_number');
  var roomsOptionElements = Array.from(roomsElement.querySelectorAll('option'));
  var capacityOptionElements = Array.from(adFormElement.querySelectorAll('#capacity option'));
  var resetButtonElement = adFormElement.querySelector('.ad-form__reset');
  var accomodationTypes = ['palace', 'flat', 'house', 'bungalo'];
  var accommodationPrices = [10000, 1000, 5000, 0];
  var RoomsToGuests = {
    '1': '1',
    '2': '2',
    '3': '3',
    '100': '0'
  };

  var PinSize = {
    PIN_WIDTH: document.querySelector('.map__pin--main').offsetWidth,
    PIN_HEIGHT: document.querySelector('.map__pin--main').offsetHeight
  };

  var PinInitialPosition = {
    PIN_Y: document.querySelector('.map__pin--main').offsetTop,
    PIN_X: document.querySelector('.map__pin--main').offsetLeft
  };

  var setPinInitPosition = function () {
    addressFieldElement.value = (PinInitialPosition.PIN_X - (PinSize.PIN_WIDTH * 0.5)) + ', ' + (PinInitialPosition.PIN_Y - (PinSize.PIN_HEIGHT * 0.5));
    mapPinElement.style = 'top: ' + PinInitialPosition.PIN_Y + 'px;' + 'left: ' + PinInitialPosition.PIN_X + 'px;';
  };

  setPinInitPosition();

  var onAccommodationTypeClick = function () {
    var checkedTypeElement = typeFieldElement.querySelector('option:checked');
    for (var i = 0; i < accomodationTypes.length; i++) {
      if (checkedTypeElement.value === accomodationTypes[i]) {
        priceFieldElement.min = accommodationPrices[i];
        priceFieldElement.placeholder = '' + accommodationPrices[i];
      }
    }
  };
  var onRoomsFieldClick = function () {
    var checkedRoomsValue = roomsElement.querySelector('option:checked').value;

    roomsOptionElements.forEach(function () {
      capacityOptionElements.forEach(function (it) {
        it.setAttribute('disabled', 'disabled');
        it.removeAttribute('selected');
      });
      var abledGuestFields = capacityOptionElements.filter(function (it) {
        return it.value <= RoomsToGuests[checkedRoomsValue] && it.value > 0;
      });
      if (checkedRoomsValue === '100') {
        abledGuestFields = capacityOptionElements.filter(function (it) {
          return it.value === RoomsToGuests[checkedRoomsValue];
        });
      }
      window.utils.removeAtributeFromElement(abledGuestFields, 'disabled');
      abledGuestFields[0].setAttribute('selected', 'selected');
    });
  };
  typeFieldElement.addEventListener('click', onAccommodationTypeClick);
  arriveFieldElement.addEventListener('click', function () {
    window.utils.synchronizeTwoFields(arriveFieldElement, departureFieldElement);
  });

  var onSuccess = function () {
    window.utils.createSuccessMessage();
    window.utils.deactivateMap();
    setPinInitPosition();
  };

  var onResetClick = function () {
    window.utils.deactivateMap();
    setPinInitPosition();
  };

  departureFieldElement.addEventListener('click', function () {
    window.utils.synchronizeTwoFields(departureFieldElement, arriveFieldElement);
  });

  roomsElement.addEventListener('click', onRoomsFieldClick);

  adFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.sendData(onSuccess, window.utils.onError);
  });
  resetButtonElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    onResetClick();
  });
})();
