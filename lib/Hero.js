const GamePiece = require('./GamePiece');

class Hero extends GamePiece {
  constructor(x, y, keyboarder, ladder, platform) {
    super(x, y, keyboarder, ladder, platform);
    this.onLadder = false;
    this.onPlatform = false;
    this.update = this.update.bind(this);
  }

  draw(ctx) {
    const heroImage = new Image();

    heroImage.src = '../resources/burgerHero.png';
    ctx.drawImage(heroImage, this.x, this.y);
  }

  update() {
    if (this.keyboarder.isDown('right') &&
        !this.keyboarder.rightDisabled) {
      this.x += 2.5;
    } else if (this.keyboarder.isDown('left') &&
               !this.keyboarder.leftDisabled) {
      this.x -= 2.5;
    } else if (this.keyboarder.isDown('up') &&
               this.onLadder &&
              !this.keyboarder.upDisabled) {
      this.y -= 2.5;
    } else if (this.keyboarder.isDown('down') &&
               this.onLadder &&
              !this.keyboarder.downDisabled) {
      this.y += 2.5;
    }
  }
}

module.exports = Hero;