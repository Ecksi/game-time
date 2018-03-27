const { assert } = require('chai');
const Game = require('../lib/Game');

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
  })

  it('should be an object', () => {
    assert.isObject(game);
  })

  it('should start with a score of 0', () => {
    assert.equal(game.score, 0);
  })

  it('should start with a timer set at 31', () => {
    assert.equal(game.timer, 51);
  })

  it('should decrement the counter as the game goes on', () => {
    game.gameTimer();
    game.gameTimer();
    game.gameTimer();
    game.gameTimer();
    game.gameTimer();

    assert.equal(game.timer, 50.925);
  })

  it('should start with a gameNumber of 1', () => {
    assert.equal(game.gameNumber, 1);
  })

  it('should be able to create a new hero object', () => {
    assert.equal(typeof game.hero, 'object');
  })

  it('should be able to create a new ladder object', () => {
    assert.equal(typeof game.ladder, 'object');
  })

  it('should be able to create a new platform object', () => {
    assert.equal(typeof game.platform, 'object');
  })

  it('should be able to create a new burgerLayer object', () => {
    assert.equal(typeof game.burgerLayers, 'object');
  })

  it('should be able to create a new plate object', () => {
    assert.equal(typeof game.plates, 'object');
  })

  it('should be able to create a new text object', () => {
    assert.equal(typeof game.text, 'object');
  })

  it('it should be able to the move to the right', () => {
    game = new Game(undefined, undefined, keyboarder);
    keyboarder.key.right = true;
    keyboarder.keyState.right = 'enabled';

    assert.equal(game.hero.x, originalHeroXPosition)
    game.moveHero();

    assert.equal(game.hero.x, originalHeroXPosition + 2.5)
  })

  it('it should be able to the move to the left', () => {
    game = new Game(undefined, undefined, keyboarder);
    keyboarder.key.left = true;
    keyboarder.keyState.left = 'enabled';

    assert.equal(game.hero.x, originalHeroXPosition)
    game.moveHero();

    assert.equal(game.hero.x, originalHeroXPosition - 2.5)
  })

  it('it should be able to the move to the down', () => {
    game = new Game(undefined, undefined, keyboarder);
    keyboarder.key.down = true;
    keyboarder.keyState.down = 'enabled';

    assert.equal(game.hero.y, originalHeroYPosition)
    game.moveHero();

    assert.equal(game.hero.y, originalHeroYPosition + 2.5)
  })

  it('it should be able to the move to the up', () => {
    game = new Game(undefined, undefined, keyboarder);
    keyboarder.key.up = true;
    keyboarder.keyState.up = 'enabled';

    assert.equal(game.hero.y, originalHeroYPosition)
    game.moveHero();

    assert.equal(game.hero.y, originalHeroYPosition - 2.5)
  })
})