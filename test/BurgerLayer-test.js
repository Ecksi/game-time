const { assert } = require('chai');
const BurgerLayer = require('../lib/BurgerLayer.js')

describe('BurgerLayer', function () {
  let burgerLayer;

  beforeEach(function () {
    burgerLayer = new BurgerLayer();
  })

  it('should exist', () => {
    assert.equal(true, true);
  })

  it('BurgerLayer class should be a function', () => {
    assert.isFunction(BurgerLayer);
  })

  it('a new burgerLayer should be an object', () => {
    assert.isObject(burgerLayer);
  })

  it('should draw a burgerLayer when instantiated', () => {
    assert.equal(burgerLayer.burgerLayers[0].x, 125);
    assert.equal(burgerLayer.burgerLayers[0].y, 570);
  })

  it('should have a width of 125px', () => {
    assert.equal(burgerLayer.burgerLayers[0].w, 125);
  })

  it('should have a height of 15px', () => {
    assert.equal(burgerLayer.burgerLayers[0].h, 15);
  })
});