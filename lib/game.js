const Hero = require('./Hero');

class Game {
  constructor(ctx) {
    drawPlates(ctx);
    drawPlatforms(ctx);
    drawLadders(ctx);
    var hero = new Hero(ctx);
 } 
}

function drawPlates(ctx) {
  const width = 130;
  const height = 5;
  const posY = 675;

  var plates = [
    {x: 130, y: posY, w: width, h: height},
    {x: 335, y: posY, w: width, h: height},
    {x: 540, y: posY, w: width, h: height},
    {x: 745, y: posY, w: width, h: height}
  ]

  ctx.fillStyle = '#ddd';
  plates.map(plate => {
    ctx.fillRect(plate.x, plate.y, plate.w, plate.h);
  });
};

function drawPlatforms(ctx) {
  const height = 10;

  var platforms = [
    {x: 60, y: 580, w: 870, h: height},
    {x: 60, y: 480, w: 660, h: height},
    {x: 680, y: 425, w: 260, h: height},
    {x: 265, y: 370, w: 460, h: height},
    {x: 65, y: 315, w: 255, h: height},
    {x: 680, y: 315, w: 255, h: height},
    {x: 265, y: 260, w: 255, h: height},
    {x: 60, y: 205, w: 255, h: height},
    {x: 470, y: 205, w: 460, h: height},
    {x: 60, y: 120, w: 870, h: height}
  ]

  ctx.fillStyle = '#00fff6';
  platforms.map(platform => {
    ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
  });
};

function drawLadders(ctx) {
  const width = 30;

  var ladders = [
    {x: 65, y: 490, w: width, h: 90},
    {x: 65, y: 325, w: width, h: 155},
    {x: 65, y: 130, w: width, h: 75},
    {x: 175, y: 325, w: width, h: 155},
    {x: 175, y: 215, w: width, h: 100},
    {x: 285, y: 490, w: width, h: 90},
    {x: 285, y: 380, w: width, h: 100},
    {x: 285, y: 325, w: width, h: 45},
    {x: 285, y: 270, w: width, h: 45},
    {x: 285, y: 215, w: width, h: 45},
    {x: 285, y: 130, w: width, h: 75},
    {x: 385, y: 130, w: width, h: 130},
    {x: 480, y: 490, w: width, h: 90},
    {x: 480, y: 380, w: width, h: 100},
    {x: 480, y: 270, w: width, h: 100},
    {x: 480, y: 215, w: width, h: 45},
    {x: 480, y: 130, w: width, h: 75},
    {x: 590, y: 215, w: width, h: 155},
    {x: 685, y: 490, w: width, h: 90},
    {x: 685, y: 435, w: width, h: 45},
    {x: 685, y: 380, w: width, h: 45},
    {x: 685, y: 325, w: width, h: 45},
    {x: 685, y: 215, w: width, h: 100},
    {x: 685, y: 130, w: width, h: 75},
    {x: 800, y: 435, w: width, h: 145},
    {x: 800, y: 325, w: width, h: 100},
    {x: 900, y: 435, w: width, h: 145},
    {x: 900, y: 325, w: width, h: 100},
    {x: 900, y: 215, w: width, h: 100},
    {x: 900, y: 130, w: width, h: 75},
  ]

  ctx.fillStyle = '#ddd';
  ladders.map(ladder => {
    ctx.fillRect(ladder.x, ladder.y, ladder.w, ladder.h);
  });
};

module.exports = Game;








