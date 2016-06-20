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
  if ((reviewNameField.value !== '' && (rate[2].checked || rate[3].checked || rate[4].checked)) || ((rate[1].checked || rate[0].checked) && reviewTextField.value !== '')) {
    submit[0].removeAttribute('disabled', '');
  }
}
reviewNameField.oninput = function() {
  checkValidity();
  if (reviewNameField.value === '') {
    reviewNameField.setAttribute('required', '');
    link1[0].classList.remove('invisible');
    lable1[0].classList.remove('invisible');
    return false;
  } else if (reviewNameField.value !== '' && reviewTextField.value !== '') {
    lable1[0].classList.add('invisible');
    return true;
  } else {
    link1[0].classList.add('invisible');
    return true;
  }
};

reviewTextField.oninput = function() {
  checkValidity();
  if ((rate[1].checked || rate[0].checked) && reviewTextField.value === '') {
    reviewTextField.setAttribute('required', '');
    link2[0].classList.remove('invisible');
    lable1[0].classList.remove('invisible');
    return false;
  } else if (reviewNameField.value !== '' && reviewTextField.value !== '') {
    lable1[0].classList.add('invisible');
    return true;
  } else if ((rate[2].checked || rate[3].checked || rate[4].checked)) {
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

var browserCookies = require('browser-cookies');
var reviewForm = document.querySelector('.review-form');
// блок для вычисления количества дней от прошедшего дня рождения
var now = new Date();
var birthday = new Date();
birthday.setFullYear(now.getFullYear() - 1);
birthday.setMonth(7);
birthday.setDate(23);
function getExpireMs() {
  return (now - birthday);
}
// функция для нахождения выбранной оценки (возращает строку checked.инпута, у которой можно вычислить её value)
function findRate() {
  for ( var i = 0; i < 5; i++ ) {
    if (rate[i].checked === true) {
      var mark = rate[i];
    }
  }
  return mark;
}



reviewNameField.value = browserCookies.get('username') || '';

reviewForm.onsubmit = function(evt) {
  evt.preventDefault();
  var dateToExpire = +Date.now() + getExpireMs();
  var formattedDateToExpire = new Date(dateToExpire).toUTCString();
  document.cookie = 'username=' + reviewNameField.value + ';expires=' + formattedDateToExpire;
  document.cookie = 'mark=' + findRate().value + ';expires=' + formattedDateToExpire;
  this.submit();
};
