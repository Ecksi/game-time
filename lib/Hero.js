const Game = require('./Game');

class Hero {
  constructor(ctx, keyboarder, ladder) {
    this.x = 475;
    this.y = 525;
    this.ctx = ctx;
    this.keyboarder = keyboarder;
    this.ladder = ladder;

  }

  draw() {
    this.ctx.fillStyle = '#9a00fc';
    this.ctx.fillRect(this.x, this.y, 40, 55);
  }

  update() {
      if (this.keyboarder.isDown('right')) {
        this.x++;
      } else if (this.keyboarder.isDown('left')) {
        this.x--;
      }
    for (var i = 0; i < this.ladder.ladders.length; i++) {
      if (this.keyboarder.isDown('up') && this.ladder.ladders[i].x > this.x && this.ladder.ladders[i].x + 30 < this.x + 40) {
        this.y -= 0.2;
      } else if (this.keyboarder.isDown('down') && this.ladder.ladders[i].x > this.x && this.ladder.ladders[i].x + 30 < this.x + 40) {
        this.y += 0.2;
      }
    }
  }
}

module.exports = Hero;