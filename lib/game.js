class Game {
  constructor(ctx) {
    drawPlates(ctx);
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
  var drawPlate = plates.map(plate => {
    ctx.fillRect(plate.x, plate.y, plate.w, plate.h);
  });

  drawPlate();
}

module.exports = Game;