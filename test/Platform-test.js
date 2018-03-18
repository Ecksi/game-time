const { assert } = require('chai');
const Platform = require('../lib/Platform.js')

describe('Platform', function () {
  let platform;

  beforeEach(function () {
    platform = new Platform();
  })

  it('should exist', () => {
    assert.equal(true, true);
  })

  it('Platform class should be a function', () => {
    assert.isFunction(Platform);
  })

  it('a new platform should be an object', () => {
    assert.isObject(platform);
  })

  it('should draw a platform when instantiated', () => {
    assert.equal(platform.platforms[0].x, 60);
    assert.equal(platform.platforms[0].y, 120);
    assert.equal(platform.platforms[0].w, 880);
    assert.equal(platform.platforms[0].h, 10);
  })
});