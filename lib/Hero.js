const GamePiece = require('./GamePiece');
const gameBurgerFall = new Audio('../resources/boing.mp3');

class Hero extends GamePiece {
  constructor(keyboarder, ladder, platform, burgerLayer, plates) {
    super();
    this.x = 475;
    this.y = 525;
    this.onLadder = false;
    this.onPlatform = false;
    this.score = 0;
    this.keyboarder = keyboarder;
    this.platform = platform;
    this.ladder = ladder;
    this.burgerLayer = burgerLayer;
    this.plates = plates;
    this.update = this.update.bind(this);
  }

  draw(ctx) {
    const heroImage = new Image();

    heroImage.src = '../resources/burgerHero.png';
    ctx.drawImage(heroImage, this.x, this.y);
  }

  ladderCollision() {
    let currentLadder =
      this.ladder.ladders.filter(
        i =>
          i.x >= this.x &&
          i.x + 30 <= this.x + 40 &&
          this.y + 55 <= i.y + i.h &&
          this.y >= i.y - 65
      );

    currentLadder = currentLadder[0];

    if (currentLadder) {
      this.keyboarder.disableLeft();
      this.keyboarder.disableRight();
      this.onLadder = true;
    } else {
      this.keyboarder.enableLeft();
      this.keyboarder.enableRight();
      this.onLadder = false;
    }
  }

  platformCollision() {
    let currentPlatform =
      this.platform.platforms.filter(
        i =>
          i.y === this.y + 55 &&
          i.x <= this.x &&
          this.x + 40 <= i.x + i.w
      );

    currentPlatform = currentPlatform[0];

    //disable down on bottom platform
    currentPlatform && currentPlatform.l === 8 ?
      this.keyboarder.disableDown() : this.keyboarder.enableDown();

    //enable down on top platform & disable up
    currentPlatform && currentPlatform.l === 1 ?
      this.keyboarder.disableUp() : this.keyboarder.enableUp();

    //if on platform enable left and right
    if (currentPlatform && this.x > currentPlatform.x) {
      this.keyboarder.enableLeft();
      this.keyboarder.enableRight();
    }

    // if on left platform disable left
    if (currentPlatform && this.x === currentPlatform.x) {
      this.keyboarder.disableLeft();
    }

    // if on right platform disable right
    if (currentPlatform &&
        this.x + 40 === currentPlatform.x + currentPlatform.w) {
      this.keyboarder.disableRight();
    }
  }

  burgerCollision() {
    var currentBurger = this.burgerLayer.burgerLayers.filter(
      i =>
        this.x >= i.x &&
        this.x + 40 <= i.x + i.w
        && i.y + 10 === this.y + 55
    );
    var currentPlatform = this.platform.platforms.filter(
      i =>
        i.y === this.y + 55 &&
        i.x <= this.x &&
        this.x + 40 <= i.x + i.w
    );

    currentBurger = currentBurger[0];
    currentPlatform = currentPlatform[0];

    if (currentBurger) {
      this.squishLeft(currentBurger);
      this.squishRight(currentBurger);
      if (currentBurger.smushCount === 2 && currentPlatform.l !== 8) {
        this.dropBurger(currentBurger, currentPlatform)
      } else if (currentBurger.smushCount === 2 && currentPlatform.l === 8) {
        this.dropBurgerToPlate(currentBurger, currentPlatform);
      }
    }
  }

  squishLeft(currentBurger) {
    // Left squish - increase smush count and smush left count to 1
    if (this.x === currentBurger.x && currentBurger.smushLeft === 0) {
      currentBurger.smushLeft = 1;
      currentBurger.smushCount++;
      this.score += 250;
    }
  }

  squishRight(currentBurger) {
    // Right squish - increase smush count and smush left count to 1
    if (this.x + 40 === currentBurger.x + currentBurger.w &&
        currentBurger.smushRight === 0) {
      currentBurger.smushRight = 1;
      currentBurger.smushCount++;
      this.score += 250;
    }
  }

  dropBurger(currentBurger, currentPlatform) {
    var nextPlatform = this.findNextPlatform(currentBurger, currentPlatform);
    var burgerOnNextPlatform = this.findNextBurger(currentBurger, nextPlatform);

    currentBurger.y = nextPlatform.y - 10;
    this.resetSmushCounts(currentBurger);

    if (burgerOnNextPlatform && nextPlatform.l !== 8) {
      this.dropBurger(burgerOnNextPlatform, nextPlatform);
    } else if (burgerOnNextPlatform && nextPlatform.l === 8) {
      this.dropBurgerToPlate(burgerOnNextPlatform, currentPlatform);
    }
  }

  findNextBurger(currentBurger, nextPlatform) {
    gameBurgerFall.play();
    return this.burgerLayer.burgerLayers.find(
      i =>
        i.y + i.h < nextPlatform.y + nextPlatform.h &&
        nextPlatform.y < i.y + i.h && i.x === currentBurger.x
    )
  }

  findNextPlatform(currentBurger, currentPlatform) {
    return this.platform.platforms.find(
      i =>
        currentBurger.x > i.x &&
        (i.x + i.w) > currentBurger.x &&
        i.l > currentPlatform.l
    )
  }

  resetSmushCounts(currentBurger) {
    currentBurger.smushRight = 0;
    currentBurger.smushLeft = 0;
    currentBurger.smushCount = 0;
  }

  dropBurgerToPlate(currentBurger) {
    let currentPlate = this.plates.plates.filter(
      i => currentBurger.x === i.x + 5);
    let currentPlateCount = currentPlate[0].count;
    
    gameBurgerFall.play();
    currentBurger.y = currentPlate[0].y - 10 - (20 * currentPlateCount);
    currentPlate[0].count++;
    this.score += 1000;
    this.plates.plateCount++;
  }

  update() {
    if (this.keyboarder.isDown('right') &&
        !this.keyboarder.rightDisabled) {
      this.x += 2.5;
    } else if (this.keyboarder.isDown('left') &&
               !this.keyboarder.leftDisabled) {
      this.x -= 2.5;
    } else if (this.keyboarder.isDown('up') &&
               this.onLadder &&
              !this.keyboarder.upDisabled) {
      this.y -= 2.5;
    } else if (this.keyboarder.isDown('down') &&
               this.onLadder &&
              !this.keyboarder.downDisabled) {
      this.y += 2.5;
    }
  }
}

module.exports = Hero;