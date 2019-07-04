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
      arr.forEach(function (it) {
        var element = pin.cloneNode(true);
        element.style = 'left: ' + it.location.x + 'px; top: ' + it.location.y + 'px;';
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
      if (checked.value !== 'any') {
        ads = data.filter(function (it) {
          return checked.value === it.offer.type;
        }).slice(0, max);
      } else {
        ads = data.slice(0, max);
      }
      window.utils.createPin(ads, window.fragment);
    }
  };
})();
