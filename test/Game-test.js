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

  it('should be able to tell what burger the hero is on', () => {
    game = new Game(undefined, undefined, keyboarder);
    
    game.hero.x = 600;
    game.hero.y = 150;

    assert.equal(game.findCurrentBurger().length, 1)
  });

  it('should be able reset smush properties', () => {
    game = new Game(undefined, undefined, keyboarder);

    game.hero.x = 600;
    game.hero.y = 150;

    let currentBurger = game.findCurrentBurger();

    assert.equal(currentBurger[0].smushLeft, false);
    assert.equal(currentBurger[0].smushRight, false);
    assert.equal(currentBurger[0].smushCount, 0);

    currentBurger[0].smushLeft = true;
    currentBurger[0].smushRight = true;
    currentBurger[0].smushCount = 2;

    assert.equal(currentBurger[0].smushLeft, true);
    assert.equal(currentBurger[0].smushRight, true);
    assert.equal(currentBurger[0].smushCount, 2);

    game.resetSmushCounts(currentBurger[0]);

    assert.equal(currentBurger[0].smushLeft, false);
    assert.equal(currentBurger[0].smushRight, false);
    assert.equal(currentBurger[0].smushCount, 0);
  });
})