const Game = require('./Game');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const Keyboarder = require('./Keyboarder');
const keyboarder = new Keyboarder();
const game = new Game(ctx, canvas, keyboarder);

document.addEventListener('keydown', keyboarder.keyDownHandler);
document.addEventListener('keyup', keyboarder.keyUpHandler);

function startGame() {
  let savedCount = localStorage.getItem('gameNumber');
  if (savedCount > 1) {
    game.timer = 26;
  }
  game.gameLoop();
}

startGame();