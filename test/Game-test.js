const { assert } = require('chai');
const Game = require('../lib/Game.js');

require('locus');

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

  it('should be able to create the burgers for Level 1', () => {
    assert.equal(game.burgerLayers[2].x, 535);
    assert.equal(game.burgerLayers[2].y, 110);
    assert.equal(game.burgerLayers[3].w, 125);
    assert.equal(game.burgerLayers[4].h, 15);
    assert.equal(game.burgerLayers[1].layer, 'top');
    assert.equal(game.burgerLayers.length, 16);
  })

  it('should be able to create the ladders for Level 1', () => {
    assert.equal(game.ladders[1].x, 65);
    assert.equal(game.ladders[3].y, 325);
    assert.equal(game.ladders[3].w, 30);
    assert.equal(game.ladders[4].h, 100);
    assert.equal(game.ladders.length, 31);
  })

  it('should be able to create the platforms for Level 1', () => {
    assert.equal(game.platforms[6].x, 265);
    assert.equal(game.platforms[4].y, 315);
    assert.equal(game.platforms[2].w, 490);
    assert.equal(game.platforms[8].h, 10);
    assert.equal(game.platforms.length, 10);
  })

  it('should be able to create the plates for Level 1', () => {
    assert.equal(game.platesOnBottom[1].x, 330);
    assert.equal(game.platesOnBottom[3].y, 675);
    assert.equal(game.platesOnBottom[2].w, 135);
    assert.equal(game.platesOnBottom[0].h, 5);
    assert.equal(game.platesOnBottom.length, 4);
  })
})