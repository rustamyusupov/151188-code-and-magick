'use strict';

/**
 * конструктор DOM компоненты
 * @param {object} elem
 * @constructor
 */
var DOMComponent = function(elem) {
  this.element = elem;
};

/**
 * добавляет компоненту на страницу
 * @param {HTMLElement} parent
 */
DOMComponent.prototype.add = function(parent) {
  parent.appendChild(this.element);
};

/**
 * удаляет компоненту со страницы
 */
DOMComponent.prototype.remove = function() {
  this.element.parentNode.removeChild(this.element);
};

module.exports = DOMComponent;
