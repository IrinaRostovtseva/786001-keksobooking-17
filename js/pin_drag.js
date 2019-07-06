'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin--main');
  var MAP_PIN_WIDTH = mapPin.offsetWidth;
  var MAP_PIN_HEIGHT = mapPin.offsetHeight;
  var inputsAndSelects = document.querySelectorAll('input, select');
  var adForm = document.querySelector('.ad-form');
  var addressField = document.querySelector('#address');
  var isActive = false;
  var MapPinCoordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };
  var Limit = {
    TOP: 130,
    BOTTOM: 630
  };
  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var pinPosition = new MapPinCoordinate(evt.pageX - MAP_PIN_WIDTH * 0.5 - map.offsetLeft, window.utils.compareNumberWithLimits(evt.pageY - MAP_PIN_HEIGHT, Limit.TOP, Limit.BOTTOM));
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      pinPosition = new MapPinCoordinate(moveEvt.pageX - MAP_PIN_WIDTH * 0.5 - map.offsetLeft, window.utils.compareNumberWithLimits(moveEvt.pageY - MAP_PIN_HEIGHT, Limit.TOP, Limit.BOTTOM));
      if (!isActive) {
        window.utils.activateMap(map, adForm, 'map--faded', 'ad-form--disabled', inputsAndSelects);
        isActive = true;
      }
      mapPin.style = 'top: ' + pinPosition.y + 'px;' + 'left: ' + pinPosition.x + 'px;';
      addressField.value = pinPosition.x + ',' + pinPosition.y;
    };
    var onMouseUp = function () {
      mapPin.style = 'top: ' + pinPosition.y + 'px;' + 'left: ' + pinPosition.x + 'px;';
      addressField.value = pinPosition.x + ',' + pinPosition.y;
      if (!isActive) {
        window.utils.activateMap(map, adForm, 'map--faded', 'ad-form--disabled', inputsAndSelects);
        isActive = true;
      }
      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };
    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });
})();
