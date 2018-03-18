const { assert } = require('chai');
const Keyboarder = require('../lib/Keyboarder.js');

describe('Keyboarder', () => {
  let keyboarder;

  beforeEach(function () {
    keyboarder = new Keyboarder();
  });

  it('should return true', function () {
    assert.equal(true, true);
  })

  it('Keyboarder class should be a function', function () {
    assert.isFunction(Keyboarder);
  })

  it('should be an object', function () {
    assert.isObject(keyboarder);
  })
})