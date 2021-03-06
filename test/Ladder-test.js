const { assert } = require('chai');
const Ladder = require('../lib/Ladder')

describe('Ladder', () => {
  let ladder1;
  let ladder2;
  let ladder3;

  beforeEach(() => {
    ladder1 = new Ladder(65, 420, 300);
    ladder2 = new Ladder(130, 230, 330);
    ladder3 = new Ladder(200, 540, 210);
  })

  it('Ladder class should be a function', () => {
    assert.isFunction(Ladder);
  })

  it('a new ladder should be an object', () => {
    assert.isObject(ladder1);
  })

  it('should have the same x coord as the x argument', () => {
    assert.equal(ladder2.x, 130);
  })

  it('should have the same y coord as the y argument', () => {
    assert.equal(ladder3.y, 540);
  })
  
  it('should have the same height coord as the h argument', () => {
    assert.equal(ladder1.h, 300);
  })

  it('should have a default width of 30', () => {
    assert.equal(ladder3.w, 30);
  })
})