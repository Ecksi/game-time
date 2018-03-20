const Hero = require('./Hero');
// const Enemy = require('./Enemy');
const Ladder = require('./Ladder');
const Platform = require('./Platform');
const Plates = require('./Plate');
const BurgerLayer = require('./BurgerLayer');


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
    drawText(this.ctx);
    this.platform.draw();
    this.ladder.draw();
    this.burgerLayers.draw();
    this.plates.draw();
    this.hero.draw();
  }

  gameLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGame();
    this.hero.onALadder();
    this.hero.onAPlatform();
    this.hero.onABurger();
    this.hero.update();
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);
  }
}

function drawText(ctx) {
  //player
  ctx.font = "20px Arial";
  ctx.fillStyle = "#f00";
  ctx.fillText("Player", 65, 50);

  //score
  ctx.fillText("Score:", 270, 50);

  //high score
  ctx.fillText("Hi-Score:", 470, 50);

  //lives
  ctx.fillStyle = "#fff";
  ctx.fillText("Lives:", 850, 50);
}

module.exports = Game;