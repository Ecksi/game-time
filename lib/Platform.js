class Platforms {
  constructor(ctx) {
    const height = 10;

    this.ctx = ctx;
    this.platforms = [
      //top level
      {x: 60, y: 120, w: 880, h: height, l: 1},
      //second level
      {x: 65, y: 205, w: 255, h: height, l: 2},
      {x: 475, y: 205, w: 465, h: height, l: 2},
      //third level
      {x: 265, y: 260, w: 255, h: height, l: 3},
      //fourth level
      {x: 65, y: 315, w: 260, h: height, l: 4},
      {x: 680, y: 315, w: 260, h: height, l: 4},
      //fifth level
      {x: 265, y: 370, w: 460, h: height, l: 5},
      //sixth level
      {x: 680, y: 425, w: 260, h: height, l: 6},
      {x: 60, y: 480, w: 660, h: height, l: 6},
      //seventh level
      {x: 60, y: 580, w: 870, h: height, l: 7}
    ];
  }

  draw() {
    this.ctx.fillStyle = '#00fff6';
    this.platforms.map(platform => {
      this.ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
    });
  }
}

module.exports = Platforms;