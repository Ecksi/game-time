class Hero {
  constructor(ctx) {
    let heroX = 475;
    let heroY = 525;

    ctx.fillStyle = '#9a00fc';
    ctx.fillRect(heroX, heroY, 40, 55);
  }
}

module.exports = Hero;