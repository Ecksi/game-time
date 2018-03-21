class Text {
  constructor() {
  }

  draw(ctx, timer, score) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#f00";
    ctx.fillText(`Player 1`, 65, 50);
    ctx.fillText(`Score: ${score}`, 270, 50);
    ctx.fillStyle = "#fff";
    ctx.fillText('Time:' + parseInt(timer), 850, 50);
  }
}

module.exports = Text;
