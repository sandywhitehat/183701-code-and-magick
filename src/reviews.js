'use strict';

var reviewsFilter = document.querySelector('.reviews-filter');
reviewsFilter.classList.add('invisible');

var filtersContainer = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var reviewBlock = document.querySelector('.reviews');
var elementToClone;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

/** @constant {string} */
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

/** @type {Array.<Object>} */
var reviews = [];

var Filter = {
  'ALL': 'reviews-all',
  'DATE': 'reviews-recent',
  'RATING_GOOD': 'reviews-good',
  'RATING_BAD': 'reviews-bad',
  'REVIEW_USEFULNESS': 'reviews-popular'
};

/** @constant {Filter} */
var DEFAULT_FILTER = Filter.ALL;


var setRating = function(number, container) {

  var markContainer = ['two', 'three', 'four', 'five'];
  // 2 соответствует элементу массива 0
  // 3 соотвествует элементу массива 1
  // 4 соотвествует элементу массива 2
  // 5 соотвествует элементу массива 3
  var reviewMark = markContainer[number - 2];

  container.classList.add('review-rating-' + reviewMark);

};

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  setRating(data.rating, element.querySelector('.review-rating'));
//   element.querySelector('.review-rating').classList.add('review-rating-')

  element.querySelector('.review-text').textContent = data.description;
  container.appendChild(element);

  var avatar = new Image(124, 124);
  avatar.onload = function(evt) {
    element.querySelector('.review-author');
    element.querySelector('.review-author').src = evt.target.src;
  };
  avatar.onerror = function() {
    element.classList.add('review-load-failure');
  };
  avatar.src = data.author.picture;
  return element;
};

/** @param {Array.<Object>} reviews */
var renderReviews = function(reviewers) {
  reviewsContainer.innerHTML = '';

  reviewers.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
};

/**
 * @param {Array.<Object>} reviews
 * @param {Filter} filter
 */
var getFilteredReviews = function(reviewers, filter) {
  var reviewsToFilter = reviewers.slice(0);

  switch (filter) {

    case Filter.DATE:

      reviewsToFilter = reviewsToFilter.filter(function(review) {

        var now = new Date();
        var fourDaysAgo = new Date();
        fourDaysAgo.setDate(now.getDate() - 4);
        var reviewDate = Date.parse(review.date);
        //console.log(reviewDate);
        return reviewDate > fourDaysAgo;
      }).sort(function(a, b) {
        return b.reviewDate - a.reviewDate;
      });
      break;

    case Filter.RATING_GOOD:
      reviewsToFilter = reviewsToFilter.filter(function(review) {
        return review.rating > 2;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;

    case Filter.RATING_BAD:
      reviewsToFilter = reviewsToFilter.filter(function(review) {
        return review.rating < 3;
      }).sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;

    case Filter.REVIEW_USEFULNESS:
      reviewsToFilter = reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }

  return reviewsToFilter;
};

/** @param {Filter} filter */
var setFilterEnabled = function(filter) {
  //console.log('приходящий фильтр ' + filter);
  var filteredReviews = getFilteredReviews(reviews, filter);
  renderReviews(filteredReviews);
};
  // пробегается по всем инпутам, находит выбранный и включает такой фильтр
var checkOnChecked = function() {
  var inputs = document.getElementsByName('reviews');
  for (var i = 0; i < inputs.length; i++) {
    var currentInput = inputs[i];
    //console.log(currentInput);
    if (currentInput.checked) {
      setFilterEnabled(currentInput.id);
    }
  }
};
// мы находим элемент с нужным id и выделяем его
var checkClickedInput = function(event) {
  //console.log('clicked');
  // присваиваем переменной того, по кому кликаем
  var lableClicked = event.target;
  var inputId = lableClicked.getAttribute('for');
  cleanCheckedChecks();
  document.getElementById(inputId).setAttribute('checked', '');
  checkOnChecked();

};
var cleanCheckedChecks = function() {
  //находим все инпуты с именем reviews
  var inputs = document.getElementsByName('reviews');
  // пробегаемся по всем инпутам
  for ( var i = 0; i < inputs.length; i++) {
    // на каждый инпут создаём переменную
    var currentInput = inputs[i];
    // каждому инпуту убираем атрибут checked
    currentInput.removeAttribute('checked', '');
  }
};
/** @param {boolean} enabled */
var setFiltersListeners = function() {
  var filters = filtersContainer.querySelectorAll('.reviews-filter-item');
  //console.log(filters);
  for (var i = 0; i < filters.length; i++) {
    var filter = filters[i];
    filter.onclick = checkClickedInput;


  }
};

/** @param {function(Array.<Object>)} callback */
var getReviews = function(callback) {
  var xhr = new XMLHttpRequest();
  xhr.onprogress = function() {
    reviewBlock.classList.add('reviews-list-loading');
  };
  // getReview -> onload - callback
  xhr.onload = function(evt) {
    reviewBlock.classList.remove('reviews-list-loading');
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };
  xhr.onerror = function() {
    reviewBlock.classList.remove('reviews-list-loading');
    reviewBlock.classList.add('reviews-load-failure');
  };

  xhr.open('GET', REVIEWS_LOAD_URL);
  xhr.send();
};
var getReviewsCallback = function(loadedData) {
  reviews = loadedData;
  setFiltersListeners(true);
  setFilterEnabled(DEFAULT_FILTER);
};
getReviews(getReviewsCallback);

reviewsFilter.classList.remove('invisible');
