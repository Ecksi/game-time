class Ladders {
  constructor(ctx) {
    let width = 30;

    this.ctx = ctx;
    this.ladders = [
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
    ];
  }

  draw() {
    this.ctx.fillStyle = '#5dc8ed';
    this.ladders.forEach(ladder => {
      for (let i = 0; i < ladder.h; i += 8) {
        this.c
        this.ctx.fillRect(ladder.x, ladder.y + i, ladder.w, 2);
      }
    })
  }
}


    // this.ladders.forEach(ladder => {
    //   const ladderImage = new Image();
    //   ladderImage.src = '../resources/ladder-step.png';
    //   console.log(this.ctx)
    //   var pat = this.ctx.createPattern(ladderImage, "repeat");
    //   this.ctx.rect(ladder.x, ladder.y, ladder.w, ladder.h);
    //   this.ctx.fillStyle = pat;
    //   this.ctx.fill();
    // });


module.exports = Ladders;