'use strict';

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
  this.preview = this.container.querySelector('.overlay-gallery-preview');
  this.close = this.container.querySelector('.overlay-gallery-close');
  this.controlLeft = this.container.querySelector('.overlay-gallery-control-left');
  this.controlRight = this.container.querySelector('.overlay-gallery-control-right');
  this.currentNumber = this.container.querySelector('.preview-number-current');
  this.totalNumber = this.container.querySelector('.preview-number-total');

  this.totalNumber.innerHTML = pictures.length;
};

/**
 * показывает галерею
 * @param {number} activePicture
 */
Gallery.prototype.show = function(activePicture) {
  this.close.addEventListener('click', this.hideGallery);
  this.controlLeft.addEventListener('click', this.setPrev);
  this.controlRight.addEventListener('click', this.setNext);

  this.container.classList.remove('invisible');

  this.setActivePicture(activePicture);
};

/**
 * скрывает галерею
 */
Gallery.prototype.hide = function() {
  this.container.classList.add('invisible');

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
