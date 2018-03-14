const index = require('./index.js');

class Game() {
  constructor(ctx) {

  // plates
  ctx.fillStyle = '#ddd';
  ctx.fillRect(130, 675, 130, 5);
  ctx.fillRect(335, 675, 130, 5);
  ctx.fillRect(540, 675, 130, 5);
  ctx.fillRect(745, 675, 130, 5);

  //platforms
  ctx.fillStyle = '#00fff6';
  ctx.fillRect(60, 585, 870, 10);
  ctx.fillRect(60, 480, 660, 10);
  ctx.fillRect(680, 425, 260, 10);
  ctx.fillRect(265, 370, 460, 10);
  ctx.fillRect(65, 320, 255, 10);
  ctx.fillRect(680, 320, 255, 10);
  ctx.fillRect(265, 270, 255, 10);
  ctx.fillRect(60, 215, 255, 10);

 } 
}


module.exports = Game;

