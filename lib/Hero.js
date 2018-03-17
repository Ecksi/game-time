const Game = require('./Game');

class Hero {
  constructor(ctx, keyboarder, ladder, platform) {
    this.x = 475;
    this.y = 525;
    this.ctx = ctx;
    this.onLadder = false;
    this.onPlatform = false;
    this.keyboarder = keyboarder;
    this.platform = platform;
    this.ladder = ladder;
    this.update = this.update.bind(this);
  }

  draw() {
    this.ctx.fillStyle = '#9a00fc';
    this.ctx.fillRect(this.x, this.y, 40, 55);
  }

  onALadder() {
   
    if (this.ladder.ladders.some(i => {
      return i.x > this.x && i.x + 30 < this.x + 40 && this.y + 55 <= i.y + i.h && this.y > i.y - 65
    })) {
      this.keyboarder.disableLeft();
      this.keyboarder.disableRight();
      this.onLadder = true;
      } else {
      this.keyboarder.enableLeft();
      this.keyboarder.enableRight();
      this.onLadder = false;
    }
  }

  onAPlatform() {
     let currentPlatform = this.platform.platforms.filter(i => i.y === this.y + 55);
      if (this.platform.platforms.some(i => {
        return this.y + 55 === i.y && this.x > currentPlatform[0].x 
      })) {
        this.keyboarder.enableLeft();
        this.keyboarder.enableRight();
        this.onPlatform = true;
      } 
      else if (this.platform.platforms.some(i => {
        return this.y + 55 === i.y && this.x < currentPlatform[0].x
      })) {
        this.keyboarder.disableLeft();
    } 
  }

  update() {
      if (this.keyboarder.isDown('right') && !this.keyboarder.rightDisabled) {
        this.x++;
      } else if (this.keyboarder.isDown('left') && ! this.keyboarder.leftDisabled) {
        this.x--;
      } else if (this.keyboarder.isDown('up') && this.onLadder) {
        this.y--;
      } else if (this.keyboarder.isDown('down') && this.onLadder) {
        this.y++;
      }
  }
}

module.exports = Hero;