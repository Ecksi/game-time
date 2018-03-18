class Hero {
  constructor(ctx, keyboarder, ladder, platform, burgerLayer) {
    this.x = 475;
    this.y = 525;
    this.ctx = ctx;
    this.onLadder = false;
    this.onPlatform = false;
    this.keyboarder = keyboarder;
    this.platform = platform;
    this.ladder = ladder;
    this.burgerLayer = burgerLayer;
    this.update = this.update.bind(this);
  }

  draw() {
    this.ctx.fillStyle = '#9a00fc';
    this.ctx.fillRect(this.x, this.y, 40, 55);
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
    if (currentPlatform.length > 0 && currentPlatform[0].l === 7) {
      this.keyboarder.disableDown();
    } else {
      this.keyboarder.enableDown();
    }

    //enable down on top platform & disable up
    if (currentPlatform.length > 0 && currentPlatform[0].l === 1) {
      this.keyboarder.enableDown();
      this.keyboarder.disableUp();
    } else {
      this.keyboarder.enableUp();
      this.keyboarder.enableDown();
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
   
    if (currentBurger.length > 0 && this.x === currentBurger[0].x && currentBurger[0].smushLeft === 0) {
      currentBurger[0].smushLeft = 1;
      currentBurger[0].smushCount++;
    }
   
    if (currentBurger.length > 0 && this.x + 40 === currentBurger[0].x + currentBurger[0].w && currentBurger[0].smushRight === 0) {
      currentBurger[0].smushRight = 1;
      currentBurger[0].smushCount++;
    }

    if (currentBurger.length > 0 && currentBurger[0].smushCount === 2) {
      currentBurger[0].y += 80;
    }

    console.log(currentBurger)
  }

  update() {
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