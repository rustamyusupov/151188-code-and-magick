'use strict';

var Form = require('./form');
var Game = require('./game');
var Reviews = require('./reviews');
var Gallery = require('./gallery');

var reviews = new Reviews();
var game = new Game(document.querySelector('.demo'));
var formOpenButton = document.querySelector('.reviews-controls-new');
var galleryLinks = document.querySelectorAll('.photogallery-image');
var galleryImages = document.querySelectorAll('.photogallery-image img');

function openForm(evt) {
  evt.preventDefault();

  form.open(function() {
    game.setGameStatus(Game.Verdict.PAUSE);
    game.setDeactivated(true);
  });
}

function onClose() {
  game.setDeactivated(false);
}

var form = new Form(onClose);

formOpenButton.addEventListener('click', openForm);

game.initializeLevelAndStart();
game.setGameStatus(Game.Verdict.INTRO);

reviews.load();

var pictures = Array.prototype.map.call(galleryImages, function(item) {
  return item.getAttribute('src');
});

var gallery = new Gallery(pictures);

Array.prototype.forEach.call(galleryLinks, function(item, i) {
  item.addEventListener('click', gallery.setLocation.bind(gallery, i));
});
