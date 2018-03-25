const Burger = require('./BurgerLayer');
const Ladder = require('./Ladder');
const Platform = require('./Platform');
const Plates = require('./Plate');

const level1 = [
  {burgers: [
      new Burger(125, 195, 'top'),
      new Burger(335, 110, 'top'),
      new Burger(535, 110, 'top'),
      new Burger(750, 110, 'top'),
      new Burger(125, 305, 'lettuce'),
      new Burger(335, 360, 'lettuce'),
      new Burger(535, 195, 'lettuce'),
      new Burger(750, 195, 'lettuce'),
      new Burger(125, 470, 'patty'),
      new Burger(335, 470, 'patty'),
      new Burger(535, 360, 'patty'),
      new Burger(750, 305, 'patty'),
      new Burger(125, 570, 'bottom'),
      new Burger(335, 570, 'bottom'),
      new Burger(535, 570, 'bottom'),
      new Burger(750, 415, 'bottom')
    ]},
    {ladders: [
      new Ladder(65, 490, 90),
      new Ladder(65, 325, 155),
      new Ladder(65, 130, 75),
      new Ladder(175, 325, 155),
      new Ladder(175, 215, 100),
      new Ladder(285, 490, 90),
      new Ladder(285, 380, 100),
      new Ladder(285, 325, 45),
      new Ladder(285, 270, 45),
      new Ladder(285, 215, 45),
      new Ladder(285, 130, 75),
      new Ladder(385, 130, 130),
      new Ladder(480, 490, 90),
      new Ladder(480, 380, 100),
      new Ladder(480, 270, 100),
      new Ladder(480, 215, 45),
      new Ladder(480, 130, 75),
      new Ladder(590, 130, 75),
      new Ladder(590, 215, 155),
      new Ladder(685, 490, 90),
      new Ladder(685, 435, 45),
      new Ladder(685, 380, 45),
      new Ladder(685, 325, 45),
      new Ladder(685, 215, 100),
      new Ladder(685, 130, 75),
      new Ladder(800, 435, 145),
      new Ladder(800, 325, 100),
      new Ladder(900, 435, 145),
      new Ladder(900, 325, 100),
      new Ladder(900, 215, 100),
      new Ladder(900, 130, 75)        
    ]},
    {platforms: [
      new Platform(40, 120, 910, 1),
      new Platform(40, 205, 295, 2),
      new Platform(460, 205, 490, 2),
      new Platform(265, 260, 265, 3),
      new Platform(40, 315, 295, 4),
      new Platform(670, 315, 280, 4),
      new Platform(265, 370, 470, 5),
      new Platform(670, 425, 280, 6),
      new Platform(40, 480, 700, 7),
      new Platform(40, 580, 910, 8),
    ]}, 
    {plates: [
      new Plates(120),
      new Plates(330),
      new Plates(530),
      new Plates(745)
    ]}  
]

module.exports = level1;
