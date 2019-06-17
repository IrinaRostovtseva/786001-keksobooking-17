'use strict';

var map = document.querySelector('.map');
var MAP_WIDTH = map.offsetWidth;
var MAP_HEIGHT = map.offsetHeight;
var mapPinsBlock = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin--main');
var MAP_PIN_WIDTH = mapPin.offsetWidth;
var MAP_PIN_HEIGHT = mapPin.offsetHeight;
var adForm = document.querySelector('.ad-form');
var inputField = document.querySelectorAll('input');
var selectField = document.querySelectorAll('select');
var addressField = adForm.querySelector('#address');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var mapPinXPosition = mapPin.offsetLeft - (MAP_PIN_WIDTH * 0.5);
var mapPinYPosition = mapPin.offsetTop + MAP_PIN_HEIGHT;

var sameAds = [];
var accomodationTypes = ['palace', 'flat', 'house', 'bungalo'];

// активация карты

var setAtributeToElement = function (arr, atribut) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].setAttribute('' + atribut, '' + atribut);
  }
  return arr;
};
var removeAtributeFromElement = function (arr, atribut) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].removeAttribute('' + atribut);
  }
  return arr;
};

var activateMap = function () {
  removeAtributeFromElement(inputField, 'disabled');
  removeAtributeFromElement(selectField, 'disabled');
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
};

addressField.value = mapPinXPosition + ',' + mapPinYPosition;
setAtributeToElement(inputField, 'disabled');
setAtributeToElement(selectField, 'disabled');

mapPin.addEventListener('click', activateMap);

var getRandomNumber = function (maxRange) {
  var randomNumber = Math.floor(Math.random() * maxRange);
  return randomNumber;
};

var compareNumberWithLimits = function (n, min, max) {
  if (n < min) {
    n = min;
  } else if (n > max) {
    n = max;
  }
  return n;
};

for (var i = 0; i < 8; i++) {
  var ad = {
    author: {
      avatar: 'img/avatars/user' + 0 + (i + 1) + '.png'
    },
    offer: {
      type: accomodationTypes[getRandomNumber(accomodationTypes.length)]
    },
    location: {
      x: compareNumberWithLimits(getRandomNumber(MAP_WIDTH) - (MAP_PIN_WIDTH / 2), MAP_PIN_WIDTH / 2, MAP_WIDTH - (MAP_PIN_WIDTH / 2)),
      y: compareNumberWithLimits((getRandomNumber(MAP_HEIGHT) - MAP_PIN_HEIGHT), 130, 630)
    }
  };
  sameAds[i] = ad;
}

var createSameAdPin = function (arr) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + arr.location.x + 'px; top: ' + arr.location.y + 'px;';
  pinElement.querySelector('img').src = arr.author.avatar;
  pinElement.querySelector('img').alt = arr.offer.type;
  return pinElement;
};
for (var j = 0; j < sameAds.length; j++) {
  var pin = createSameAdPin(sameAds[j]);
  fragment.appendChild(pin);
}
mapPinsBlock.appendChild(fragment);
