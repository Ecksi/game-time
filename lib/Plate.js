class Plates {
  constructor(ctx) {
    const width = 135;
    const height = 5;
    const posY = 675;

    this.ctx = ctx;
    this.plates = [
      {x: 120, y: posY, w: width, h: height, count: 0},
      {x: 330, y: posY, w: width, h: height, count: 0},
      {x: 530, y: posY, w: width, h: height, count: 0},
      {x: 745, y: posY, w: width, h: height, count: 0}
    ];
  };

  draw() {
    this.ctx.fillStyle = '#ddd';
    this.plates.map(plate => {
      this.ctx.fillRect(plate.x, plate.y, plate.w, plate.h);
    });
  };
};

module.exports = Plates;