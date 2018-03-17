const { assert } = require('chai');
const Hero = require('../lib/Hero.js')

describe ('Hero', () => {
  let hero;

  beforeEach(function () {
    hero = new Hero();
  })

  it('Hero class should be a function', () => {
    assert.isFunction(Hero);
  })

  it('a new hero should be an object', () => {
    assert.isObject(hero);
  })

  it('should draw a hero when instantiated', () => {
    assert.equal(hero.x, 475);
    assert.equal(hero.y, 525);
    assert.equal(hero.w, 40);
    assert.equal(hero.h, 55);
  })
})