const Game = require('./Game');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const Keyboarder = require('./Keyboarder');
const keyboarder = new Keyboarder();

document.addEventListener('keydown', keyboarder.keyDownHandler);
document.addEventListener('keyup', keyboarder.keyUpHandler);

function startGame(ctx) {
  const game = new Game(ctx, canvas, keyboarder);
  game.drawGame();
  game.gameLoop();
}

startGame(ctx);
