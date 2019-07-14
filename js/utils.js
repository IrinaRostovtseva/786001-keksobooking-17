'use strict';

window.utils = (function () {
  var KEY_CODE_ESC = 27;
  var Limit = {
    TOP: 130,
    BOTTOM: 630
  };

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
      arr.forEach(function (it) {
        var element = pin.cloneNode(true);
        element.style = 'left: ' + it.location.x + 'px; top: ' + window.utils.compareNumberWithLimits(it.location.y, Limit.TOP, Limit.BOTTOM) + 'px;';
        element.querySelector('img').src = it.author.avatar;
        element.querySelector('img').alt = it.offer.title;
        fragment.appendChild(element);
        element.addEventListener('click', function () {
          window.utils.onPinClick(it);
          element.classList.add('map__pin--active');
        });
        return fragment;
      });
    },
    removeAtributeFromElement: function (arr, atribut) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].removeAttribute('' + atribut);
      }
      return arr;
    },
    activateMap: function () {
      var map = document.querySelector('.map');
      var adForm = document.querySelector('.ad-form');
      var allInputsAndSelects = document.querySelectorAll('input, select');
      window.utils.removeAtributeFromElement(allInputsAndSelects, 'disabled');
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
    },
    deactivateMap: function () {
      var map = document.querySelector('.map');
      var adForm = document.querySelector('.ad-form');
      var allInputsAndSelects = document.querySelectorAll('input, select');
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var card = document.querySelector('.map__card');
      var avatarPreview = document.querySelector('.ad-form-header__preview img');
      var photoDivs = adForm.querySelectorAll('.ad-form__photo');

      var AVATAR_DEFAULT = 'img/muffin-grey.svg';

      if (card) {
        card.remove();
      }
      avatarPreview.src = AVATAR_DEFAULT;
      for (var i = 1; i < photoDivs.length; i++) {
        photoDivs[i].remove();
      }
      if (photoDivs[0].childNodes) {
        photoDivs[0].childNodes.forEach(function (it) {
          it.remove();
        });
      }
      map.classList.add('map--faded');
      adForm.reset();
      adForm.classList.add('ad-form--disabled');
      allInputsAndSelects.forEach(function (it) {
        it.setAttribute('disabled', 'disabled');
      });
      pins.forEach(function (it) {
        it.remove();
      });
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
    createErrorMessage: function (error) {
      var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
      var errorButton = errorMessage.querySelector('.error__button');
      var blockMain = document.querySelector('main');
      errorMessage.querySelector('.error__message').textContent = error;
      blockMain.appendChild(errorMessage);
      errorButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        errorMessage.remove();
      });
      window.utils.closeMessage(errorMessage);
    },
    createSuccessMessage: function () {
      var messageTemplate = document.querySelector('#success').content.querySelector('.success');
      var main = document.querySelector('main');
      var message = messageTemplate.cloneNode(true);
      main.appendChild(message);
      window.utils.closeMessage(message);
    },
    onError: function (error) {
      window.utils.createErrorMessage(error);
    },
    onFilterClick: function (data, max) {
      var PriceBreakPoint = {
        BOTTOM: 10000,
        TOP: 50000
      };
      var checkedType = document.querySelector('#housing-type option:checked');
      var checkedPrice = document.querySelector('#housing-price option:checked');
      var checkedRoom = document.querySelector('#housing-rooms option:checked');
      var checkedGuest = document.querySelector('#housing-guests option:checked');
      var checkedFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked'));
      var ads;
      var map = document.querySelector('.map');
      var adInfoCard = map.querySelector('.map__card');

      ads = data.filter(function (it) {
        if (checkedType.value !== 'any') {
          return checkedType.value === it.offer.type;
        }
        return it;
      })
      .filter(function (it) {
        if (checkedPrice.value === 'low') {
          return it.offer.price < PriceBreakPoint.BOTTOM;
        } else if (checkedPrice.value === 'middle') {
          return it.offer.price >= PriceBreakPoint.BOTTOM && it.offer.price <= PriceBreakPoint.TOP;
        } else if (checkedPrice.value === 'high') {
          return it.offer.price > PriceBreakPoint.TOP;
        }
        return it;
      })
      .filter(function (it) {
        if (checkedRoom.value !== 'any') {
          return +checkedRoom.value === it.offer.rooms;
        }
        return it;
      })
      .filter(function (it) {
        if (checkedGuest.value !== 'any') {
          return +checkedGuest.value === it.offer.guests;
        }
        return it;
      })
      .filter(function (it) {
        for (var i = 0; i < checkedFeatures.length; i++) {
          if (it.offer.features.includes(checkedFeatures[i].value)) {
            return it;
          }
        }
        if (checkedFeatures.length === 0) {
          return it;
        }
        return undefined;
      })
      .slice(0, max);
      window.utils.createPin(ads, window.fragment);
      if (adInfoCard) {
        map.removeChild(adInfoCard);
      }
      window.utils.createAdCard(ads[0]);
    },
    createAdCard: function (adData) {
      var ClassToAdFeature = {
        'popup__feature--wifi': 'wifi',
        'popup__feature--dishwasher': 'dishwasher',
        'popup__feature--parking': 'parking',
        'popup__feature--washer': 'washer',
        'popup__feature--elevator': 'elevator',
        'popup__feature--conditioner': 'conditioner'
      };
      var map = document.querySelector('.map');
      var filtersBlock = map.querySelector('.map__filters-container');
      var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
      if (adData === undefined) {
        return;
      }
      var card = cardTemplate.cloneNode(true);
      var popupCloseButton = card.querySelector('.popup__close');
      card.querySelector('.popup__title').textContent = adData.offer.title;
      card.querySelector('.popup__text--address').textContent = adData.offer.address;
      card.querySelector('.popup__text--price').textContent = adData.offer.price + ' ₽/ночь';
      card.querySelector('.popup__type').textContent = adData.offer.type;
      card.querySelector('.popup__text--capacity').textContent = adData.offer.rooms + ' комнаты для ' + adData.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adData.offer.checkin + ', выезд до ' + adData.offer.checkout;
      var featureList = card.querySelectorAll('.popup__feature');

      featureList.forEach(function (it) {
        var liClass = it.classList.item(1);
        var feature = ClassToAdFeature[liClass];
        if (!adData.offer.features.includes(feature)) {
          it.remove();
        }
      });
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
      window.utils.closePopup(card, popupCloseButton);
    },
    closePopup: function (popup, button) {
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        popup.remove();
      });
      window.addEventListener('keydown', function (evt) {
        window.utils.onEscPress(evt, popup);
      }, {once: true});
    },
    onPinClick: function (data) {
      var map = document.querySelector('.map');
      var adInfoCard = map.querySelector('.map__card');
      var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      if (adInfoCard) {
        map.removeChild(adInfoCard);
      }
      pins.forEach(function (it) {
        it.classList.remove('map__pin--active');
      });
      window.utils.createAdCard(data);
    },
    onEscPress: function (evt, elem) {
      evt.preventDefault();
      if (evt.keyCode === KEY_CODE_ESC) {
        elem.remove();
      }
    },
    closeMessage: function (elem) {
      window.addEventListener('keydown', function (evt) {
        window.utils.onEscPress(evt, elem);
      }, {once: true});
      window.addEventListener('click', function () {
        elem.remove();
      });
    },
    preventDefaults: function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    },
    onAvatarUpload: function (file, filePreview) {
      var fileType = file.type;

      if (fileType.startsWith('image')) {
        var fileReader = new FileReader();

        fileReader.addEventListener('load', function () {
          filePreview.src = fileReader.result;
        });

        fileReader.readAsDataURL(file);
      }
    },
    onAdPhotoUpload: function (files, container, block) {
      for (var i = 0; i < files.length; i++) {
        var item = files[i];
        var fileType = item.type;

        if (!fileType.startsWith('image')) {
          continue;
        }
        var img = document.createElement('img');
        img.width = '70';
        img.height = '70';
        img.file = item;
        var fileReader = new FileReader();

        fileReader.addEventListener('load', (function (aImg) {
          return function (loadEvt) {
            aImg.src = loadEvt.target.result;
          };
        })(img));

        fileReader.readAsDataURL(item);
        if (i >= 1) {
          var div = document.createElement('div');
          div.classList.add('ad-form__photo');
          div.appendChild(img);
          container.appendChild(div);
        } else {
          block.appendChild(img);
        }
      }
    }
  };
})();
