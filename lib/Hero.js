class Hero {
  constructor(ctx, keyboarder, ladder, platform, burgerLayer, plates) {
    this.x = 475;
    this.y = 525;
    this.ctx = ctx;
    this.onLadder = false;
    this.onPlatform = false;
    this.keyboarder = keyboarder;
    this.platform = platform;
    this.ladder = ladder;
    this.burgerLayer = burgerLayer;
    this.plates = plates;
    this.update = this.update.bind(this);
  }

  draw() {
    const heroImage = new Image();
    
    heroImage.src = '../resources/burgerHero.png';
    this.ctx.drawImage(heroImage, this.x, this.y);
  }

  onALadder() {
    let currentLadder = 
    this.ladder.ladders.filter(i => i.x >= this.x &&
                               i.x + 30 <= this.x + 40 &&
                               this.y + 55 <= i.y + i.h &&
                               this.y >= i.y - 65);

    if (currentLadder.length > 0) {
      this.keyboarder.disableLeft();
      this.keyboarder.disableRight();
      this.onLadder = true;
    } else {
      this.keyboarder.enableLeft();
      this.keyboarder.enableRight();
      this.onLadder = false;
    }
  }

  onAPlatform() {
    let currentPlatform = 
    this.platform.platforms.filter(i => i.y === this.y + 55 && 
                                   i.x <= this.x && 
                                   this.x + 40 <= i.x + i.w);

    //disable down on bottom platform
    if (currentPlatform.length > 0 && currentPlatform[0].l === 8) {
      this.keyboarder.disableDown();
      console.log(this.keyboarder.downDisabled)
    } else {
      this.keyboarder.enableDown();
    }

    //enable down on top platform & disable up
    if (currentPlatform.length > 0 && currentPlatform[0].l === 1) {
      this.keyboarder.disableUp();
    } else {
      this.keyboarder.enableUp();
    }

    //if on platform enable left and right
    if (currentPlatform.length > 0 && this.x > currentPlatform[0].x) {
      this.keyboarder.enableLeft();
      this.keyboarder.enableRight();
    } 

    // if on left of platform disable left
    if (currentPlatform.length > 0 && this.x === currentPlatform[0].x) {
      this.keyboarder.disableLeft();
      this.keyboarder.enableRight();
    }

    // if on left of platform disable right
    if (currentPlatform.length > 0 && this.x + 40 === currentPlatform[0].x + currentPlatform[0].w) {
      this.keyboarder.disableRight();
      this.keyboarder.enableLeft();
    }
  }

  onABurger() {
    let currentBurger = this.burgerLayer.burgerLayers.filter(i => this.x >= i.x && this.x + 40 <= i.x + i.w && i.y + 10 === this.y + 55);

    // Left squish - increase smush count and smush left count to 1
    if (currentBurger.length > 0 && this.x === currentBurger[0].x && currentBurger[0].smushLeft === 0) {
      currentBurger[0].smushLeft = 1;
      currentBurger[0].smushCount++;
    }
  
    // Right squish - increase smush count and smush left count to 1
    if (currentBurger.length > 0 && this.x + 40 === currentBurger[0].x + currentBurger[0].w && currentBurger[0].smushRight === 0) {
      currentBurger[0].smushRight = 1;
      currentBurger[0].smushCount++;
    }

    // Drop squished burger to plate when count is 2
    if (currentBurger.length > 0 && currentBurger[0].smushCount === 2 && currentBurger[0].y + 10 === 580) {
      let currentPlate = this.plates.plates.filter(i => currentBurger[0].x === i.x + 5);
      let currentPlateCount = currentPlate[0].count;
     
      currentBurger[0].y = currentPlate[0].y - 10 - (20 * currentPlateCount);
      currentPlate[0].count++;

      // Drop squished burger to next platform when count is 2
    } else if (currentBurger.length > 0 && currentBurger[0].smushCount === 2 ) {
      let platformArray = this.platform.platforms;
      let currentPlatform = this.platform.platforms.filter(i => i.y === this.y + 55 && i.x <= this.x && this.x + 40 <= i.x + i.w);
      let nextPlatform = platformArray.find(i => currentBurger[0].x > i.x && (i.x + i.w) > currentBurger[0].x && i.l > currentPlatform[0].l)
      currentBurger[0].y = nextPlatform.y - 10;
      currentBurger[0].smushRight = 0;
      currentBurger[0].smushLeft = 0;
      currentBurger[0].smushCount = 0;

      let burgerOnNextPlatform = this.burgerLayer.burgerLayers.find(i => i.y + i.h < nextPlatform.y + nextPlatform.h && nextPlatform.y < i.y + i.h && i.x === currentBurger[0].x)
    //   if (burgerOnNextPlatform) {
    //   let belowNextPlatform = platformArray.find(i => burgerOnNextPlatform.x > i.x && (i.x + i.w) > burgerOnNextPlatform.x && i.l > nextPlatform.l)
    //   burgerOnNextPlatform.y = belowNextPlatform.y - 10;

    // } else if (!burgerOnNextPlatform) {
    //   currentBurger[0].y = nextPlatform.y - 10;
    //   currentBurger[0].smushRight = 0;
    //   currentBurger[0].smushLeft = 0;
    //   currentBurger[0].smushCount = 0;
    //   }
    }
  }

  update() {
    console.log(this.keyboarder.downDisabled)
    if (this.keyboarder.isDown('right') && !this.keyboarder.rightDisabled) {
      this.x++;
    } else if (this.keyboarder.isDown('left') && !this.keyboarder.leftDisabled) {
      this.x--;
    } else if (this.keyboarder.isDown('up') && this.onLadder && !this.keyboarder.upDisabled) {
      this.y--;
    } else if (this.keyboarder.isDown('down') && this.onLadder && !this.keyboarder.downDisabled) {
      this.y++;
    }
  }
}

module.exports = Hero;