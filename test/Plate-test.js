const { assert } = require('chai');
const Plate = require('../lib/Plate.js')

describe('Plate', () => {
  let plate;

  beforeEach(() => {
    plate = new Plate();
  })

  it('Plate class should be a function', () => {
    assert.isFunction(Plate);
  })

  it('a new plate should be an object', () => {
    assert.isObject(plate);
  })

  it('should draw a plate when instantiated', () => {
    assert.equal(plate.plates[0].x, 120);
    assert.equal(plate.plates[0].y, 675);
    assert.equal(plate.plates[0].w, 135);
    assert.equal(plate.plates[0].h, 5);
  })

  it('should draw 4 plates', () => {
    assert.equal(plate.plates.length, 4);
  })

  it('should have a default height of 5', () => {
    assert.equal(plate.plates[1].h, 5)
  })

  it('should have a default width of 135', () => {
    assert.equal(plate.plates[2].w, 135)
  })

  it('should have a default y position of 675', () => {
    assert.equal(plate.plates[3].y, 675)
  })

  it('should start with a plate count of 0', () => {
    assert.equal(plate.plateCount, 0)
  })
});