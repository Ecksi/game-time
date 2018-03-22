const { assert } = require('chai');
const Ladder = require('../lib/Ladder.js')

describe('Ladder', () => {
  let ladder;

  beforeEach(() => {
    ladder = new Ladder();
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

  it('should start the game with 30 ladders', () => {
    assert.equal(ladder.ladders.length, 30);
  })
})