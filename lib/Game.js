const Hero = require('./Hero');
const Ladder = require('./Ladder');
const Platform = require('./Platform');
const Plates = require('./Plate');
const Text = require('./Text');
const Burger = require('./BurgerLayer');
const gameWin = new Audio('../resources/game_win.mp3');
const gameLose = new Audio('../resources/game_lose.mp3');
const gameBurgerFall = new Audio('../resources/boing.mp3');

class Game {
  constructor(ctx, canvas, keyboarder) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.keyboarder = keyboarder;
    this.ladder = new Ladder();
    this.platform = new Platform();
    this.burger = new Burger();
    this.plates = new Plates();
    this.text = new Text();
    this.ladders = this.createLadders();
    this.platesOnBottom = this.createPlates();
    this.burgerLayers = this.createBurgers();
    this.platforms = this.createPlatforms();
    this.timer = 51;
    this.score = 0;
    this.gameNumber = 1;
    this.hero = new Hero(
      475,
      525,
      this.keyboarder,
      this.ladder,
      this.platform,
      this.burger,
      this.plates
    );
  } 

  drawGame() {
    this.platform.draw(this.ctx, this.platforms);
    this.ladder.draw(this.ctx, this.ladders);
    this.burger.draw(this.ctx, this.burgerLayers)
    this.text.draw(this.ctx, this.timer, this.score)
    this.plates.draw(this.ctx, this.platesOnBottom);
    this.hero.draw(this.ctx);
  }

  gameLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGame();
    this.collisionDetection();
    this.winGame();
    this.loseGame();
    this.gameTimer();
    this.hero.update();
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);
  }

  createBurgers() {
    let burgerLayersLevel1 = [
      new Burger(125, 195, 'top'),
      new Burger(335, 110, 'top'),
      new Burger(535, 110, 'top'),
      new Burger(750, 110, 'top'),
      new Burger(125, 305, 'lettuce'),
      new Burger(335, 360, 'lettuce'),
      new Burger(535, 195, 'lettuce'),
      new Burger(750, 195, 'lettuce'),
      new Burger(125, 470, 'patty'),
      new Burger(335, 470, 'patty'),
      new Burger(535, 360, 'patty'),
      new Burger(750, 305, 'patty'),
      new Burger(125, 570, 'bottom'),
      new Burger(335, 570, 'bottom'),
      new Burger(535, 570, 'bottom'),
      new Burger(750, 415, 'bottom')
    ]

    return burgerLayersLevel1;
  }

  createLadders() {
    let laddersLevel1 = [
      new Ladder(65, 490, 90),
      new Ladder(65, 325, 155),
      new Ladder(65, 130, 75),
      new Ladder(175, 325, 155),
      new Ladder(175, 215, 100),
      new Ladder(285, 490, 90),
      new Ladder(285, 380, 100),
      new Ladder(285, 325, 45),
      new Ladder(285, 270, 45),
      new Ladder(285, 215, 45),
      new Ladder(285, 130, 75),
      new Ladder(385, 130, 130),
      new Ladder(480, 490, 90),
      new Ladder(480, 380, 100),
      new Ladder(480, 270, 100),
      new Ladder(480, 215, 45),
      new Ladder(480, 130, 75),
      new Ladder(590, 130, 75),
      new Ladder(590, 215, 155),
      new Ladder(685, 490, 90),
      new Ladder(685, 435, 45),
      new Ladder(685, 380, 45),
      new Ladder(685, 325, 45),
      new Ladder(685, 215, 100),
      new Ladder(685, 130, 75),
      new Ladder(800, 435, 145),
      new Ladder(800, 325, 100),
      new Ladder(900, 435, 145),
      new Ladder(900, 325, 100),
      new Ladder(900, 215, 100),
      new Ladder(900, 130, 75)
    ]

    return laddersLevel1;
  }

  createPlatforms() {
    let platformsLevel1 = [
      new Platform(40, 120, 910, 1),
      new Platform(40, 205, 295, 2),
      new Platform(460, 205, 490, 2),
      new Platform(265, 260, 265, 3),
      new Platform(40, 315, 295, 4),
      new Platform(670, 315, 280, 4),
      new Platform(265, 370, 470, 5),
      new Platform(670, 425, 280, 6),
      new Platform(40, 480, 700, 7),
      new Platform(40, 580, 910, 8)
    ]

    return platformsLevel1;
  }

  createPlates() {
    let platesLevel1 = [
      new Plates(120),
      new Plates(330),
      new Plates(530),
      new Plates(745)
    ]

    return platesLevel1;
  }

  collisionDetection() {
    this.ladderCollision();
    this.platformCollision();
    this.burgerCollision();
  }

  burgerCollision() {
    var currentBurger = this.burgerLayers.filter(
      i =>
        this.hero.x >= i.x &&
        this.hero.x + 40 <= i.x + i.w
        && i.y + 10 === this.hero.y + 55
    );

    var currentPlatform = this.platforms.filter(
      i =>
        i.y === this.hero.y + 55 &&
        i.x <= this.hero.x &&
        this.hero.x + 40 <= i.x + i.w
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
    if (this.hero.x === currentBurger.x && currentBurger.smushLeft === 0) {
      currentBurger.smushLeft = 1;
      currentBurger.smushCount++;
      this.score += 250;
    }
  }

  squishRight(currentBurger) {
    // Right squish - increase smush count and smush left count to 1
    if (this.hero.x + 40 === currentBurger.x + currentBurger.w &&
        currentBurger.smushRight === 0) {
      currentBurger.smushRight = 1;
      currentBurger.smushCount++;
      this.score += 250;
    }
  }

  dropBurger(currentBurger, currentPlatform) {
    var nextPlatform = this.findNextPlatform(currentBurger, currentPlatform);
    var burgerOnNextPlatform = this.findNextBurger(currentBurger, nextPlatform);

    gameBurgerFall.play();
    currentBurger.y = nextPlatform.y - 10;

    this.resetSmushCounts(currentBurger);

    if (burgerOnNextPlatform && nextPlatform.l !== 8) {
      this.dropBurger(burgerOnNextPlatform, nextPlatform);
    } else if (burgerOnNextPlatform && nextPlatform.l === 8) {
      this.dropBurgerToPlate(burgerOnNextPlatform, currentPlatform);
    }
  }

  findNextBurger(currentBurger, nextPlatform) {
    return this.burgerLayers.find(
      i =>
        i.y + i.h < nextPlatform.y + nextPlatform.h &&
        nextPlatform.y < i.y + i.h && i.x === currentBurger.x
    )
  }

  findNextPlatform(currentBurger, currentPlatform) {
    return this.platforms.find(
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
    let currentPlate = this.platesOnBottom.filter(
      i => currentBurger.x === i.x + 5);
    let currentPlateCount = currentPlate[0].count;
    
    gameBurgerFall.play();
    currentBurger.y = currentPlate[0].y - 10 - (20 * currentPlateCount);
    currentPlate[0].count++;
    this.score += 1000;
    this.plates.plateCount++;
  }

  ladderCollision() {
    let currentLadder =
      this.ladders.filter(
        i =>
          i.x >= this.hero.x &&
          i.x + 30 <= this.hero.x + 40 &&
          this.hero.y + 55 <= i.y + i.h &&
          this.hero.y >= i.y - 65
      );

    currentLadder = currentLadder[0];

    if (currentLadder) {
      this.keyboarder.disableLeft();
      this.keyboarder.disableRight();
      this.hero.onLadder = true;
    } else {
      this.keyboarder.enableLeft();
      this.keyboarder.enableRight();
      this.hero.onLadder = false;
    }
  }

  platformCollision() {
    let currentPlatform =
      this.platforms.filter(
        i =>
          i.y === this.hero.y + 55 &&
          i.x <= this.hero.x &&
          this.hero.x + 40 <= i.x + i.w
      );

    currentPlatform = currentPlatform[0];

    currentPlatform && currentPlatform.l === 8 ?
      this.keyboarder.disableDown() : this.keyboarder.enableDown();

    currentPlatform && currentPlatform.l === 1 ?
      this.keyboarder.disableUp() : this.keyboarder.enableUp();

    if (currentPlatform && this.hero.x > currentPlatform.x) {
      this.keyboarder.enableLeft();
      this.keyboarder.enableRight();
    }

    if (currentPlatform && this.hero.x === currentPlatform.x) {
      this.keyboarder.disableLeft();
    }

    if (currentPlatform &&
        this.hero.x + 40 === currentPlatform.x + currentPlatform.w) {
      this.keyboarder.disableRight();
    }
  }

  gameTimer() {
    this.timer -= 0.015;
  }

  loseGame() {
    if (this.timer < 0) {
      gameLose.play();
      alert("You lost!!! Better luck next time!");
      this.gameNumber = 0;
      localStorage.setItem('gameNumber', this.gameNumber);
      location.reload();
    }
  }

  winGame() {
    if (this.plates.plateCount === 16) {
      gameWin.play();
      alert("You made mad burgers yo! Decreasing the time!!! HURRY UP!!")
      this.plates.plateCount = 0;
      this.nextGame();
    }
  }

  nextGame() {
    this.gameNumber++;
    localStorage.setItem('gameNumber', this.gameNumber);
    location.reload();
  }
}

module.exports = Game;
