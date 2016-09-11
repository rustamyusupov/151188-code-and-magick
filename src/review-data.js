'use strict';

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
 * @property {string} description описание
 * @property {number} rating оценка
 * @property {number} review_usefulness польза
 */

/**
 * конструктор объекта ReviewData
 * @param {ReviewData} data
 * @constructor
 */
var ReviewData = function(data) {
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      this[key] = data[key];
    }
  }
};

/**
 * получает имя автора
 * @returns {string}
 */
ReviewData.prototype.getAuthorName = function() {
  return this.author.name;
};

/**
 * получает изображение автора
 * @returns {string}
 */
ReviewData.prototype.getAuthorPicture = function() {
  return this.author.picture;
};

/**
 * получает описание
 * @returns {string}
 */
ReviewData.prototype.getDescription = function() {
  return this.description;
};

/**
 * получает рейтинг
 * @returns {number}
 */
ReviewData.prototype.getRating = function() {
  return this.rating;
};

/**
 * получает полезность
 * @returns {number}
 */
ReviewData.prototype.getUsefulness = function() {
  return this.review_usefulness;
};

/**
 * устанавливает имя автора
 * @param {string} name
 */
ReviewData.prototype.setAuthorName = function(name) {
  this.author.name = name;
};

/**
 * устанавливает изображение автора
 * @param {string} picture
 */
ReviewData.prototype.setAuthorPicture = function(picture) {
  this.author.picture = picture;
};

/**
 * устанавливает описание
 * @param {string} description
 */
ReviewData.prototype.setDescription = function(description) {
  this.description = description;
};

/**
 * устанавливает рейтинг
 * @param {number} rating
 */
ReviewData.prototype.setRating = function(rating) {
  this.rating = rating;
};

/**
 * устанавливает полезность
 * @param {boolean} isUp
 */
ReviewData.prototype.setUsefulness = function(isUp) {
  if (isUp) {
    this.review_usefulness++;
  } else {
    this.review_usefulness--;
  }

  var usefulnessEvent = new CustomEvent('changeUsefulness', {
    bubbles: true,
    detail: {
      usefulness: isUp,
      element: this
    }
  });

  document.dispatchEvent(usefulnessEvent);
};

module.exports = ReviewData;
