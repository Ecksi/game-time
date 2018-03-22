const { assert } = require('chai');
const Hero = require('../lib/Hero.js')

describe ('Hero', () => {
  let hero;

  beforeEach(() => {
    hero = new Hero();
  })

  it('Hero class should be a function', () => {
    assert.isFunction(Hero);
  })

  it('a new hero should be an object', () => {
    assert.isObject(hero);
  })

  it('should have a starting x coordinate of 475', () => {
    assert.equal(hero.x, 475);
  })

  it('should have a starting y coordinate of 525', () => {
    assert.equal(hero.y, 525);
  })

  it('should start with a score of 0', () => {
    assert.equal(hero.score, 0)
  })

  it('should have onLadder set to false by default', () => {
    assert.equal(hero.onLadder, false)
  })

  it('should have onPlatform set to false by default', () => {
    assert.equal(hero.onPlatform, false)
  })
})