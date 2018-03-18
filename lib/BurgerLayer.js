class BurgerLayer {
  constructor(ctx) {
    this.ctx = ctx;
    this.smushCount = 0;
    const width = 125;
    const height = 15;

    this.burgerLayers = [
      {x: 125, y: 570, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
      {x: 125, y: 470, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
      {x: 125, y: 305, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
      {x: 125, y: 195, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
      {x: 335, y: 570, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
      {x: 335, y: 470, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
      {x: 335, y: 360, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
      {x: 335, y: 110, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
      {x: 535, y: 570, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
      {x: 535, y: 360, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
      {x: 535, y: 195, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
      {x: 535, y: 110, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
      {x: 750, y: 415, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
      {x: 750, y: 305, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
      {x: 750, y: 195, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
      {x: 750, y: 110, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0},
    ];
  }

  draw() {
    this.ctx.fillStyle = '#ffae00';
    this.burgerLayers.map(burgerLayer => {
      this.ctx.fillRect(burgerLayer.x, burgerLayer.y, burgerLayer.w, burgerLayer.h);
    });
  }
}

module.exports = BurgerLayer;