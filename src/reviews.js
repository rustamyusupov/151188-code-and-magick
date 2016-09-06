'use strict';

var load = require('./load');
var Review = require('./review');

var URL = '/api/reviews';
var PAGE_SIZE = 3;

var dataIsLoading = false;
var queryFilter = null;
var pageNumber = 0;

var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsMore = document.querySelector('.reviews-controls-more');

/**
 * загружает список отзывов
 */
function loadReviews() {
  // скрытие блока с фильтрами
  reviewsFilter.classList.add('invisible');

  // установка фильтра
  var filter = document.querySelector('#' + loadFilter());

  if (filter) {
    filter.checked = true;
  }

  // получение списка отзывов
  queryFilter = document.querySelector('input[name="reviews"]:checked').value;

  pageNumber = 0;
  getNextReviews();
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
 * callback-функция получает отзывы из запроса
 * @param {ReviewData[]} data отзывы
 */
function renderReviews(data) {
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

  // отображение кнопки Еще отзывы
  var isLoaded = Boolean(data.length);
  reviewsMore.classList.toggle('invisible', !isLoaded);

  pageNumber++;
  dataIsLoading = false;
}

/**
 * загружает следующую страницу отзывов
 */
function getNextReviews() {
  var query = {
    from: pageNumber * PAGE_SIZE,
    to: pageNumber * PAGE_SIZE + PAGE_SIZE,
    filter: queryFilter
  };

  if (!dataIsLoading) {
    load(URL, query, renderReviews);

    dataIsLoading = true;
  }
}

/**
 * отфильтровывает отзывы
 */
function filterReviews(evt) {
  evt.preventDefault();

  var reviewsContainer = document.querySelector('.reviews-list');
  queryFilter = evt.target.value;

  reviewsContainer.innerHTML = '';

  pageNumber = 0;
  getNextReviews();

  saveFilter(queryFilter);
}

/**
 * сохраняет фильтр
 * @param {string} filter
 */
function saveFilter(filter) {
  localStorage.setItem('filter', filter);
}

/**
 * загружает фильтр
 * @param {string} filter
 * @returns {string}
 */
function loadFilter() {
  return localStorage.getItem('filter');
}

reviewsFilter.addEventListener('change', filterReviews, true);
reviewsMore.addEventListener('click', getNextReviews);

module.exports = loadReviews;
