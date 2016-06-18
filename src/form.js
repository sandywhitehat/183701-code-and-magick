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
var reviewTextField = document.getElementById('review-text');
var rate = document.getElementsByName('review-mark');

var lable1 = document.getElementsByClassName('review-fields');
var link1 = document.getElementsByClassName('review-fields-name');
var link2 = document.getElementsByClassName('review-fields-text');
var submit = document.getElementsByClassName('review-submit');
submit[0].setAttribute('disabled', '');
function checkValidity() {
  submit[0].removeAttribute('disabled', '');
}
reviewNameField.oninput = function() {

  if (reviewNameField.value === '') {
    reviewNameField.setAttribute('required', '');
    link1[0].classList.remove('invisible');
    lable1[0].classList.remove('invisible');
    return false;
  } else if (!(reviewNameField.value === '') && !(reviewTextField.value === '')) {
    checkValidity();
    lable1[0].classList.add('invisible');
    return true;
  } else if ((rate[2].checked || rate[3].checked || rate[4].checked) && !(reviewNameField.value === '')) {
    checkValidity();
    reviewTextField.removeAttribute('required', '');
    link2[0].classList.remove('invisible');
    lable1[0].classList.remove('invisible');
    return true;
  } else {
    link1[0].classList.add('invisible');
    return true;
  }
};

reviewTextField.oninput = function() {
  if ((rate[1].checked || rate[0].checked) && reviewTextField.value === '') {
    reviewTextField.setAttribute('required', '');
    link2[0].classList.remove('invisible');
    lable1[0].classList.remove('invisible');
    return false;
  } else if (!(reviewNameField.value === '') && !(reviewTextField.value === '')) {
    checkValidity();
    lable1[0].classList.add('invisible');
    return true;
  } else if ((rate[2].checked || rate[3].checked || rate[4].checked) && (reviewTextField.value === '')) {
    link2[0].classList.add('invisible');
  } else {
    link2[0].classList.add('invisible');
    return true;
  }
  return true;
};

submit.onclick = function(event) {
  event.preventDefault();
  if (reviewNameField.value === '') {
    console.log('Введите имя, пожалуйста.');
    return false;
  }
  return true;
};
