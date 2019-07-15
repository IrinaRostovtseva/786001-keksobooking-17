'use strict';

(function () {
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
  var avatarDropFieldElement = document.querySelector('.ad-form__field');
  var avatarFileListElement = avatarDropFieldElement.querySelector('.ad-form__field input[type="file"]');
  var photoContainerElement = document.querySelector('.ad-form__photo-container');
  var photoDropZoneElement = document.querySelector('.ad-form__upload');
  var photoFileListElement = document.querySelector('.ad-form__upload input[type="file"]');
  var photoBlockElement = document.querySelector('.ad-form__photo');

  avatarFileListElement.addEventListener('change', function () {
    var file = avatarFileListElement.files[0];
    window.utils.onAvatarUpload(file, avatarPreviewElement);
  });
  avatarDropFieldElement.addEventListener('dragenter', window.utils.preventDefaults);

  avatarDropFieldElement.addEventListener('dragover', window.utils.preventDefaults);

  avatarDropFieldElement.addEventListener('drop', function (evt) {
    window.utils.preventDefaults(evt);
    var dataTransfer = evt.dataTransfer;
    var file = dataTransfer.files[0];
    window.utils.onAvatarUpload(file, avatarPreviewElement);
  });

  photoFileListElement.addEventListener('change', function () {
    var files = Array.from(photoFileListElement.files);
    window.utils.onAdPhotoUpload(files, photoContainerElement, photoBlockElement);
  });
  photoDropZoneElement.addEventListener('dragenter', window.utils.preventDefaults);

  photoDropZoneElement.addEventListener('dragover', window.utils.preventDefaults);

  photoDropZoneElement.addEventListener('drop', function (evt) {
    window.utils.preventDefaults(evt);
    var dataTransfer = evt.dataTransfer;
    var files = Array.from(dataTransfer.files);
    window.utils.onAdPhotoUpload(files, photoContainerElement, photoBlockElement);
  });
})();
