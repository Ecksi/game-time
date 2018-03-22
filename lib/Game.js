const Hero = require('./Hero');
// const Enemy = require('./Enemy');
const Ladder = require('./Ladder');
const Platform = require('./Platform');
const Plates = require('./Plate');
const Text = require('./Text');
const BurgerLayer = require('./BurgerLayer');
const gameWin = new Audio('../resources/game_win.mp3');
const gameLose = new Audio('../resources/game_lose.mp3');

class Game {
  constructor(ctx, canvas, keyboarder) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.keyboarder = keyboarder;
    this.ladder = new Ladder();
    this.platform = new Platform();
    this.burgerLayers = new BurgerLayer();
    this.plates = new Plates();
    this.text = new Text();
    this.timer = 31;
    this.gameNumber = 1;
    this.hero = new Hero(
      this.keyboarder,
      this.ladder,
      this.platform, 
      this.burgerLayers, 
      this.plates
    );
  } 

  drawGame() {
    this.platform.draw(this.ctx);
    this.ladder.draw(this.ctx);
    this.burgerLayers.draw(this.ctx);
    this.plates.draw(this.ctx);
    this.text.draw(this.ctx, this.timer, this.hero.score)
    this.hero.draw(this.ctx);
  }

  gameLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGame();
    this.hero.onALadder();
    this.hero.onAPlatform();
    this.hero.onABurger();
    this.winGame();
    this.loseGame();
    this.gameTimer();
    this.hero.update();
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);
  }

  gameTimer() {
    this.timer -= 0.015;
  }

  loseGame() {
    if (this.timer < 0) {
      gameLose.play();
      alert("You lost!!! Better luck next time!")
      this.gameNumber = 0;
      localStorage.setItem('gameNumber', this.gameNumber);
      location.reload();
    }
  }

  winGame() {
    if (this.plates.plateCount === 16) {
      gameWin.play();
      alert("You made mad burgers yo! Decreasing the time!!! HURRY UP!!")
      this.plates.plateCount = 0;
      this.nextGame();
    }
  }

  nextGame() {
    this.gameNumber++;
    localStorage.setItem('gameNumber', this.gameNumber);
    location.reload();
  }
}

module.exports = Game;
