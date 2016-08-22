'use strict';

var utils = require('./utils');

var reviewTemplate = document.getElementById('review-template');
var reviewClone = (reviewTemplate.content || reviewTemplate).querySelector('.review');

/**
 * объект с параметрами автора
 * @typedef {object} Author
 * @property {string} name имя
 * @property {string} picture адрес изображения
 */

/**
 * объект с параметрами отзыва
 * @typedef {object} ReviewData
 * @property {Author} author автор
 * @property {string} decription описание
 * @property {number} rating оценка
 * @property {number} review_usefulness польза
 */

/**
 * добавляет отзыв
 * @param {ReviewData} data отзыв
 */
function addReview(data) {
  var review = reviewClone.cloneNode(true);
  var reviewImage = review.querySelector('.review-author');
  var reviewRating = review.querySelector('.review-rating');
  var reviewDescription = review.querySelector('.review-text');
  var ratings = {
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five'
  };

  if (ratings[data.rating]) {
    reviewRating.classList.add('review-rating-' + ratings[data.rating]);
  }
  reviewDescription.textContent = data.description;

  utils.loadImage(data.author.picture, function(isOk) {
    if (isOk) {
      reviewImage.src += data.author.picture;
      reviewImage.width = '124px';
      reviewImage.height = '124px';
    } else {
      reviewImage.src = '';
      review.classList.add('review-load-failure');
    }
  });

  return review;
}

module.exports = addReview;
