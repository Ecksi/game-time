class Platforms {
  constructor(ctx) {
    const height = 10;
    this.ctx = ctx;
    this.platforms = [
      {x: 60, y: 580, w: 870, h: height},
      {x: 60, y: 480, w: 660, h: height},
      {x: 680, y: 425, w: 260, h: height},
      {x: 265, y: 370, w: 460, h: height},
      {x: 65, y: 315, w: 255, h: height},
      {x: 680, y: 315, w: 255, h: height},
      {x: 265, y: 260, w: 255, h: height},
      {x: 60, y: 205, w: 255, h: height},
      {x: 470, y: 205, w: 460, h: height},
      {x: 60, y: 120, w: 870, h: height}
    ];
  };

  draw() {
    this.ctx.fillStyle = '#00fff6';
    this.platforms.map(platform => {
      this.ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
    });
  };
};

module.exports = Platforms;