class Ladder {
  constructor(x, y, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = 30;
  }

  draw(ctx, laddersLevel1) {
    ctx.fillStyle = '#5dc8ed';
    laddersLevel1.forEach(ladder => {
      for (let i = 0; i < ladder.h; i += 8) {
        ctx.fillRect(ladder.x, ladder.y + i, ladder.w, 2);
      }
    })
  }
}

module.exports = Ladder;