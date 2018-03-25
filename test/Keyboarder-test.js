const { assert } = require('chai');
const Keyboarder = require('../lib/Keyboarder');

describe('Keyboarder', () => {
  let keyboarder;

  beforeEach(() => {
    keyboarder = new Keyboarder();
  });

  it('Keyboarder class should be a function', () => {
    assert.isFunction(Keyboarder);
  })

  it('should be an object', () => {
    assert.isObject(keyboarder);
  })

  it('should have keys disabled by default', () => {
    assert.equal(keyboarder.key.left, false);
    assert.equal(keyboarder.key.right, false);
    assert.equal(keyboarder.key.up, false);
    assert.equal(keyboarder.key.down, false);
  })
})