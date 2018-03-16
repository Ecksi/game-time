class Hero {
  constructor(ctx, keyboarder) {
    this.x = 475;
    this.y = 525;
    this.ctx = ctx;
    this.keyboarder = keyboarder;
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
  }
}


module.exports = Hero;
