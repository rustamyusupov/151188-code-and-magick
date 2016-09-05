'use strict';

var utils = require('./utils');

var formContainer = document.querySelector('.overlay-container');
var formCloseButton = document.querySelector('.review-form-close');
var reviewForm = formContainer.querySelector('.review-form');
var reviewMarks = reviewForm.elements['review-mark'];
var reviewName = reviewForm.elements['review-name'];
var reviewText = reviewForm.elements['review-text'];
var btnReviewSubmit = reviewForm.querySelector('.review-submit');
var reviewFields = reviewForm.querySelector('.review-fields');
var reviewFieldsName = reviewForm.querySelector('.review-fields-name');
var reviewFieldsText = reviewForm.querySelector('.review-fields-text');
var browserCookies = require('browser-cookies');
var MARK = 'review-mark';
var NAME = 'review-name';
var reviewMarksArray = Array.prototype.slice.call(reviewMarks, 0);

var form = {
  onClose: null,

  /**
   * @param {Function} cb
   */
  open: function(cb) {
    formContainer.classList.remove('invisible');

    if (typeof cb === 'function') {
      cb();
    }

    loadData();

    validate();
  },

  close: function(evt) {
    evt.preventDefault();

    formContainer.classList.add('invisible');

    if (typeof form.onClose === 'function') {
      form.onClose();
    }

    saveData();
  }
};

/**
 * валидирует форму
 */
function validate() {
  // поле имя
  reviewName.required = true;
  var isNameValid = Boolean(reviewName.value);
  utils.toggle(reviewFieldsName, !isNameValid);

  // звезды и поле отзыв
  reviewText.required = reviewMarks.value < 3;
  var isTextValid = !reviewText.required || reviewText.value;
  utils.toggle(reviewFieldsText, !isTextValid);

  // кнопка добавить и ссылки
  var isFieldsValid = isNameValid && isTextValid;
  btnReviewSubmit.disabled = !isFieldsValid;
  utils.toggle(reviewFields, !isFieldsValid);
}

/**
 * загружает данные из кук
 */
function loadData() {
  reviewMarks.value = browserCookies.get(MARK) || reviewMarks.value;
  reviewName.value = browserCookies.get(NAME) || reviewName.value;
}

/**
 * сохраняет данные формы в куки
 */
function saveData() {
  var today = new Date();

  // день рождения Грейс Хоппер
  var birthdayGraceHopper = new Date(today.getFullYear(), 11, 9);
  var options = {
    expires: utils.getDaysFromDate(birthdayGraceHopper)
  };

  browserCookies.set(MARK, reviewMarks.value, options);
  browserCookies.set(NAME, reviewName.value, options);
}

reviewMarksArray.forEach(function(item) {
  item.addEventListener('change', validate);
});
reviewName.addEventListener('input', validate);
reviewText.addEventListener('input', validate);
formCloseButton.addEventListener('click', form.close);

module.exports = form;
