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

      _validate();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
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

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
