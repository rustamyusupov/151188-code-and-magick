'use strict';

window.form = (function() {
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
  reviewMarksArray.forEach(function(item) {
    item.addEventListener('change', _validate);
  });

  reviewName.addEventListener('input', _validate);
  reviewText.addEventListener('input', _validate);

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();

      _loadData();

      _validate();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }

      _saveData();
    }
  };

  /**
   * валидация формы
   */
  function _validate() {
    // поле имя
    reviewName.required = true;
    var isNameValid = Boolean(reviewName.value);
    _toggle(reviewFieldsName, !isNameValid);

    // звезды и поле отзыв
    reviewText.required = reviewMarks.value < 3;
    var isTextValid = !reviewText.required || reviewText.value;
    _toggle(reviewFieldsText, !isTextValid);

    // кнопка добавить и ссылки
    var isFieldsValid = isNameValid && isTextValid;
    btnReviewSubmit.disabled = !isFieldsValid;
    _toggle(reviewFields, !isFieldsValid);
  }

  /**
   * показать/скрыть элемент
   * @param {object} elem элемент
   * @param {boolean} show флаг видимости
   */
  function _toggle(elem, show) {
    elem.classList.toggle('invisible', !show);
  }

  /**
   * загрузить данные из кук
   */
  function _loadData() {
    reviewMarks.value = browserCookies.get(MARK) || reviewMarks.value;
    reviewName.value = browserCookies.get(NAME) || reviewName.value;
  }

  /**
   * сохранить данные формы в куки
   */
  function _saveData() {
    var options = {
      expires: _getExpirationDate()
    };

    browserCookies.set(MARK, reviewMarks.value, options);
    browserCookies.set(NAME, reviewName.value, options);
  }

  /**
   * получить количество дней с последнего дня рождения Грейс Хоппер 9.12.1906
   */
  function _getExpirationDate() {
    var currentDate = new Date();
    var birthdayGraceHopper = new Date(currentDate.getFullYear(), 11, 9);
    var MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

    if (currentDate < birthdayGraceHopper) {
      birthdayGraceHopper.setFullYear(currentDate.getFullYear() - 1);
    }

    return Math.floor((currentDate - birthdayGraceHopper) / MILLISECONDS_IN_DAY);
  }

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
