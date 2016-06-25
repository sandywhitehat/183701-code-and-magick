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

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-rating').textContent = data.rating;
  element.querySelector('.review-text').textContent = data.description;
  container.appendChild(element);

  var avatar = new Image();
  avatar.onload = function() {
    element.querySelector('img').insertAdjacentHTML('beforeend', '<img src="data.author.picture" width="124" height="124">');
  };
  avatar.onerror = function() {
    element.classList.add('review-load-failure');
  };
  return element;
};
window.reviews.forEach(function(reviewer) {
  getReviewElement(reviewer, reviewsContainer);
});
reviewsFilter.classList.remove('invisible');
