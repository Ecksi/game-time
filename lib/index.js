const Game = require('./Game');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const Keyboarder = require('./Keyboarder');
const keyboarder = new Keyboarder();
const game = new Game(ctx, canvas, keyboarder);
const instructions = document.getElementById('instructions');
const startButton = document.getElementById('start-game');
const gameStartSound = new Audio('../resources/gameStart.mp3');
const gameThemeSound = new Audio('../resources/game_theme.mp3');


document.addEventListener('keydown', keyboarder.keyDownHandler);
document.addEventListener('keyup', keyboarder.keyUpHandler);
startButton.addEventListener('click', newGameParameters);

function startGame() {
  let savedCount = localStorage.getItem('gameNumber');

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
  gameThemeSound.loop = true;
  gameThemeSound.play();
  instructions.style.display = "none";
}

gameStartSound.play();

startGame();