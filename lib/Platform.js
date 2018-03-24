class Platform {
  constructor(x, y, w, l) {
    this.x = x,
    this.y = y,
    this.w = w,
    this.l = l,
    this.h = 10
  }

  draw(ctx, platformsLevel1) {
    ctx.fillStyle = '#fc9838';
    platformsLevel1.map(platform => {
      ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
    });
  }
}

module.exports = Platform;