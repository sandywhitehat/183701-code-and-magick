'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();

var reviewNameField = document.getElementById('review-name');
reviewNameField.oninput = function() {
  if (reviewNameField.value == '') {
    alert('Введите имя, пожалуйста!');
    return false;
  }
}

var reviewTextField = document.getElementById('review-text');
var reviewMarkField = document.getElementsByName('review-mark');
reviewTextField.oninput = function() {
  if (reviewMarkField.value = 1, 2) {
    if (reviewTextField.value == '') {
    alert('Попрошу объясниться, товарищ!');
    return false;
  };
  return false;
};
};
