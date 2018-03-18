const { assert } = require('chai');
const Plate = require('../lib/Plate.js')

describe('Plate', function () {
  let plate;

  beforeEach(function () {
    plate = new Plate();
  })

  it('should exist', () => {
    assert.equal(true, true);
  })

  it('Plate class should be a function', () => {
    assert.isFunction(Plate);
  })

  it('a new plate should be an object', () => {
    assert.isObject(plate);
  })

  it('should draw a plate when instantiated', () => {
    assert.equal(plate.plates[0].x, 60);
    assert.equal(plate.plates[0].y, 120);
    assert.equal(plate.plates[0].w, 880);
    assert.equal(plate.plates[0].h, 10);
  })
});