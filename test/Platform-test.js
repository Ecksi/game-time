const { assert } = require('chai');
const Platform = require('../lib/Platform.js')

describe('Platform', () => {
  let platform;

  beforeEach(() => {
    platform = new Platform();
  })

  it('Platform class should be a function', () => {
    assert.isFunction(Platform);
  })

  it('a new platform should be an object', () => {
    assert.isObject(platform);
  })

  it('should draw a platform when instantiated', () => {
    assert.equal(platform.platforms[0].x, 40);
    assert.equal(platform.platforms[0].y, 120);
    assert.equal(platform.platforms[0].w, 910);
    assert.equal(platform.platforms[0].h, 10);
  })

  it('should start with 10 platforms', () => {
    assert.equal(platform.platforms.length, 10)
  })
});