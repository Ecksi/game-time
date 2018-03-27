const { assert } = require('chai');
const Plate = require('../lib/Plate')

describe('Plate', () => {
  let plate1;
  let plate2;
  let plate3;
  let plate4;

  beforeEach(() => {
    plate1 = new Plate(123);
    plate2 = new Plate(456);
    plate3 = new Plate(789);
    plate4 = new Plate(675);
  })

  it('Plate class should be a function', () => {
    assert.isFunction(Plate);
  })

  it('a new plate should be an object', () => {
    assert.isObject(plate1);
  })

  it('should have the same x coord as the x argument', () => {
    assert.equal(plate4.x, 675);
  })

  it('should have a default y position of 675', () => {
    assert.equal(plate1.y, 675)
  })

  it('should have a default width of 135', () => {
    assert.equal(plate3.w, 135)
  })

  it('should have a default height of 5', () => {
    assert.equal(plate2.h, 5)
  })

  it('should start with a plate count of 0', () => {
    assert.equal(plate3.plateCount, 0)
  })
});