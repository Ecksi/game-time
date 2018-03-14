// var Game = require('./game.js');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// plates
ctx.fillStyle = '#ddd';
ctx.fillRect(130, 675, 130, 5);
ctx.fillRect(335, 675, 130, 5);
ctx.fillRect(540, 675, 130, 5);
ctx.fillRect(745, 675, 130, 5);

//platforms
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




