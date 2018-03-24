class GamePiece {
  constructor(x, y, keyboarder, ladder, platform, burger, plates) {
    this.x = x;
    this.y = y;
    this.keyboarder = keyboarder;
    this.platform = platform;
    this.ladder = ladder;
    this.burger = burger;
    this.plates = plates;
  }
}

module.exports = GamePiece;
