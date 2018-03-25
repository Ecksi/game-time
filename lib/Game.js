const Hero = require('./Hero');
const Ladder = require('./Ladder');
const Platform = require('./Platform');
const Plates = require('./Plate');
const Text = require('./Text');
const Burger = require('./BurgerLayer');
const Level1 = require('./Level1');
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
    this.hero = new Hero(475, 525);
    this.level1 = Level1;
    this.ladders = this.createLadders();
    this.platesOnBottom = this.createPlates();
    this.burgerLayers = this.createBurgers();
    this.platforms = this.createPlatforms();
    this.timer = 51;
    this.score = 0;
    this.gameNumber = 1;
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
    this.keyboardConditions(this.platformCollision());
    this.collisionDetection();
    this.moveHero();
    this.gameTimer();
    this.winGame();
    this.loseGame();
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);
  }

  keyboardConditions(currentPlatform) {
    currentPlatform = currentPlatform[0];
    if (this.hero.onLadder === true) {
      this.keyboarder.keyState.up = 'enabled';
      this.keyboarder.keyState.down = 'enabled';
      this.keyboarder.keyState.left = 'disabled';
      this.keyboarder.keyState.right = 'disabled';
    }

    if (this.hero.onLadder === true &&
      currentPlatform &&
      currentPlatform.l === 8) {
      this.keyboarder.keyState.up = 'enabled';
      this.keyboarder.keyState.down = 'disabled';
      this.keyboarder.keyState.left = 'enabled';
      this.keyboarder.keyState.right = 'enabled';
    }

    if (this.hero.onLadder === true &&
      currentPlatform &&
      currentPlatform.l === 1) {
      this.keyboarder.keyState.up = 'disabled';
      this.keyboarder.keyState.down = 'enabled';
      this.keyboarder.keyState.left = 'enabled';
      this.keyboarder.keyState.right = 'enabled';
    }

    if (this.hero.onPlatform === true && currentPlatform) {
      this.keyboarder.keyState.left = 'enabled';
      this.keyboarder.keyState.right = 'enabled';
    }

    if (this.hero.onPlatform === true && this.hero.onLadder === false) {
      this.keyboarder.keyState.up = 'disabled';
      this.keyboarder.keyState.down = 'disabled';
    }

    if (this.hero.onPlatform === true &&
      currentPlatform &&
      this.hero.x === currentPlatform.x) {
      this.keyboarder.keyState.left = 'disabled';
    }

    if (this.hero.onPlatform === true &&
      currentPlatform &&
      this.hero.x + 40 === currentPlatform.x + currentPlatform.w) {
      this.keyboarder.keyState.right = 'disabled';
    }
  }

  moveHero() {
    if (this.keyboarder.isDown('right') &&
      this.keyboarder.keyState.right !== 'disabled') {
      this.hero.x += 2.5;
    } else if (this.keyboarder.isDown('left') &&
      this.keyboarder.keyState.left === 'enabled') {
      this.hero.x -= 2.5;
    } else if (this.keyboarder.isDown('up') &&
      this.keyboarder.keyState.up === 'enabled') {
      this.hero.y -= 2.5;
    } else if (this.keyboarder.isDown('down') &&
      this.keyboarder.keyState.down === 'enabled') {
      this.hero.y += 2.5;
    }
  }

  collisionDetection() {
    this.findCurrentBurger();
    this.ladderCollision();
    this.platformCollision();
    this.burgerCollision();
  }

  findCurrentBurger() {
    return this.burgerLayers.filter(
      i =>
        this.hero.x >= i.x &&
        this.hero.x + 40 <= i.x + i.w
        && i.y + 10 === this.hero.y + 55
    );
  }

  ladderCollision() {
    let currentLadder = this.ladders.filter(
      i =>
        i.x >= this.hero.x &&
        i.x + 30 <= this.hero.x + 40 &&
        this.hero.y + 55 <= i.y + i.h &&
        this.hero.y >= i.y - 65
    );

    currentLadder = currentLadder[0]

    if (currentLadder) {
      this.hero.onLadder = true;
    } else {
      this.hero.onLadder = false;
    }

    return currentLadder;
  }

  platformCollision() {
    let currentPlatform = this.platforms.filter(
      i =>
        i.y === this.hero.y + 55 &&
        i.x <= this.hero.x &&
        this.hero.x + 40 <= i.x + i.w
    );

    if (currentPlatform) {
      this.hero.onPlatform = true;
    } else {
      this.hero.onPlatform = false;
    }

    return currentPlatform;
  }

  burgerCollision() {
    let currentBurger = this.findCurrentBurger();
    let currentPlatform = this.platformCollision();

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
    if (this.hero.x === currentBurger.x &&
       currentBurger.smushLeft === false) {
      currentBurger.smushLeft = true;
      currentBurger.smushCount++;
      this.score += 250;
    }
  }

  squishRight(currentBurger) {
    if (this.hero.x + 40 === currentBurger.x + currentBurger.w &&
        currentBurger.smushRight === false) {
      currentBurger.smushRight = true;
      currentBurger.smushCount++;
      this.score += 250;
    }
  }

  dropBurger(currentBurger, currentPlatform) {
    let nextPlatform = this.findNextPlatform(currentBurger, currentPlatform);
    let burgerOnNextPlatform = this.findNextBurger(currentBurger, nextPlatform);

    gameBurgerFall.play();
    currentBurger.y = nextPlatform.y - 10;

    this.resetSmushCounts(currentBurger);

    if (burgerOnNextPlatform && nextPlatform.l !== 8) {
      this.dropBurger(burgerOnNextPlatform, nextPlatform);
    } else if (burgerOnNextPlatform && nextPlatform.l === 8) {
      this.dropBurgerToPlate(burgerOnNextPlatform, currentPlatform);
    }
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

  resetSmushCounts(currentBurger) {
    currentBurger.smushRight = false;
    currentBurger.smushLeft = false;
    currentBurger.smushCount = 0;
  }

  gameTimer() {
    this.timer -= 0.015;
  }

  loseGame() {
    if (this.timer < 0) {
      gameLose.play();
      alert("You lost!!! Better luck next time!");
      this.gameNumber = 0;
      this.nextGame();
    }
  }

  winGame() {
    if (this.plates.plateCount === 16) {
      gameWin.play();
      alert("You made mad burgers yo! Decreasing the time!!! HURRY UP!!")
      this.gameNumber++;
      this.nextGame();
    }
  }

  nextGame() {
    localStorage.setItem('gameNumber', this.gameNumber);
    location.reload();
  }

  createBurgers() {
    let burgerLayersLevel1 = this.level1[0]['burgers'];

    return burgerLayersLevel1;
  }

  createLadders() {
    let laddersLevel1 = this.level1[1]['ladders'];

    return laddersLevel1;
  }

  createPlatforms() {
    let platformsLevel1 = this.level1[2]['platforms'];

    return platformsLevel1;
  }

  createPlates() {
    let platesLevel1 = this.level1[3]['plates'];

    return platesLevel1;
  }
}

module.exports = Game;
