'use strict';

var form = require('./form');
var Game = require('./game');
var loadReviews = require('./reviews');

var game = new Game(document.querySelector('.demo'));
var formOpenButton = document.querySelector('.reviews-controls-new');

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
