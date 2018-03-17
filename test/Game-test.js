const { assert } = require('chai');
const Game = require('../lib/Game.js');

describe('Game', () => {
  let game;

  beforeEach(function () {
    game = new Game();
  });

  it('should return true', function () {
    assert.equal(true, true);
  })

  it('is a class', function () {
    assert.isFunction(Game);
  })

  it('should be an object', function () {
    assert.isObject(game);
  })
})