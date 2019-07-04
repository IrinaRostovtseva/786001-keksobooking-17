'use strict';

window.utils = (function () {
  return {
    getRandomNumber: function (maxRange) {
      var randomNumber = Math.floor(Math.random() * maxRange);
      return randomNumber;
    },
    compareNumberWithLimits: function (n, min, max) {
      if (n < min) {
        n = min;
      } else if (n > max) {
        n = max;
      }
      return n;
    },
    createPin: function (arr, fragment) {
      var pin = document.querySelector('#pin').content.querySelector('.map__pin');
      var Limit = {
        TOP: 130,
        BOTTOM: 630
      };
      arr.forEach(function (it) {
        var element = pin.cloneNode(true);
        element.style = 'left: ' + it.location.x + 'px; top: ' + window.utils.compareNumberWithLimits(it.location.y, Limit.TOP, Limit.BOTTOM) + 'px;';
        element.querySelector('img').src = it.author.avatar;
        element.querySelector('img').alt = it.offer.title;
        fragment.appendChild(element);
        return fragment;
      });
    },
    removeAtributeFromElement: function (arr, atribut) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].removeAttribute('' + atribut);
      }
      return arr;
    },
    activateMap: function (map, form, mapClassName, formClassName, formElem) {
      window.utils.removeAtributeFromElement(formElem, 'disabled');
      map.classList.remove(mapClassName);
      form.classList.remove(formClassName);
    },
    synchronizeTwoFields: function (field1, field2) {
      var field1CheckedOption = field1.querySelector('option:checked');
      var field2Options = field2.querySelectorAll('option');
      for (var i = 0; i < field2Options.length; i++) {
        field2Options[i].removeAttribute('selected');
        if (field1CheckedOption.value === field2Options[i].value) {
          field2Options[i].selected = true;
        }
      }
    },
    createErrorMessage: function (error, request) {
      var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
      var errorButton = errorMessage.querySelector('.error__button');
      var blockMain = document.querySelector('main');
      errorMessage.querySelector('.error__message').textContent = error;
      blockMain.appendChild(errorMessage);
      errorButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        blockMain.removeChild(errorMessage);
        request();
      });
    },
    onError: function (error) {
      window.utils.createErrorMessage(error, window.recieveData(window.utils.onSuccess, window.utils.onError));
    },
    onFilterTypeClick: function (data, max) {
      var checked = document.querySelector('#housing-type option:checked');
      var ads;
      var map = document.querySelector('.map');
      var adInfoCard = map.querySelector('.map__card');
      if (checked.value !== 'any') {
        ads = data.filter(function (it) {
          return checked.value === it.offer.type;
        }).slice(0, max);
      } else {
        ads = data.slice(0, max);
      }
      window.utils.createPin(ads, window.fragment);
      if (adInfoCard) {
        map.removeChild(adInfoCard);
      }
      window.utils.createAdCard(ads[0], window.fragment);
    },
    createAdCard: function (adData) {
      var map = document.querySelector('.map');
      var filtersBlock = map.querySelector('.map__filters-container');
      var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
      var card = cardTemplate.cloneNode(true);
      card.querySelector('.popup__title').textContent = adData.offer.title;
      card.querySelector('.popup__text--address').textContent = adData.offer.address;
      card.querySelector('.popup__text--price').textContent = adData.offer.price + ' ₽/ночь';
      card.querySelector('.popup__type').textContent = adData.type;
      card.querySelector('.popup__text--capacity').textContent = adData.offer.rooms + ' комнаты для ' + adData.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adData.offer.checkin + ', выезд до ' + adData.offer.checkout;
      card.querySelector('.popup__features').textContent = adData.features;
      card.querySelector('.popup__description').textContent = adData.offer.description;
      var adPhotos = card.querySelector('.popup__photos');
      var photo = adPhotos.querySelector('.popup__photo');
      adPhotos.removeChild(photo);
      adData.offer.photos.forEach(function (it) {
        var img = photo.cloneNode(true);
        img.src = it;
        adPhotos.appendChild(img);
      });
      card.querySelector('.popup__avatar').src = adData.author.avatar;
      map.insertBefore(card, filtersBlock);
      window.utils.closePopup();
    },
    closePopup: function () {
      var map = document.querySelector('.map');
      var adCard = map.querySelector('.map__card');
      var popupCloseButton = map.querySelector('.popup__close');
      popupCloseButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        map.removeChild(adCard);
      });
    }
  };
})();
