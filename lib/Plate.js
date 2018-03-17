class Plates {
  constructor(ctx) {
    const width = 130;
    const height = 5;
    const posY = 675;
    this.ctx = ctx;
    this.plates = [
      {x: 130, y: posY, w: width, h: height},
      {x: 335, y: posY, w: width, h: height},
      {x: 540, y: posY, w: width, h: height},
      {x: 745, y: posY, w: width, h: height}
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