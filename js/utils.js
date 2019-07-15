'use strict';

window.utils = (function () {
  var KEY_CODE_ESC = 27;
  var Limit = {
    TOP: 130,
    BOTTOM: 630
  };

  return {
    compareNumberWithLimits: function (n, min, max) {
      if (n < min) {
        n = min;
      } else if (n > max) {
        n = max;
      }
      return n;
    },
    createPin: function (arr, fragment) {
      var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');
      arr.forEach(function (it) {
        var element = pinElement.cloneNode(true);
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
      var mapElement = document.querySelector('.map');
      var adFormElement = document.querySelector('.ad-form');
      var allInputsAndSelects = document.querySelectorAll('input, select');
      window.utils.removeAtributeFromElement(allInputsAndSelects, 'disabled');
      mapElement.classList.remove('map--faded');
      adFormElement.classList.remove('ad-form--disabled');
    },
    deactivateMap: function () {
      var mapElement = document.querySelector('.map');
      var adFormElement = document.querySelector('.ad-form');
      var allInputsAndSelects = document.querySelectorAll('input, select');
      var pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var cardElement = document.querySelector('.map__card');
      var avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
      var photoDivElements = adFormElement.querySelectorAll('.ad-form__photo');

      var AVATAR_DEFAULT = 'img/muffin-grey.svg';

      if (cardElement) {
        cardElement.remove();
      }
      avatarPreviewElement.src = AVATAR_DEFAULT;
      for (var i = 1; i < photoDivElements.length; i++) {
        photoDivElements[i].remove();
      }
      if (photoDivElements[0].childNodes) {
        photoDivElements[0].childNodes.forEach(function (it) {
          it.remove();
        });
      }
      mapElement.classList.add('map--faded');
      adFormElement.reset();
      adFormElement.classList.add('ad-form--disabled');
      allInputsAndSelects.forEach(function (it) {
        it.setAttribute('disabled', 'disabled');
      });
      pinElements.forEach(function (it) {
        it.remove();
      });
    },
    synchronizeTwoFields: function (field1, field2) {
      var field1CheckedElement = field1.querySelector('option:checked');
      var field2Elements = field2.querySelectorAll('option');
      for (var i = 0; i < field2Elements.length; i++) {
        field2Elements[i].removeAttribute('selected');
        if (field1CheckedElement.value === field2Elements[i].value) {
          field2Elements[i].selected = true;
        }
      }
    },
    createErrorMessage: function (error) {
      var errorMessageElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
      var errorButtonElement = errorMessageElement.querySelector('.error__button');
      var blockMainElement = document.querySelector('main');
      errorMessageElement.querySelector('.error__message').textContent = error;
      blockMainElement.appendChild(errorMessageElement);
      errorButtonElement.addEventListener('click', function (evt) {
        evt.preventDefault();
        errorMessageElement.remove();
      });
      window.utils.closeMessage(errorMessageElement);
    },
    createSuccessMessage: function () {
      var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
      var blockMainElement = document.querySelector('main');
      var messageElement = successMessageTemplate.cloneNode(true);
      blockMainElement.appendChild(messageElement);
      window.utils.closeMessage(messageElement);
    },
    onError: function (error) {
      window.utils.createErrorMessage(error);
    },
    onFilterClick: function (data, max) {
      var PriceBreakPoint = {
        BOTTOM: 10000,
        TOP: 50000
      };
      var checkedTypeElement = document.querySelector('#housing-type option:checked');
      var checkedPriceElement = document.querySelector('#housing-price option:checked');
      var checkedRoomElement = document.querySelector('#housing-rooms option:checked');
      var checkedGuestElement = document.querySelector('#housing-guests option:checked');
      var checkedFeatureElements = Array.from(document.querySelectorAll('.map__checkbox:checked'));
      var ads;
      var mapElement = document.querySelector('.map');
      var adCardElement = mapElement.querySelector('.map__card');

      ads = data.filter(function (it) {
        if (checkedTypeElement.value !== 'any') {
          return checkedTypeElement.value === it.offer.type;
        }
        return it;
      })
      .filter(function (it) {
        if (checkedPriceElement.value === 'low') {
          return it.offer.price < PriceBreakPoint.BOTTOM;
        } else if (checkedPriceElement.value === 'middle') {
          return it.offer.price >= PriceBreakPoint.BOTTOM && it.offer.price <= PriceBreakPoint.TOP;
        } else if (checkedPriceElement.value === 'high') {
          return it.offer.price > PriceBreakPoint.TOP;
        }
        return it;
      })
      .filter(function (it) {
        if (checkedRoomElement.value !== 'any') {
          return +checkedRoomElement.value === it.offer.rooms;
        }
        return it;
      })
      .filter(function (it) {
        if (checkedGuestElement.value !== 'any') {
          return +checkedGuestElement.value === it.offer.guests;
        }
        return it;
      })
      .filter(function (it) {
        for (var i = 0; i < checkedFeatureElements.length; i++) {
          if (it.offer.features.includes(checkedFeatureElements[i].value)) {
            return it;
          }
        }
        if (checkedFeatureElements.length === 0) {
          return it;
        }
        return undefined;
      })
      .slice(0, max);
      window.utils.createPin(ads, window.fragment);
      if (adCardElement) {
        mapElement.removeChild(adCardElement);
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
      var mapElement = document.querySelector('.map');
      var filtersBlockElement = mapElement.querySelector('.map__filters-container');
      var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
      if (adData === undefined) {
        return;
      }
      var cardElement = cardTemplate.cloneNode(true);
      var popupCloseButtonElement = cardElement.querySelector('.popup__close');
      cardElement.querySelector('.popup__title').textContent = adData.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = adData.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = adData.offer.price + ' ₽/ночь';
      cardElement.querySelector('.popup__type').textContent = adData.offer.type;
      cardElement.querySelector('.popup__text--capacity').textContent = adData.offer.rooms + ' комнаты для ' + adData.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adData.offer.checkin + ', выезд до ' + adData.offer.checkout;
      var featureList = cardElement.querySelectorAll('.popup__feature');

      featureList.forEach(function (it) {
        var liClass = it.classList.item(1);
        var feature = ClassToAdFeature[liClass];
        if (!adData.offer.features.includes(feature)) {
          it.remove();
        }
      });
      cardElement.querySelector('.popup__description').textContent = adData.offer.description;
      var adPhotoElements = cardElement.querySelector('.popup__photos');
      var photoElement = adPhotoElements.querySelector('.popup__photo');
      adPhotoElements.removeChild(photoElement);
      adData.offer.photos.forEach(function (it) {
        var imgElement = photoElement.cloneNode(true);
        imgElement.src = it;
        adPhotoElements.appendChild(imgElement);
      });
      cardElement.querySelector('.popup__avatar').src = adData.author.avatar;
      mapElement.insertBefore(cardElement, filtersBlockElement);
      window.utils.closePopup(cardElement, popupCloseButtonElement);
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
      var mapElement = document.querySelector('.map');
      var adCardElement = mapElement.querySelector('.map__card');
      var pinElements = mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      if (adCardElement) {
        mapElement.removeChild(adCardElement);
      }
      pinElements.forEach(function (it) {
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
        var imgElement = document.createElement('img');
        imgElement.width = '70';
        imgElement.height = '70';
        imgElement.file = item;
        var fileReader = new FileReader();

        fileReader.addEventListener('load', (function (aImg) {
          return function (loadEvt) {
            aImg.src = loadEvt.target.result;
          };
        })(imgElement));

        fileReader.readAsDataURL(item);
        if (i >= 1) {
          var divElement = document.createElement('div');
          divElement.classList.add('ad-form__photo');
          divElement.appendChild(imgElement);
          container.appendChild(divElement);
        } else {
          block.appendChild(imgElement);
        }
      }
    }
  };
})();
