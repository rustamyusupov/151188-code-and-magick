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
  this.hideGallery = this.hide.bind(this);

  this.container = document.querySelector('.overlay-gallery');
  DOMComponent.call(this, this.container);

  this.preview = this.element.querySelector('.overlay-gallery-preview');
  this.close = this.element.querySelector('.overlay-gallery-close');
  this.controlLeft = this.element.querySelector('.overlay-gallery-control-left');
  this.controlRight = this.element.querySelector('.overlay-gallery-control-right');
  this.currentNumber = this.element.querySelector('.preview-number-current');
  this.totalNumber = this.element.querySelector('.preview-number-total');

  this.totalNumber.innerHTML = pictures.length;
};

utils.inherit(DOMComponent, Gallery);

/**
 * показывает галерею
 * @param {number} activePicture
 */
Gallery.prototype.show = function(activePicture) {
  this.close.addEventListener('click', this.hideGallery);
  this.controlLeft.addEventListener('click', this.setPrev);
  this.controlRight.addEventListener('click', this.setNext);

  this.element.classList.remove('invisible');

  this.setActivePicture(activePicture);
};

/**
 * скрывает галерею
 */
Gallery.prototype.hide = function() {
  this.element.classList.add('invisible');

  this.close.removeEventListener('click', this.hideGallery);
  this.controlLeft.removeEventListener('click', this.setPrev);
  this.controlRight.removeEventListener('click', this.setNext);
};

/**
 * показывает изображение
 * @param {number} activePicture
 */
Gallery.prototype.setActivePicture = function(activePicture) {
  var image = new Image();

  this.activePicture = activePicture;
  image.src = this.pictures[activePicture];

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
    this.setActivePicture(this.activePicture + 1);
  }
};

/**
 * устанавливает предыдущее изображение
 */
Gallery.prototype.setPrevPicture = function() {
  if (this.activePicture - 1 >= 0) {
    this.setActivePicture(this.activePicture - 1);
  }
};

module.exports = Gallery;
