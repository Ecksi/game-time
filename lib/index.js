// var Game = require('./game.js');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var rightPressed = false;
var leftPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
 if (e.keyCode === 39) {
   rightPressed = true;
 } else if (e.keyCode === 37) {
   leftPressed = true;
 };
}

function keyUpHandler(e) {
 if (e.keyCode === 39) {
   rightPressed = false;
 } else if (e.keyCode === 37) {
   leftPressed = false;
 }
};

var heroX = 475;
var heroY = 525;

function drawText() {
  //player
  ctx.font = "20px Arial";
  ctx.fillStyle = "#f00";
  ctx.fillText("Player", 65, 50);

  //score
  ctx.fillText("Score:", 270, 50);

  //high score
  ctx.fillText("Hi-Score:", 470, 50);

  //lives
  ctx.fillStyle = "#fff";
  ctx.fillText("Lives:", 850, 50);
}

// plates
function drawPlates() {
  ctx.fillStyle = '#ddd';
  ctx.fillRect(130, 675, 130, 5);
  ctx.fillRect(335, 675, 130, 5);
  ctx.fillRect(540, 675, 130, 5);
  ctx.fillRect(745, 675, 130, 5);
}

//platforms
function drawPlatforms() {
  ctx.fillStyle = '#00fff6';
  ctx.fillRect(60, 580, 870, 10);
  ctx.fillRect(60, 480, 660, 10);
  ctx.fillRect(680, 425, 260, 10);
  ctx.fillRect(265, 370, 460, 10);
  ctx.fillRect(65, 315, 255, 10);
  ctx.fillRect(680, 315, 255, 10);
  ctx.fillRect(265, 260, 255, 10);
  ctx.fillRect(60, 205, 255, 10);
  ctx.fillRect(470, 205, 460, 10);
  ctx.fillRect(60, 120, 870, 10);
}

//ladders
function drawLadders() {
  ctx.fillStyle = '#dddddd';
  ctx.fillRect(65, 490, 30, 90);
  ctx.fillRect(65, 325, 30, 155);
  ctx.fillRect(65, 130, 30, 75);
  ctx.fillRect(175, 325, 30, 155);
  ctx.fillRect(175, 215, 30, 100);
  ctx.fillRect(285, 490, 30, 90);
  ctx.fillRect(285, 380, 30, 100);
  ctx.fillRect(285, 325, 30, 45);
  ctx.fillRect(285, 270, 30, 45);
  ctx.fillRect(285, 215, 30, 45);
  ctx.fillRect(285, 215, 30, 45);
  ctx.fillRect(285, 130, 30, 75);
  ctx.fillRect(385, 130, 30, 130);
  ctx.fillRect(480, 490, 30, 90);
  ctx.fillRect(480, 380, 30, 100);
  ctx.fillRect(480, 270, 30, 100);
  ctx.fillRect(480, 215, 30, 45);
  ctx.fillRect(480, 130, 30, 75);
  ctx.fillRect(590, 215, 30, 155);
  ctx.fillRect(685, 490, 30, 90);
  ctx.fillRect(685, 435, 30, 45);
  ctx.fillRect(685, 380, 30, 45);
  ctx.fillRect(685, 325, 30, 45);
  ctx.fillRect(685, 215, 30, 100);
  ctx.fillRect(685, 130, 30, 75);
  ctx.fillRect(800, 435, 30, 145);
  ctx.fillRect(800, 325, 30, 100);
  ctx.fillRect(900, 435, 30, 145);
  ctx.fillRect(900, 325, 30, 100);
  ctx.fillRect(900, 215, 30, 100);
  ctx.fillRect(900, 130, 30, 75);
}

//burger layers
function drawBurgerLayers() {
  ctx.fillStyle = '#ffae00';
  ctx.fillRect(125, 570, 125, 15);
  ctx.fillRect(125, 470, 125, 15);
  ctx.fillRect(125, 305, 125, 15);
  ctx.fillRect(125, 195, 125, 15);
  ctx.fillRect(335, 570, 125, 15);
  ctx.fillRect(335, 470, 125, 15);
  ctx.fillRect(335, 360, 125, 15);
  ctx.fillRect(335, 110, 125, 15);
  ctx.fillRect(535, 570, 125, 15);
  ctx.fillRect(535, 360, 125, 15);
  ctx.fillRect(535, 195, 125, 15);
  ctx.fillRect(535, 110, 125, 15);
  ctx.fillRect(750, 415, 125, 15);
  ctx.fillRect(750, 305, 125, 15);
  ctx.fillRect(750, 195, 125, 15);
  ctx.fillRect(750, 110, 125, 15);
}

//hero
function drawHero() {
  ctx.fillStyle = '#9a00fc';
  ctx.fillRect(heroX, heroY, 40, 55);
}

//enemy
function drawEnemy() {
  ctx.fillStyle = '#bb0077';
  ctx.fillRect(0, 65, 40, 55);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawText();
  drawPlatforms();
  drawLadders();
  drawBurgerLayers();
  drawHero();
  drawEnemy();

  if (rightPressed) {
    heroX++;
  } else if (leftPressed) {
    heroX--;
  }

  window.requestAnimationFrame(draw);
}

draw();


