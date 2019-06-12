'use strict';
var map = document.querySelector('.map');
var MAP_WIDTH = map.offsetWidth;
var MAP_HEIGHT = map.offsetHeight;
var mapPin = document.querySelector('.map__pin');
var MAP_PIN_WIDTH = mapPin.offsetWidth;
var MAP_PIN_HEIGHT = mapPin.offsetHeight;

var sameAds = [];
var accomodationTypes = ['palace', 'flat', 'house', 'bungalo'];

var getRandomNumber = function (maxRange) {
  var randomNumber = Math.floor(Math.random() * maxRange);
  return randomNumber;
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
      x: (function () {
        if (getRandomNumber(MAP_WIDTH) - (MAP_PIN_WIDTH / 2) < 0) {
          return getRandomNumber(MAP_WIDTH) + (MAP_PIN_WIDTH / 2);
        } else if (getRandomNumber(MAP_WIDTH) + (MAP_PIN_WIDTH / 2) > MAP_WIDTH) {
          return getRandomNumber(MAP_WIDTH) - (MAP_PIN_WIDTH / 2);
        }
        return getRandomNumber(MAP_WIDTH) - (MAP_PIN_WIDTH / 2);
      })(),
      y: (function () {
        if (getRandomNumber(MAP_HEIGHT) < 130 - MAP_PIN_HEIGHT) {
          return 130 - MAP_PIN_HEIGHT;
        } else if (getRandomNumber(MAP_WIDTH) > 630 - MAP_PIN_HEIGHT) {
          return 630 - MAP_PIN_HEIGHT;
        }
        return getRandomNumber(MAP_HEIGHT) - MAP_PIN_HEIGHT;
      })()
    }
  };
  sameAds[i] = ad;
}
