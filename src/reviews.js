'use strict';

var reviewsFilter = document.querySelector('.reviews-filter');
reviewsFilter.classList.add('invisible');

var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}


var getReviewElement = function(date, container) {
  var element = elementToClone.cloneNode(true);

  element.querySelector('.review-quiz').textContent = window.data.review_usefulness;
  element.querySelector('.review-rating').textContent = window.data.rating;
  element.querySelector('.review-text').textContent = window.data.description;
  container.appendChild(element);

  var avatar = new Image();


  avatar.onload = function(evt) {
    evt.preventDefault();
    avatar.src = date.picture;
  };
  avatar.onerror = function() {
    element.querySelector('.review').classList.add('review-load-failure');
  };

  return element;
};
window.reviews.forEach(function(review) {
  getReviewElement(review, reviewsContainer);
});
