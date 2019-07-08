'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pin--main');
  var mapPinsBlock = map.querySelector('.map__pins');
  var inputsAndSelects = document.querySelectorAll('input, select');
  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.querySelector('#address');
  var MapPinCoordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };
  var Limit = {
    TOP: 130,
    BOTTOM: 630
  };
  var PinSize = {
    PIN_WIDTH: document.querySelector('.map__pin--main').offsetWidth,
    PIN_HEIGHT: document.querySelector('.map__pin--main').offsetHeight
  };

  var onSuccess = function (data) {
    var slicedData = data.slice(0, 5);
    window.utils.createPin(slicedData, window.fragment);
    mapPinsBlock.appendChild(window.fragment);
  };

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var pinPosition = new MapPinCoordinate(evt.pageX - PinSize.PIN_WIDTH * 0.5 - map.offsetLeft, window.utils.compareNumberWithLimits(evt.pageY - PinSize.PIN_HEIGHT, Limit.TOP, Limit.BOTTOM));
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      pinPosition = new MapPinCoordinate(moveEvt.pageX - PinSize.PIN_WIDTH * 0.5 - map.offsetLeft, window.utils.compareNumberWithLimits(moveEvt.pageY - PinSize.PIN_HEIGHT, Limit.TOP, Limit.BOTTOM));
      if (map.classList.contains('map--faded')) {
        window.utils.activateMap(map, adForm, 'map--faded', 'ad-form--disabled', inputsAndSelects);
        window.recieveData(onSuccess, window.utils.onError);
      }
      mapPin.style = 'top: ' + pinPosition.y + 'px;' + 'left: ' + pinPosition.x + 'px;';
      addressField.value = pinPosition.x + ',' + pinPosition.y;
    };

    var onMouseUp = function () {
      mapPin.style = 'top: ' + pinPosition.y + 'px;' + 'left: ' + pinPosition.x + 'px;';
      addressField.value = pinPosition.x + ',' + pinPosition.y;
      if (map.classList.contains('map--faded')) {
        window.utils.activateMap(map, adForm, 'map--faded', 'ad-form--disabled', inputsAndSelects);
        window.recieveData(onSuccess, window.utils.onError);
      }
      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };
    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });
})();
