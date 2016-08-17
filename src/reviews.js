'use strict';

window.CallbackRegistry = {};

/**
 * выполнение jsonp запроса
 * @param {string} url адрес
 * @param {function} cb callback-функция
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

window.reviews = null;

function getReviews(data) {
  window.reviews = data;
}

jsonp('http://localhost:1506/api/reviews', getReviews);
