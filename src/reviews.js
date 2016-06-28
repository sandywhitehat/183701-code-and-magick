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
window.reviews.forEach(function(reviewer) {
  getReviewElement(reviewer, reviewsContainer);
});
reviewsFilter.classList.remove('invisible');
