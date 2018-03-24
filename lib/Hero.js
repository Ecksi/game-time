const GamePiece = require('./GamePiece');

class Hero extends GamePiece {
  constructor(x, y, keyboarder, ladder, platform, burger, plates) {
    super(x, y, keyboarder, ladder, platform, burger, plates);
    this.x = x;
    this.y = y;
    this.onLadder = false;
    this.onPlatform = false;
  }

  draw(ctx) {
    const heroImage = new Image();

    heroImage.src = '../resources/burgerHero.png';
    ctx.drawImage(heroImage, this.x, this.y);
  }
}

module.exports = Hero;