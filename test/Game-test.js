const { assert } = require('chai');
const Game = require('../lib/Game');

require('locus');

describe('Game', () => {
  let game;
  let keyboarder;
  let originalHeroXPosition;
  let originalHeroYPosition;

  beforeEach(() => {
    game = new Game();
    originalHeroXPosition = game.hero.x;
    originalHeroYPosition = game.hero.y;
    keyboarder = {
      key: {
      },
      keyState: {
      }
    }
  });

  it('Game class should be a function', () => {
    assert.isFunction(Game);
  });

  it('should be an object', () => {
    assert.isObject(game);
  });

  it('should start with a score of 0', () => {
    assert.equal(game.score, 0);
  });

  it('should start with a timer set at 31', () => {
    assert.equal(game.timer, 51);
  });

  it('should decrement the counter as the game goes on', () => {
    game.gameTimer();
    game.gameTimer();
    game.gameTimer();
    game.gameTimer();
    game.gameTimer();

    assert.equal(game.timer, 50.925);
  });

  it('should start with a gameNumber of 1', () => {
    assert.equal(game.gameNumber, 1);
  });

  it('should be able to create a new hero object', () => {
    assert.equal(typeof game.hero, 'object');
  });

  it('should be able to create a new ladder object', () => {
    assert.equal(typeof game.ladder, 'object');
  });

  it('should be able to create a new platform object', () => {
    assert.equal(typeof game.platform, 'object');
  });

  it('should be able to create a new burgerLayer object', () => {
    assert.equal(typeof game.burgerLayers, 'object');
  });

  it('should be able to create a new plate object', () => {
    assert.equal(typeof game.plates, 'object');
  });

  it('should be able to create a new text object', () => {
    assert.equal(typeof game.text, 'object');
  });

  it('should be able to the move to the right', () => {
    game = new Game(undefined, undefined, keyboarder);
    keyboarder.key.right = true;
    keyboarder.keyState.right = 'enabled';

    assert.equal(game.hero.x, originalHeroXPosition)
    game.moveHero();

    assert.equal(game.hero.x, originalHeroXPosition + 2.5)
  });

  it('should be able to the move to the left', () => {
    game = new Game(undefined, undefined, keyboarder);
    keyboarder.key.left = true;
    keyboarder.keyState.left = 'enabled';

    assert.equal(game.hero.x, originalHeroXPosition)
    game.moveHero();

    assert.equal(game.hero.x, originalHeroXPosition - 2.5)
  });

  it('should be able to the move to the down', () => {
    game = new Game(undefined, undefined, keyboarder);
    keyboarder.key.down = true;
    keyboarder.keyState.down = 'enabled';

    assert.equal(game.hero.y, originalHeroYPosition)
    game.moveHero();

    assert.equal(game.hero.y, originalHeroYPosition + 2.5)
  });

  it('should be able to the move to the up', () => {
    game = new Game(undefined, undefined, keyboarder);
    keyboarder.key.up = true;
    keyboarder.keyState.up = 'enabled';

    assert.equal(game.hero.y, originalHeroYPosition);
    game.moveHero();

    assert.equal(game.hero.y, originalHeroYPosition - 2.5)
  });

  it('should be able to tell what burger the hero is on', () => {
    game.hero.x = 600;
    game.hero.y = 150;

    assert.equal(game.findCurrentBurger()[0].x, 535)
    assert.equal(game.findCurrentBurger()[0].y, 195)
  });

  it('should be able to tell if the hero is on a platform', () => {
    assert.equal(game.hero.onPlatform, false);

    game.platformCollision();

    assert.equal(game.hero.onPlatform, true);
  });

  it('should be able to tell if the hero is on a ladder', () => {
    game = new Game(undefined, undefined, keyboarder);
    keyboarder.key.left = true;
    keyboarder.keyState.left = 'enabled';

    assert.equal(game.hero.onLadder, false);

    game.ladderCollision();

    assert.equal(game.hero.onLadder, true);

    game.moveHero();
    game.moveHero();
    game.moveHero();
    game.ladderCollision();

    assert.equal(game.hero.onLadder, false);
  });

  it('should set currentBurger.smushLeft to true when the hero is on the right side of the burger', () => {
    game.hero.x = 535;
    game.hero.y = 150;

    let currentBurger = game.findCurrentBurger()[0];

    assert.equal(currentBurger.smushLeft, false);
    game.squishLeft(currentBurger);

    assert.equal(currentBurger.smushLeft, true);
  });

  it('should set currentBurger.smushRight to true when the hero is on the right side of the burger', () => {
    game.hero.x = 620;
    game.hero.y = 150;

    let currentBurger = game.findCurrentBurger()[0];

    assert.equal(currentBurger.smushRight, false);
    game.squishRight(currentBurger);

    assert.equal(currentBurger.smushRight, true);
  });

  it('should be able to find the next platform', () => {
    game.hero.x = 355;
    game.hero.y = 65;

    let currentPlatform = game.platformCollision();
    let currentBurger = game.findCurrentBurger()[0];

    assert(currentBurger.y, 110)

    currentBurger.smushCount = 2;

    game.burgerCollision();

    assert(currentBurger.y, 250)
  });

  it('should be able to drop the burger to the next level if not on platform 8', () => {
    game.hero.x = 355;
    game.hero.y = 65;

    let currentPlatform = game.platformCollision();
    let currentBurger = game.findCurrentBurger()[0];


  });

  it('should be able to drop the burger to the plate if on platform 8', () => {
    game.hero.x = 750;
    game.hero.y = 370;

    let currentBurger = game.findCurrentBurger()[0];

    assert.equal(currentBurger.y, 415)
    
    currentBurger.smushLeft = true;
    currentBurger.smushRight = true;
    currentBurger.smushCount = 2;

    game.dropBurgerToPlate(currentBurger);
    
    assert.equal(currentBurger.y, 665)
  });

  it('should be able reset smush properties', () => {
    game.hero.x = 600;
    game.hero.y = 150;

    let currentBurger = game.findCurrentBurger()[0];

    game.resetSmushCounts(currentBurger)

    assert.equal(currentBurger.smushLeft, false);
    assert.equal(currentBurger.smushRight, false);
    assert.equal(currentBurger.smushCount, 0);

    currentBurger.smushLeft = true;
    currentBurger.smushRight = true;
    currentBurger.smushCount = 2;

    assert.equal(currentBurger.smushLeft, true);
    assert.equal(currentBurger.smushRight, true);
    assert.equal(currentBurger.smushCount, 2);

    game.resetSmushCounts(currentBurger);

    assert.equal(currentBurger.smushLeft, false);
    assert.equal(currentBurger.smushRight, false);
    assert.equal(currentBurger.smushCount, 0);
  });

  it('should be able to create the burgers for Level 1', () => {
    assert.equal(game.burgerLayers[2].x, 535);
    assert.equal(game.burgerLayers[2].y, 110);
    assert.equal(game.burgerLayers[3].w, 125);
    assert.equal(game.burgerLayers[4].h, 15);
    assert.equal(game.burgerLayers[1].layer, 'top');
    assert.equal(game.burgerLayers.length, 16);
  });

  it('should be able to create the ladders for Level 1', () => {
    assert.equal(game.ladders[1].x, 65);
    assert.equal(game.ladders[3].y, 325);
    assert.equal(game.ladders[3].w, 30);
    assert.equal(game.ladders[4].h, 100);
    assert.equal(game.ladders.length, 31);
  });

  it('should be able to create the platforms for Level 1', () => {
    assert.equal(game.platforms[6].x, 265);
    assert.equal(game.platforms[4].y, 315);
    assert.equal(game.platforms[2].w, 490);
    assert.equal(game.platforms[8].h, 10);
    assert.equal(game.platforms.length, 10);
  });

  it('should be able to create the plates for Level 1', () => {
    assert.equal(game.platesOnBottom[1].x, 330);
    assert.equal(game.platesOnBottom[3].y, 675);
    assert.equal(game.platesOnBottom[2].w, 135);
    assert.equal(game.platesOnBottom[0].h, 5);
    assert.equal(game.platesOnBottom.length, 4);
  });
})