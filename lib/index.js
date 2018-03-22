const Game = require('./Game');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const Keyboarder = require('./Keyboarder');
const keyboarder = new Keyboarder();
const game = new Game(ctx, canvas, keyboarder);
const instructions = document.getElementById('instructions');
const startButton = document.getElementById('start-game');

document.addEventListener('keydown', keyboarder.keyDownHandler);
document.addEventListener('keyup', keyboarder.keyUpHandler);
startButton.addEventListener('click', newGameParameters);

function startGame() {
  var savedCount = localStorage.getItem('gameNumber');
  if (savedCount > 1) {
    newGameParameters(savedCount);
  } 
  game.gameLoop();
}

function newGameParameters(savedCount) {
  if (savedCount > 1) {
    game.timer = 26;
  } else {
    game.timer = 31;
  }
  instructions.style.display = "none";
}

startGame();