const Hero = require('./Hero');
// const Enemy = require('./Enemy');
const Ladder = require('./Ladder');
const Platform = require('./Platform');
const Plates = require('./Plate');
const BurgerLayer = require('./BurgerLayer');
const gameStartSound = new Audio('../resources/gameStart.mp3');
const gameThemeSound = new Audio('../resources/game_theme.mp3');
const gameWin = new Audio('../resources/game_win.mp3');
const gameLose = new Audio('../resources/game_lose.mp3');

gameStartSound.play();

gameThemeSound.loop = true;
gameThemeSound.play();

class Game {
  constructor(ctx, canvas, keyboarder) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.keyboarder = keyboarder;
    this.ladder = new Ladder(this.ctx);
    this.platform = new Platform(this.ctx);
    this.burgerLayers = new BurgerLayer(this.ctx);
    this.plates = new Plates(this.ctx);
    this.hero = new Hero(this.ctx, this.keyboarder, this.ladder, this.platform, this.burgerLayers, this.plates);
  } 

  drawGame() {
    this.platform.draw();
    this.ladder.draw();
    this.burgerLayers.draw();
    this.plates.draw();
    this.hero.draw();
  }

  drawText() {
    //player
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "#f00";
    this.ctx.fillText(`Player 1`, 65, 50);

    //score
    this.ctx.fillText(`Score: ${this.hero.score}`, 270, 50);

    //high score
    this.ctx.fillText("Hi-Score:", 470, 50);

    //lives
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText("Lives: 3", 850, 50);
  }

  gameLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGame();
    this.drawText();
    this.hero.onALadder();
    this.hero.onAPlatform();
    this.hero.onABurger();
    this.hero.update();
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);
  }

}


module.exports = Game;