const Hero = require('./Hero');
const Enemy = require('./Enemy');
const Ladder = require('./Ladder');
const Platform = require('./Platform');
const BurgerLayer = require('./BurgerLayer');


class Game {
  constructor(ctx, canvas, keyboarder) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.keyboarder = keyboarder;
    this.ladder = new Ladder(this.ctx);
    this.platform = new Platform(this.ctx);
    this.bugerLayers = new BurgerLayer(this.ctx);
    this.hero = new Hero(this.ctx, this.keyboarder, this.ladder, this.platform);
  } 

  drawGame() {
    console.log(this.keyboarder)
    drawText(this.ctx);
    drawPlates(this.ctx);
    this.platform.draw();
    this.ladder.draw();
    this.bugerLayers.draw();
    this.hero.draw();
  }

  gameLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGame();
    this.hero.update();
    this.hero.onALadder();
    this.hero.onAPlatform();
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

function drawPlates(ctx) {
  const width = 130;
  const height = 5;
  const posY = 675;

  var plates = [
    {x: 130, y: posY, w: width, h: height},
    {x: 335, y: posY, w: width, h: height},
    {x: 540, y: posY, w: width, h: height},
    {x: 745, y: posY, w: width, h: height}
  ]

  ctx.fillStyle = '#ddd';
  plates.map(plate => {
    ctx.fillRect(plate.x, plate.y, plate.w, plate.h);
  });
};

module.exports = Game;