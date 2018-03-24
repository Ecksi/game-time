class Plates {
  constructor(x) {
    this.x = x;
    this.y = 675;
    this.w = 135;
    this.h = 5;
    this.count = 0
    this.plateCount = 0;
  }

  draw(ctx, platesLevel1) {
    ctx.fillStyle = '#ddd';
    platesLevel1.map(plate => {
      ctx.fillRect(plate.x, plate.y, plate.w, plate.h);
    });
  }
}

module.exports = Plates;