const { assert } = require('chai');
const Ladder = require('../lib/Ladder.js')

describe('Ladder', function () {
  let ladder;

  beforeEach(function () {
    ladder = new Ladder();
  })

  it('should exist', () => {
    assert.equal(true, true);
  })

  it('Ladder class should be a function', () => {
    assert.isFunction(Ladder);
  })

  it('a new ladder should be an object', () => {
    assert.isObject(ladder);
  })

  it('should draw a ladder when instantiated', () => {
    assert.equal(ladder.ladders[0].x, 65);
    assert.equal(ladder.ladders[0].y, 490);
    assert.equal(ladder.ladders[0].w, 30);
    assert.equal(ladder.ladders[0].h, 90);
  })
});