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
 * конструктор объекта Review
 * @param {ReviewData} data
 * @constructor
 */
var Review = function(data) {
  this.data = data;

  this.getElements();

  this.setAnswerYes = this.setQuizAnswer.bind(this, true);
  this.setAnswerNo = this.setQuizAnswer.bind(this, false);

  this.description.textContent = this.data.description;
  this.setRating(this.data.rating);
  this.loadImage();

  this.quizAnswerYes.addEventListener('click', this.setAnswerYes);
  this.quizAnswerNo.addEventListener('click', this.setAnswerNo);
};

/**
 * константы
 */
Review.prototype.IMAGE_SIZE = '124px';
Review.prototype.LOAD_FAILURE = 'review-load-failure';
Review.prototype.ACTIVE_ANSWER = 'review-quiz-answer-active';

/**
 * получает элементы
 */
Review.prototype.getElements = function() {
  this.element = reviewClone.cloneNode(true);
  this.description = this.element.querySelector('.review-text');
  this.image = this.element.querySelector('.review-author');
  this.rating = this.element.querySelector('.review-rating');
  this.quizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');
  this.quizAnswerNo = this.element.querySelector('.review-quiz-answer-no');
};

/**
 * устанавливает рейтинг
 * @param {number} number
 */
Review.prototype.setRating = function(number) {
  var ratings = ['two', 'three', 'four', 'five'];

  // рейтинг один по умолчанию, поэтому отсчет с двух
  if (ratings[number - 2]) {
    this.rating.classList.add('review-rating-' + ratings[number - 2]);
  }
};

/**
 * загружает изображение
 */
Review.prototype.loadImage = function() {
  function isOk(isLoad) {
    if (isLoad) {
      this.image.src = this.data.author.picture;
      this.image.width = this.image.height = this.IMAGE_SIZE;
    } else {
      this.image.src = '';
      this.element.classList.add(this.LOAD_FAILURE);
    }
  }

  utils.loadImage(this.data.author.picture, isOk.bind(this));
};

/**
 * снимает обработчики
 */
Review.prototype.remove = function() {
  this.quizAnswerYes.removeEventListener('click', this.setAnswerYes);
  this.quizAnswerNo.removeEventListener('click', this.setAnswerNo);
};

/**
 * устанавливает ответ опроса
 * @param {boolean} isYes
 */
Review.prototype.setQuizAnswer = function(isYes) {
  this.quizAnswerYes.classList.toggle(this.ACTIVE_ANSWER, isYes);
  this.quizAnswerNo.classList.toggle(this.ACTIVE_ANSWER, !isYes);
};

module.exports = Review;