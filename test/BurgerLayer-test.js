const { assert } = require('chai');
const Burger = require('../lib/BurgerLayer')

describe('Burger', () => {
  let burger1;
  let burger2;
  let burger3;
  let burger4;

  beforeEach(() => {
    burger1 = new Burger(55, 75, 'top');
    burger2 = new Burger(350, 280, 'lettuce');
    burger3 = new Burger(525, 130, 'patty');
    burger4 = new Burger(780, 420, 'bottom');
  })

  it('Burger class should be a function', () => {
    assert.isFunction(Burger);
  })

  it('a new burger should be an object', () => {
    assert.isObject(burger1);
  })

  it('should have the same x coord as the x argument', () => {
    assert.equal(burger1.x, 55);
  })

  it('should have a width of 125px', () => {
    assert.equal(burger2.w, 125);
  })

  it('should have a height of 15px', () => {
    assert.equal(burger3.h, 15);
  })

  it('should start with a smushLeft count of 0', () => {
    assert.equal(burger2.smushLeft, 0);
  })

  it('should start with a smushRight count of 0', () => {
    assert.equal(burger3.smushRight, 0);
  })

  it('should start with a smushCount count of 0', () => {
    assert.equal(burger4.smushCount, 0);
  })

  it('should be able to have a  type of top', () => {
    assert.equal(burger1.layer, 'top');
  })

  it('should be able to have a  type of lettuce', () => {
    assert.equal(burger2.layer, 'lettuce');
  })

  it('should be able to have a  type of patty', () => {
    assert.equal(burger3.layer, 'patty');
  })

  it('should be able to have a  type of bottom', () => {
    assert.equal(burger4.layer, 'bottom');
  })
});