class Game {
  constructor(ctx) {
    drawPlates(ctx);
    drawPlatforms(ctx);
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

module.exports = Game;