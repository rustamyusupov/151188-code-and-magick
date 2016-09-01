'use strict';

/**
 * объект с параметрами запроса
 * @typedef {object} Query
 * @property {string} from
 * @property {string} to
 * @property {string} filter
 */

 /**
  * callback получает данные из jsonp запроса
  * @callback getData
  * @param {object} data набор данных
  */

/**
 * выполняет XMLHttpRequest запрос
 * @param {string} url адрес
 * @param {Query} query параметры запроса
 * @param {getData} callback данные из запроса
 */
function httpRequest(url, query, cb) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    try {
      var loadedData = JSON.parse(evt.target.response);
      cb(loadedData);
    } catch (err) {
      console.log(err.message);
    }
  };

  var filter = Object.keys(query).map(function(key) {
    return key + '=' + query[key];
  });

  url += '?' + filter.join('&');

  xhr.open('GET', url);
  xhr.send();
}

module.exports = httpRequest;
