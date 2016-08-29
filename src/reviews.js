'use strict';

var load = require('./load');
var Review = require('./review');

var reviewsFilter = document.querySelector('.reviews-filter');

/**
 * загружает список отзывов
 */
function loadReviews() {
  var URL = 'http://localhost:1506/api/reviews';

  // скрытие блока с фильтрами
  reviewsFilter.classList.add('invisible');

  // получение списка отзывов
  load(URL, getReviews);
}

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
 * callback-функция получает отзывы из jsonp запроса
 * @param {ReviewData[]} data отзывы
 */
function getReviews(data) {
  var reviewsFragment = document.createDocumentFragment();
  var reviewsContainer = document.querySelector('.reviews-list');

  // добавление отзывов
  data.forEach(function(item) {
    var review = new Review(item);
    reviewsFragment.appendChild(review.element);
  });

  // вставка отзывов
  reviewsContainer.appendChild(reviewsFragment);

  // отображение блока с фильтрами
  reviewsFilter.classList.remove('invisible');
}

module.exports = loadReviews;
