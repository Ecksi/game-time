class GamePiece {
  constructor(x, y, keyboarder, ladder, platform) {
    this.x = x;
    this.y = y;
    this.keyboarder = keyboarder;
    this.platform = platform;
    this.ladder = ladder
  }
}

module.exports = GamePiece;
