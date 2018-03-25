const { assert } = require('chai');
const level1 = require('../lib/Level1');

require('locus');


describe('level1', () => {
  it('should be able to create the burgers for Level 1', () => {
    assert.equal(level1[0].burgers[2].x, 535);
    assert.equal(level1[0].burgers[2].y, 110);
    assert.equal(level1[0].burgers[3].w, 125);
    assert.equal(level1[0].burgers[4].h, 15);
    assert.equal(level1[0].burgers[1].layer, 'top');
    assert.equal(level1[0].burgers.length, 16);
  })

  it('should be able to create the ladders for Level 1', () => {
    assert.equal(level1[1].ladders[1].x, 65);
    assert.equal(level1[1].ladders[3].y, 325);
    assert.equal(level1[1].ladders[3].w, 30);
    assert.equal(level1[1].ladders[4].h, 100);
    assert.equal(level1[1].ladders.length, 31);
  })

  it('should be able to create the platforms for Level 1', () => {
    assert.equal(level1[2].platforms[6].x, 265);
    assert.equal(level1[2].platforms[4].y, 315);
    assert.equal(level1[2].platforms[2].w, 490);
    assert.equal(level1[2].platforms[8].h, 10);
    assert.equal(level1[2].platforms.length, 10);
  })

  it('should be able to create the plates for Level 1', () => {
    assert.equal(level1[3].plates[1].x, 330);
    assert.equal(level1[3].plates[3].y, 675);
    assert.equal(level1[3].plates[2].w, 135);
    assert.equal(level1[3].plates[0].h, 5);
    assert.equal(level1[3].plates.length, 4);
  })
})