'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapPinElement = mapElement.querySelector('.map__pin--main');
  var mapPinsBlockElement = mapElement.querySelector('.map__pins');
  var adFormElement = document.querySelector('.ad-form');
  var addressFieldElement = adFormElement.querySelector('#address');
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
    mapPinsBlockElement.appendChild(window.fragment);
  };

  mapPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var pinPosition = new MapPinCoordinate(evt.pageX - PinSize.PIN_WIDTH * 0.5 - mapElement.offsetLeft, window.utils.compareNumberWithLimits(evt.pageY - PinSize.PIN_HEIGHT, Limit.TOP, Limit.BOTTOM));
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      pinPosition = new MapPinCoordinate(moveEvt.pageX - PinSize.PIN_WIDTH * 0.5 - mapElement.offsetLeft, window.utils.compareNumberWithLimits(moveEvt.pageY - PinSize.PIN_HEIGHT, Limit.TOP, Limit.BOTTOM));
      if (mapElement.classList.contains('map--faded')) {
        window.utils.activateMap();
        window.recieveData(onSuccess, window.utils.onError);
      }
      mapPinElement.style = 'top: ' + pinPosition.y + 'px;' + 'left: ' + pinPosition.x + 'px;';
      addressFieldElement.value = pinPosition.x + ', ' + pinPosition.y;
    };

    var onMouseUp = function () {
      mapPinElement.style = 'top: ' + pinPosition.y + 'px;' + 'left: ' + pinPosition.x + 'px;';
      addressFieldElement.value = pinPosition.x + ', ' + pinPosition.y;
      if (mapElement.classList.contains('map--faded')) {
        window.utils.activateMap();
        window.recieveData(onSuccess, window.utils.onError);
      }
      mapElement.removeEventListener('mousemove', onMouseMove);
      mapElement.removeEventListener('mouseup', onMouseUp);
    };
    mapElement.addEventListener('mousemove', onMouseMove);
    mapElement.addEventListener('mouseup', onMouseUp);
  });
})();
