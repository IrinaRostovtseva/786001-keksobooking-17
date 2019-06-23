'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin--main');
  var MAP_PIN_WIDTH = mapPin.offsetWidth;
  var MAP_PIN_HEIGHT = mapPin.offsetHeight;
  var inputsAndSelects = document.querySelectorAll('input, select');
  var adForm = document.querySelector('.ad-form');
  var addressField = document.querySelector('#address');

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var pinPosition = {
      x: evt.pageX - MAP_PIN_WIDTH * 0.5 - map.offsetLeft,
      y: window.utils.compareNumberWithLimits(evt.pageY - MAP_PIN_HEIGHT, 130, 630)
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var mapPinsBlock = document.querySelector('.map__pins');
      pinPosition = {
        x: moveEvt.pageX - MAP_PIN_WIDTH * 0.5 - map.offsetLeft,
        y: window.utils.compareNumberWithLimits(moveEvt.pageY - MAP_PIN_HEIGHT, 130, 630)
      };
      mapPinsBlock.appendChild(window.fragment);
      window.utils.activateMap(map, adForm, 'map--faded', 'ad-form--disabled', inputsAndSelects);
      mapPin.style = 'top: ' + pinPosition.y + 'px;' + 'left: ' + pinPosition.x + 'px;';
      addressField.value = pinPosition.x + ',' + pinPosition.y;
    };
    var onMouseUp = function () {
      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };
    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });
})();
