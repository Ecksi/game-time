class Burger {
  constructor(x, y, layer) {
    this.x = x;
    this.y = y;
    this.w = 125;
    this.h = 15;
    this.smushLeft = 0;
    this.smushRight = 0;
    this.smushCount = 0;
    this.layer = layer;
  }

  draw(ctx, burgerLayersLevel1) {
    burgerLayersLevel1.forEach(burgerLayer => {
      switch (burgerLayer.layer) {
      case 'top': {
        const burgerTopImage = new Image();
        
        burgerTopImage.src = '../resources/burger_top.png';
        ctx.drawImage(burgerTopImage, burgerLayer.x, burgerLayer.y);
        break;
      }
      case 'lettuce': {
        const burgerLettuceImage = new Image();

        burgerLettuceImage.src = '../resources/burger_lettuce.png';
        ctx.drawImage(burgerLettuceImage, burgerLayer.x, burgerLayer.y);
        break;   
      }      
      case 'patty': {
        const burgerPattyImage = new Image();

        burgerPattyImage.src = '../resources/burger_patty.png';
        ctx.drawImage(burgerPattyImage, burgerLayer.x, burgerLayer.y);
        break;
      }
      case 'bottom': {
        const burgerBottomImage = new Image();

        burgerBottomImage.src = '../resources/burger_bottom.png';
        ctx.drawImage(burgerBottomImage, burgerLayer.x, burgerLayer.y);
        break;
      }
      }
    });
  }
}

module.exports = Burger;
