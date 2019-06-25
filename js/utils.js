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
    createSameElement: function (arr, elemTemplate, fragment) {
      for (var i = 0; i < arr.length; i++) {
        var element = elemTemplate.cloneNode(true);
        element.style = 'left: ' + arr[i].location.x + 'px; top: ' + arr[i].location.y + 'px;';
        element.querySelector('img').src = arr[i].author.avatar;
        element.querySelector('img').alt = arr[i].offer.type;
        fragment.appendChild(element);
      }
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
    }
  };
})();
