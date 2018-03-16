class BurgerLayer {
  constructor(ctx) {
    const width = 125;
    const height = 15;

    var burgerLayers = [
      {x: 125, y: 570, w: width, h: height},
      {x: 125, y: 470, w: width, h: height},
      {x: 125, y: 305, w: width, h: height},
      {x: 125, y: 195, w: width, h: height},
      {x: 335, y: 570, w: width, h: height},
      {x: 335, y: 470, w: width, h: height},
      {x: 335, y: 360, w: width, h: height},
      {x: 335, y: 110, w: width, h: height},
      {x: 535, y: 570, w: width, h: height},
      {x: 535, y: 360, w: width, h: height},
      {x: 535, y: 195, w: width, h: height},
      {x: 535, y: 110, w: width, h: height},
      {x: 750, y: 415, w: width, h: height},
      {x: 750, y: 305, w: width, h: height},
      {x: 750, y: 195, w: width, h: height},
      {x: 750, y: 110, w: width, h: height},
    ]

    ctx.fillStyle = '#ffae00';
    burgerLayers.map(burgerLayer => {
      ctx.fillRect(burgerLayer.x, burgerLayer.y, burgerLayer.w, burgerLayer.h);
    });
  }
}

module.exports = BurgerLayer;