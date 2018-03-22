const { assert } = require('chai');
const Text = require('../lib/Text.js');

describe('Text', () => {
  let text;

  beforeEach(() => {
    text = new Text();
  });

  it('Text class should be a function', () => {
    assert.isFunction(Text);
  })

  it('should be an object', () => {
    assert.isObject(text);
  })
})