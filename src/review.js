'use strict';

var DOMComponent = require('./dom-component');
var ReviewData = require('./review-data');
var utils = require('./utils');

var reviewTemplate = document.getElementById('review-template');
var reviewClone = (reviewTemplate.content || reviewTemplate).querySelector('.review');

/**
 * конструктор объекта Review
 * @param {ReviewData} data
 * @constructor
 */
var Review = function(data) {
  this.data = new ReviewData(data);

  DOMComponent.call(this, this.getElements());

  this.setAnswerYes = this.setQuizAnswer.bind(this, true);
  this.setAnswerNo = this.setQuizAnswer.bind(this, false);
  this.setActiveAnswer = this.setActiveAnswer.bind(this);

  this.description.textContent = this.data.getDescription();
  this.setRating(this.data.getRating());
  this.loadImage();

  this.quizAnswerYes.addEventListener('click', this.setAnswerYes);
  this.quizAnswerNo.addEventListener('click', this.setAnswerNo);

  document.addEventListener('changeUsefulness', this.setActiveAnswer);
};

utils.inherit(DOMComponent, Review);

/**
 * @const
 * @type {string}
 */
Review.prototype.IMAGE_SIZE = '124px';

/**
 * @const
 * @type {string}
 */
Review.prototype.LOAD_FAILURE = 'review-load-failure';

/**
 * @const
 * @type {string}
 */
Review.prototype.ACTIVE_ANSWER = 'review-quiz-answer-active';

/**
 * получает элементы
 * @returns {HTMLElement}
 */
Review.prototype.getElements = function() {
  this.element = reviewClone.cloneNode(true);
  this.description = this.element.querySelector('.review-text');
  this.image = this.element.querySelector('.review-author');
  this.rating = this.element.querySelector('.review-rating');
  this.quizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');
  this.quizAnswerNo = this.element.querySelector('.review-quiz-answer-no');

  return this.element;
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
      this.image.src = this.data.getAuthorPicture();
      this.image.width = this.image.height = this.IMAGE_SIZE;
    } else {
      this.image.src = '';
      this.element.classList.add(this.LOAD_FAILURE);
    }
  }

  utils.loadImage(this.data.getAuthorPicture(), isOk.bind(this));
};

/**
 * снимает обработчики
 */
Review.prototype.remove = function() {
  this.quizAnswerYes.removeEventListener('click', this.setAnswerYes);
  this.quizAnswerNo.removeEventListener('click', this.setAnswerNo);

  DOMComponent.prototype.remove.call(this);
};

/**
 * устанавливает ответ опроса в объекте
 * @param {boolean} isYes
 */
Review.prototype.setQuizAnswer = function(isYes) {
  this.data.setUsefulness(isYes);
};

/**
 * устанавливает ответ опроса у элемента
 * @param {object} evt
 */
Review.prototype.setActiveAnswer = function(evt) {
  if (this.data !== evt.detail.element) {
    return;
  }

  this.quizAnswerYes.classList.toggle(this.ACTIVE_ANSWER, evt.detail.usefulness);
  this.quizAnswerNo.classList.toggle(this.ACTIVE_ANSWER, !evt.detail.usefulness);
};

module.exports = Review;
