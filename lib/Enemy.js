class Enemy {
  constructor(ctx) {
    let enemyX = 0;
    let enemyY = 65;

    ctx.fillStyle = '#bb0077';
    ctx.fillRect(enemyX, enemyY, 40, 55);
  }
}

module.exports = Enemy;
