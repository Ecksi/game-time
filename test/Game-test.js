const { assert } = require('chai');
const Game = require('../lib/Game.js');

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  it('Game class should be a function', () => {
    assert.isFunction(Game);
  })

  it('should be an object', () => {
    assert.isObject(game);
  })

  it('should start with a timer set at 31', () => {
    assert.equal(game.timer, 31)
  })

  it('should start with a gameNumber of 1', () => {
    assert.equal(game.gameNumber, 1)
  })

  it('should be able to create a new hero object', () => {
    assert.equal(typeof game.hero, 'object')
  })

  it('should be able to create a new ladder object', () => {
    assert.equal(typeof game.ladder, 'object')
  })

  it('should be able to create a new platform object', () => {
    assert.equal(typeof game.platform, 'object')
  })

  it('should be able to create a new burgerLayer object', () => {
    assert.equal(typeof game.burgerLayers, 'object')
  })

  it('should be able to create a new plate object', () => {
    assert.equal(typeof game.plates, 'object')
  })

  it('should be able to create a new text object', () => {
    assert.equal(typeof game.text, 'object')
  })
})