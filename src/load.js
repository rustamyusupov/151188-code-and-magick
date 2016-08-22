'use strict';

window.CallbackRegistry = {};

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
function jsonp(url, cb) {
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

module.exports = jsonp;
