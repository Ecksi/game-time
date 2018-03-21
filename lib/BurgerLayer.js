class BurgerLayer {
  constructor(ctx) {
    this.ctx = ctx;
    this.smushCount = 0;
    const width = 125;
    const height = 15;

    this.burgerLayers = [
      {x: 125, y: 195, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'top'},
      {x: 335, y: 110, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'top'},
      {x: 535, y: 110, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'top'},
      {x: 750, y: 110, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'top'},
      {x: 125, y: 305, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'lettuce'},
      {x: 335, y: 360, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'lettuce'},
      {x: 535, y: 195, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'lettuce'},
      {x: 750, y: 195, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'lettuce'},
      {x: 125, y: 470, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'patty'},
      {x: 335, y: 470, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'patty'},
      {x: 535, y: 360, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'patty'},
      {x: 750, y: 305, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'patty'},
      {x: 125, y: 570, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'bottom'},
      {x: 335, y: 570, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'bottom'},
      {x: 535, y: 570, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'bottom'},
      {x: 750, y: 415, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'bottom'},
    ];
  }

  draw() {
    this.burgerLayers.forEach(burgerLayer => {
      if (burgerLayer.layer === 'top') {
        const burgerTopImage = new Image();
        burgerTopImage.src = '../resources/burger_top.png';
        this.ctx.drawImage(burgerTopImage, burgerLayer.x, burgerLayer.y);
      } else if (burgerLayer.layer === 'lettuce') {
          const burgerLettuceImage = new Image();
          burgerLettuceImage.src = '../resources/burger_lettuce.png';
          this.ctx.drawImage(burgerLettuceImage, burgerLayer.x, burgerLayer.y);
      } else if (burgerLayer.layer === 'patty') {
          const burgerPattyImage = new Image();
          burgerPattyImage.src = '../resources/burger_patty.png';
          this.ctx.drawImage(burgerPattyImage, burgerLayer.x, burgerLayer.y);
      } else if (burgerLayer.layer === 'bottom') {
          const burgerBottomImage = new Image();
          burgerBottomImage.src = '../resources/burger_bottom.png';
          this.ctx.drawImage(burgerBottomImage, burgerLayer.x, burgerLayer.y);
      }
    });
  }
}

module.exports = BurgerLayer;
