'use strict';

window.CallbackRegistry = {};

window.reviews = (function() {
  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewTemplate = document.getElementById('review-template');

  var reviewClone = (reviewTemplate.content || reviewTemplate).querySelector('.review');

  var reviews = {
    /**
     * загружает список отзывов
     */
    load: function() {
      var URL = 'http://localhost:1506/api/reviews';

      // скрытие блока с фильтрами
      reviewsFilter.classList.add('invisible');

      // получение списка отзывов
      _jsonp(URL, _getReviews);
    }
  };

  /**
   * callback получает данные из jsonp запроса
   * @callback getData
   * @param {object} data набор данных
   */

  /**
   * выполняет jsonp запрос
   * @param {string} url адрес
   * @param {getData} callback данные из jsonp запроса
   */
  function _jsonp(url, cb) {
    var script = document.createElement('script');
    var callbackName = 'cb' + String(Math.floor(Math.random() * 999999));

    url = url + '?callback=CallbackRegistry.' + callbackName;

    window.CallbackRegistry[callbackName] = function(data) {
      cb(data);
    };

    script.onload = script.onerror = function() {
      delete window.CallbackRegistry[callbackName];
      document.body.removeChild(script);
    };

    script.src = url;
    document.body.appendChild(script);
  }

  /**
   * Объект с параметрами автора
   * @typedef {object} Author
   * @property {string} name имя
   * @property {string} picture адрес изображения
   */

  /**
   * Объект с параметрами отзыва
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
  function _getReviews(data) {
    var reviewsFragment = document.createDocumentFragment();
    var reviewsContainer = document.querySelector('.reviews-list');

    // добавление отзывов
    data.forEach(function(item) {
      reviewsFragment.appendChild(_addReview(item));
    });

    // вставка отзывов
    reviewsContainer.appendChild(reviewsFragment);

    // отображение блока с фильтрами
    reviewsFilter.classList.remove('invisible');
  }

  /**
   * добавляет отзыв
   * @param {ReviewData} data отзыв
   */
  var _addReview = function(data) {
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

    _loadImage(data.author.picture, function(isOk) {
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
  };

  /**
   * callback выполняет код в зависимости от условия
   * @callback execByCondition
   * @param {boolean} isOk условие выполнения
   */

  /**
   * загружает изображения
   * @param {string} url адрес изображения
   * @param {execByCondition} callback выполнение по условию
   */
  var _loadImage = function(url, cb) {
    var image = new Image();
    var imageTimeout = null;
    var IMAGE_LOAD_TIMEOUT = 10000;

    image.onload = function() {
      clearTimeout(imageTimeout);
      cb(true);
    };

    image.onerror = function() {
      clearTimeout(imageTimeout);
      cb(false);
    };

    image.src = url;

    imageTimeout = setTimeout(function() {
      cb(false);
    }, IMAGE_LOAD_TIMEOUT);
  };

  return reviews;
})();
