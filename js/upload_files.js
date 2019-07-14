'use strict';

(function () {
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarDropField = document.querySelector('.ad-form__field');
  var avatarFileList = avatarDropField.querySelector('.ad-form__field input[type="file"]');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoDropZone = document.querySelector('.ad-form__upload');
  var photoFileList = document.querySelector('.ad-form__upload input[type="file"]');
  var photoBlock = document.querySelector('.ad-form__photo');

  avatarFileList.addEventListener('change', function () {
    var file = avatarFileList.files[0];
    window.utils.onAvatarUpload(file, avatarPreview);
  });
  avatarDropField.addEventListener('dragenter', window.utils.preventDefaults);

  avatarDropField.addEventListener('dragover', window.utils.preventDefaults);

  avatarDropField.addEventListener('drop', function (evt) {
    window.utils.preventDefaults(evt);
    var dataTransfer = evt.dataTransfer;
    var file = dataTransfer.files[0];
    window.utils.onAvatarUpload(file, avatarPreview);
  });

  photoFileList.addEventListener('change', function () {
    var files = Array.from(photoFileList.files);
    window.utils.onAdPhotoUpload(files, photoContainer, photoBlock);
  });
  photoDropZone.addEventListener('dragenter', window.utils.preventDefaults);

  photoDropZone.addEventListener('dragover', window.utils.preventDefaults);

  photoDropZone.addEventListener('drop', function (evt) {
    window.utils.preventDefaults(evt);
    var dataTransfer = evt.dataTransfer;
    var files = Array.from(dataTransfer.files);
    window.utils.onAdPhotoUpload(files, photoContainer, photoBlock);
  });
})();
