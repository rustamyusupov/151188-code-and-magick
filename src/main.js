'use strict';

var form = require('./form');
var Game = require('./game');
var loadReviews = require('./reviews');
var Gallery = require('./gallery');

var game = new Game(document.querySelector('.demo'));
var formOpenButton = document.querySelector('.reviews-controls-new');
var galleryLinks = document.querySelectorAll('.photogallery-image');
var galleryImages = document.querySelectorAll('.photogallery-image img');

formOpenButton.onclick = function(event) {
  event.preventDefault();

  form.open(function() {
    game.setGameStatus(Game.Verdict.PAUSE);
    game.setDeactivated(true);
  });
};

form.onClose = function() {
  game.setDeactivated(false);
};

game.initializeLevelAndStart();
game.setGameStatus(Game.Verdict.INTRO);

loadReviews();

var pictures = Array.prototype.map.call(galleryImages, function(item) {
  return item.src;
});

var gallery = new Gallery(pictures);

Array.prototype.forEach.call(galleryLinks, function(item, i) {
  item.addEventListener('click', gallery.show.bind(gallery, i));
});
