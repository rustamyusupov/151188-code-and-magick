'use strict';

var utils = require('./utils');
var browserCookies = require('browser-cookies');

/**
 * конструктор объекта Form
 * @param {function} onClose
 * @constructor
 */
var Form = function(onClose) {
  this.container = document.querySelector('.overlay-container');
  this.closeButton = document.querySelector('.review-form-close');
  this.reviewForm = this.container.querySelector('.review-form');
  this.reviewMarks = this.reviewForm.elements['review-mark'];
  this.reviewName = this.reviewForm.elements['review-name'];
  this.reviewText = this.reviewForm.elements['review-text'];
  this.reviewSubmit = this.reviewForm.querySelector('.review-submit');
  this.reviewFields = this.reviewForm.querySelector('.review-fields');
  this.reviewFieldsName = this.reviewForm.querySelector('.review-fields-name');
  this.reviewFieldsText = this.reviewForm.querySelector('.review-fields-text');
  this.reviewMarksArray = Array.prototype.slice.call(this.reviewMarks, 0);

  this.onClose = onClose;

  this.validate = this.validate.bind(this);
  this.close = this.close.bind(this);

  this.reviewMarksArray.forEach(function(item) {
    item.addEventListener('change', this.validate);
  }, this);
  this.reviewName.addEventListener('input', this.validate);
  this.reviewText.addEventListener('input', this.validate);
  this.closeButton.addEventListener('click', this.close);
};

/**
 * @const
 * @type {string}
 */
Form.prototype.MARK = 'review-mark';

/**
 * @const
 * @type {string}
 */
Form.prototype.NAME = 'review-name';

/**
 * открывает форму
 * @param {function} cb
 */
Form.prototype.open = function(cb) {
  this.container.classList.remove('invisible');

  if (typeof cb === 'function') {
    cb();
  }

  this.loadData();

  this.validate();
};

/**
 * закрывает форму
 * @param {object} evt
 */
Form.prototype.close = function(evt) {
  evt.preventDefault();

  this.container.classList.add('invisible');

  if (typeof this.onClose === 'function') {
    this.onClose();
  }

  this.saveData();
};

/**
 * валидирует форму
 */
Form.prototype.validate = function() {
  // поле имя
  this.reviewName.required = true;
  var isNameValid = Boolean(this.reviewName.value);
  utils.toggle(this.reviewFieldsName, !isNameValid);

  // звезды и поле отзыв
  this.reviewText.required = this.reviewMarks.value < 3;
  var isTextValid = !this.reviewText.required || this.reviewText.value;
  utils.toggle(this.reviewFieldsText, !isTextValid);

  // кнопка добавить и ссылки
  var isFieldsValid = isNameValid && isTextValid;
  this.reviewSubmit.disabled = !isFieldsValid;
  utils.toggle(this.reviewFields, !isFieldsValid);
};

/**
 * загружает данные из кук
 */
Form.prototype.loadData = function() {
  this.reviewMarks.value = browserCookies.get(this.MARK) || this.reviewMarks.value;
  this.reviewName.value = browserCookies.get(this.NAME) || this.reviewName.value;
};

/**
 * сохраняет данные формы в куки
 */
Form.prototype.saveData = function() {
  var today = new Date();

  // день рождения Грейс Хоппер
  var birthdayGraceHopper = new Date(today.getFullYear(), 11, 9);
  var options = {
    expires: utils.getDaysFromDate(birthdayGraceHopper)
  };

  browserCookies.set(this.MARK, this.reviewMarks.value, options);
  browserCookies.set(this.NAME, this.reviewName.value, options);
};

module.exports = Form;
