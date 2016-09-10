'use strict';

var DOMComponent = require('./dom-component');
var utils = require('./utils');

/**
 * конструктор объекта Gallery
 * @param {string[]} pictures
 * @constructor
 */
var Gallery = function(pictures) {
  this.pictures = pictures;
  this.activePicture = 0;
  this.currentPicture = null;
  this.setPrev = this.setPrevPicture.bind(this);
  this.setNext = this.setNextPicture.bind(this);
  this.setLocation = this.setLocation.bind(this);

  this.container = document.querySelector('.overlay-gallery');
  DOMComponent.call(this, this.container);

  this.preview = this.element.querySelector('.overlay-gallery-preview');
  this.close = this.element.querySelector('.overlay-gallery-close');
  this.controlLeft = this.element.querySelector('.overlay-gallery-control-left');
  this.controlRight = this.element.querySelector('.overlay-gallery-control-right');
  this.currentNumber = this.element.querySelector('.preview-number-current');
  this.totalNumber = this.element.querySelector('.preview-number-total');

  this.totalNumber.innerHTML = pictures.length;

  window.addEventListener('hashchange', this.change.bind(this));

  this.change();
};

utils.inherit(DOMComponent, Gallery);

/**
 * показывает галерею
 */
Gallery.prototype.show = function(hash) {
  this.close.addEventListener('click', this.setLocation);
  this.controlLeft.addEventListener('click', this.setPrev);
  this.controlRight.addEventListener('click', this.setNext);

  this.element.classList.remove('invisible');

  this.setActivePicture(hash);
};

/**
 * скрывает галерею
 */
Gallery.prototype.hide = function() {
  this.element.classList.add('invisible');

  this.close.removeEventListener('click', this.setLocation);
  this.controlLeft.removeEventListener('click', this.setPrev);
  this.controlRight.removeEventListener('click', this.setNext);
};

/**
 * показывает изображение
 * @param {number} activePicture
 */
Gallery.prototype.setActivePicture = function(activePicture) {
  var image = new Image();

  if (typeof activePicture === 'string') {
    activePicture = this.pictures.indexOf(activePicture);
  }

  if (activePicture !== -1) {
    this.activePicture = activePicture;
  } else {
    return;
  }

  image.src = this.pictures[this.activePicture];

  if (this.currentPicture) {
    this.preview.replaceChild(image, this.currentPicture);
  } else {
    this.preview.appendChild(image);
  }

  this.currentNumber.innerHTML = this.activePicture + 1;
  this.currentPicture = image;
};

/**
 * устанавливает следующее изображение
 */
Gallery.prototype.setNextPicture = function() {
  if (this.activePicture + 1 < this.pictures.length) {
    this.setLocation(this.activePicture + 1);
  }
};

/**
 * устанавливает предыдущее изображение
 */
Gallery.prototype.setPrevPicture = function() {
  if (this.activePicture - 1 >= 0) {
    this.setLocation(this.activePicture - 1);
  }
};

/**
 * меняет состояние галереи
 */
Gallery.prototype.change = function() {
  var hash = this.getLocation();

  if (hash) {
    this.show(hash);
  } else {
    this.hide();
  }
};

/**
 * получает изображение из локейшена
 * @returns {string}
 */
Gallery.prototype.getLocation = function() {
  var url = location.hash.match(/#photo\/(\S+)/);

  if (url) {
    return url[1];
  }

  return null;
};

/**
 * устанавливает изображение в локейшен
 * @param {string} activePicture
 */
Gallery.prototype.setLocation = function(activePicture) {
  var url = '';

  if (activePicture >= 0) {
    url = 'photo/' + this.pictures[activePicture];
  }

  location.hash = url;
};

module.exports = Gallery;
