'use strict';

(function () {
  var MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var MAP_HEIGHT = document.querySelector('.map').offsetHeight;
  var MAP_PIN_WIDTH = document.querySelector('.map__pin').offsetWidth;
  var MAP_PIN_HEIGHT = document.querySelector('.map__pin').offsetHeight;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  window.fragment = document.createDocumentFragment();
  var sameAds = [];
  var accomodationTypes = ['palace', 'flat', 'house', 'bungalo'];

  for (var i = 0; i < 8; i++) {
    var ad = {
      author: {
        avatar: 'img/avatars/user' + 0 + (i + 1) + '.png'
      },
      offer: {
        type: accomodationTypes[window.utils.getRandomNumber(accomodationTypes.length)]
      },
      location: {
        x: window.utils.compareNumberWithLimits(window.utils.getRandomNumber(MAP_WIDTH) - (MAP_PIN_WIDTH / 2), MAP_PIN_WIDTH / 2, MAP_WIDTH - (MAP_PIN_WIDTH / 2)),
        y: window.utils.compareNumberWithLimits((window.utils.getRandomNumber(MAP_HEIGHT) - MAP_PIN_HEIGHT), 130, 630)
      }
    };
    sameAds[i] = ad;
  }
  window.utils.createSameElement(sameAds, pinTemplate, window.fragment);
})();
