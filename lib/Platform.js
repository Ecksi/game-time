class Platforms {
  constructor(ctx) {
    const height = 10;

    this.ctx = ctx;
    this.platforms = [
      //top level
      {x: 40, y: 120, w: 910, h: height, l: 1},
      //second level
      {x: 40, y: 205, w: 295, h: height, l: 2},
      {x: 460, y: 205, w: 490, h: height, l: 2},
      //third level
      {x: 265, y: 260, w: 265, h: height, l: 3},
      //fourth level
      {x: 40, y: 315, w: 295, h: height, l: 4},
      {x: 670, y: 315, w: 280, h: height, l: 4},
      //fifth level
      {x: 265, y: 370, w: 470, h: height, l: 5},
      //sixth level
      {x: 670, y: 425, w: 280, h: height, l: 6},
      //sevent level
      {x: 40, y: 480, w: 700, h: height, l: 7},
      //eighth level
      {x: 40, y: 580, w: 910, h: height, l: 8}
    ];
  }

  draw() {
    this.ctx.fillStyle = '#fc9838';
    this.platforms.map(platform => {
      this.ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
    });
  }
}

module.exports = Platforms;