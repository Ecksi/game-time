const { assert } = require('chai');
const Platform = require('../lib/Platform.js')

describe('Platform', () => {
  let platform1;
  let platform2;
  let platform3;
  let platform4;

  beforeEach(() => {
    platform1 = new Platform(55, 105, 900, 1);
    platform2 = new Platform(200, 300, 400, 5);
    platform3 = new Platform(670, 425, 700, 7);
    platform4 = new Platform(15, 270, 115, 8);
  })

  it('Platform class should be a function', () => {
    assert.isFunction(Platform);
  })

  it('a new platform should be an object', () => {
    assert.isObject(platform3);
  })

  it('should have the same x coord as the x argument', () => {
    assert.equal(platform1.x, 55);
  })

  it('should have the same y coord as the y argument', () => {
    assert.equal(platform2.y, 300);
  })

  it('should have the same width as the w argument', () => {
    assert.equal(platform3.w, 700);
  })

  it('should have the same level coord as the l argument', () => {
    assert.equal(platform4.l, 8);
  })

  it('should have a default height of 10', () => {
    assert.equal(platform4.h, 10);
  })
});