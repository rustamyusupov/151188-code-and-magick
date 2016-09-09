'use strict';

var load = require('./load');
var Review = require('./review');

/**
 * @type {array}
 */
var arrReviews = [];

var Reviews = function() {
  this.reviewsFilter = document.querySelector('.reviews-filter');
  this.reviewsMore = document.querySelector('.reviews-controls-more');

  this.dataIsLoading = false;
  this.queryFilter = null;
  this.pageNumber = 0;

  this.filter = this.filter.bind(this);
  this.next = this.next.bind(this);

  this.reviewsFilter.addEventListener('change', this.filter, true);
  this.reviewsMore.addEventListener('click', this.next);
};

/**
 * @const
 * @type {string}
 */
Reviews.prototype.URL = '/api/reviews';

/**
 * @const
 * @type {number}
 */
Reviews.prototype.PAGE_SIZE = 3;

/**
 * загружает список отзывов
 */
Reviews.prototype.load = function() {
  // скрытие блока с фильтрами
  this.reviewsFilter.classList.add('invisible');

  // установка фильтра
  var filter = document.querySelector('#' + this.loadFilter());
  filter.checked = true;

  // получение списка отзывов
  this.queryFilter = document.querySelector('input[name="reviews"]:checked').value;

  this.pageNumber = 0;
  this.next();
};

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
 * callback-функция получает отзывы из запроса
 * @param {ReviewData[]} data отзывы
 */
Reviews.prototype.render = function(data) {
  var reviewsFragment = document.createDocumentFragment();
  var reviewsContainer = document.querySelector('.reviews-list');

  // добавление отзывов
  data.forEach(function(item) {
    var review = new Review(item);

    review.add(reviewsFragment);

    arrReviews.push(review);
  });

  // вставка отзывов
  reviewsContainer.appendChild(reviewsFragment);

  // отображение блока с фильтрами
  this.reviewsFilter.classList.remove('invisible');

  // отображение кнопки Еще отзывы
  var isLoaded = Boolean(data.length);
  this.reviewsMore.classList.toggle('invisible', !isLoaded);

  this.pageNumber++;
  this.dataIsLoading = false;
};

/**
 * загружает следующую страницу отзывов
 */
Reviews.prototype.next = function() {
  var query = {
    from: this.pageNumber * this.PAGE_SIZE,
    to: this.PAGE_SIZE * (this.pageNumber + 1),
    filter: this.queryFilter
  };

  if (!this.dataIsLoading) {
    load(this.URL, query, this.render.bind(this));

    this.dataIsLoading = true;
  }
};

/**
 * отфильтровывает отзывы
 */
Reviews.prototype.filter = function(evt) {
  evt.preventDefault();

  this.queryFilter = evt.target.value;

  arrReviews.forEach(function(item) {
    item.remove();
  });

  arrReviews = [];

  this.pageNumber = 0;
  this.next();

  this.saveFilter(this.queryFilter);
};

/**
 * сохраняет фильтр
 * @param {string} filter
 */
Reviews.prototype.saveFilter = function(filter) {
  localStorage.setItem('filter', filter);
};

/**
 * сохраняет фильтр
 * @param {string} filter
 * @returns {string}
 */
Reviews.prototype.loadFilter = function() {
  return localStorage.getItem('filter');
};

module.exports = Reviews;
