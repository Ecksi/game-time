const { assert } = require('chai');
const BurgerLayer = require('../lib/BurgerLayer.js')

describe('BurgerLayer', () => {
  let burgerLayer;

  beforeEach(() => {
    burgerLayer = new BurgerLayer();
  })

  it('BurgerLayer class should be a function', () => {
    assert.isFunction(BurgerLayer);
  })

  it('a new burgerLayer should be an object', () => {
    assert.isObject(burgerLayer);
  })

  it('should draw a burgerLayer when instantiated', () => {
    assert.equal(burgerLayer.burgerLayers[0].x, 125);
    assert.equal(burgerLayer.burgerLayers[0].y, 195);
  })

  it('should have a width of 125px', () => {
    assert.equal(burgerLayer.burgerLayers[0].w, 125);
  })

  it('should have a height of 15px', () => {
    assert.equal(burgerLayer.burgerLayers[0].h, 15);
  })

  it('should start with 16 burgerLayers', () => {
    assert.equal(burgerLayer.burgerLayers.length, 16)
  })

  it('should start with a smushLeft count of 0', () => {
    assert.equal(burgerLayer.burgerLayers[8].smushLeft, 0)
  })

  it('should start with a smushRight count of 0', () => {
    assert.equal(burgerLayer.burgerLayers[4].smushRight, 0)
  })

  it('should start with a smushCount count of 0', () => {
    assert.equal(burgerLayer.burgerLayers[15].smushCount, 0)
  })

  it('should be able to have a layer type of top', () => {
    assert.equal(burgerLayer.burgerLayers[1].layer, 'top')
  })

  it('should be able to have a layer type of lettuce', () => {
    assert.equal(burgerLayer.burgerLayers[5].layer, 'lettuce')
  })

  it('should be able to have a layer type of patty', () => {
    assert.equal(burgerLayer.burgerLayers[9].layer, 'patty')
  })

  it('should be able to have a layer type of bottom', () => {
    assert.equal(burgerLayer.burgerLayers[14].layer, 'bottom')
  })
});