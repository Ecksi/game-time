/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Game = __webpack_require__(1);
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var Keyboarder = __webpack_require__(8);
	var keyboarder = new Keyboarder();
	var game = new Game(ctx, canvas, keyboarder);
	
	document.addEventListener('keydown', keyboarder.keyDownHandler);
	document.addEventListener('keyup', keyboarder.keyUpHandler);
	
	function startGame() {
	  var savedCount = localStorage.getItem('gameNumber');
	  if (savedCount > 1) {
	    game.timer = 26;
	  }
	  game.gameLoop();
	}
	
	startGame();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Hero = __webpack_require__(2);
	// const Enemy = require('./Enemy');
	var Ladder = __webpack_require__(3);
	var Platform = __webpack_require__(4);
	var Plates = __webpack_require__(5);
	var Text = __webpack_require__(6);
	var BurgerLayer = __webpack_require__(7);
	var gameStartSound = new Audio('../resources/gameStart.mp3');
	var gameThemeSound = new Audio('../resources/game_theme.mp3');
	var gameWin = new Audio('../resources/game_win.mp3');
	var gameLose = new Audio('../resources/game_lose.mp3');
	
	gameStartSound.play();
	
	gameThemeSound.loop = true;
	gameThemeSound.play();
	
	var Game = function () {
	  function Game(ctx, canvas, keyboarder) {
	    _classCallCheck(this, Game);
	
	    this.ctx = ctx;
	    this.canvas = canvas;
	    this.keyboarder = keyboarder;
	    this.ladder = new Ladder();
	    this.platform = new Platform();
	    this.burgerLayers = new BurgerLayer();
	    this.plates = new Plates();
	    this.text = new Text();
	    this.timer = 31;
	    this.gameNumber = 1;
	    this.hero = new Hero(this.keyboarder, this.ladder, this.platform, this.burgerLayers, this.plates);
	  }
	
	  _createClass(Game, [{
	    key: 'drawGame',
	    value: function drawGame() {
	      console.log('sdf');
	      this.platform.draw(this.ctx);
	      this.ladder.draw(this.ctx);
	      this.burgerLayers.draw(this.ctx);
	      this.plates.draw(this.ctx);
	      this.text.draw(this.ctx, this.timer, this.hero.score);
	      this.hero.draw(this.ctx);
	    }
	  }, {
	    key: 'gameLoop',
	    value: function gameLoop() {
	      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      this.drawGame();
	      this.hero.onALadder();
	      this.hero.onAPlatform();
	      this.hero.onABurger();
	      this.winGame();
	      this.loseGame();
	      this.gameTimer();
	      this.hero.update();
	      this.gameLoop = this.gameLoop.bind(this);
	      requestAnimationFrame(this.gameLoop);
	    }
	  }, {
	    key: 'gameTimer',
	    value: function gameTimer() {
	      this.timer -= 0.015;
	    }
	  }, {
	    key: 'loseGame',
	    value: function loseGame() {
	      if (this.timer < 0) {
	        this.gameNumber = 0;
	        localStorage.setItem('gameNumber', this.gameNumber);
	        location.reload();
	      }
	    }
	  }, {
	    key: 'winGame',
	    value: function winGame() {
	      if (this.plates.plateCount === 4) {
	        gameThemeSound.pause();
	        gameWin.play();
	        alert("You stack mad burgers yo! Increasing the speed!!!");
	        this.plates.plateCount = 0;
	        this.nextGame();
	      }
	    }
	  }, {
	    key: 'nextGame',
	    value: function nextGame() {
	      this.gameNumber++;
	      localStorage.setItem('gameNumber', this.gameNumber);
	      location.reload();
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var gameBurgerFall = new Audio('../resources/boing.mp3');
	
	var Hero = function () {
	  function Hero(keyboarder, ladder, platform, burgerLayer, plates) {
	    _classCallCheck(this, Hero);
	
	    this.x = 475;
	    this.y = 525;
	    this.onLadder = false;
	    this.onPlatform = false;
	    this.score = 0;
	    this.keyboarder = keyboarder;
	    this.platform = platform;
	    this.ladder = ladder;
	    this.burgerLayer = burgerLayer;
	    this.plates = plates;
	    this.update = this.update.bind(this);
	  }
	
	  _createClass(Hero, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      var heroImage = new Image();
	
	      heroImage.src = '../resources/burgerHero.png';
	      ctx.drawImage(heroImage, this.x, this.y);
	    }
	  }, {
	    key: 'onALadder',
	    value: function onALadder() {
	      var _this = this;
	
	      var currentLadder = this.ladder.ladders.filter(function (i) {
	        return i.x >= _this.x && i.x + 30 <= _this.x + 40 && _this.y + 55 <= i.y + i.h && _this.y >= i.y - 65;
	      });
	
	      if (currentLadder.length > 0) {
	        this.keyboarder.disableLeft();
	        this.keyboarder.disableRight();
	        this.onLadder = true;
	      } else {
	        this.keyboarder.enableLeft();
	        this.keyboarder.enableRight();
	        this.onLadder = false;
	      }
	    }
	  }, {
	    key: 'onAPlatform',
	    value: function onAPlatform() {
	      var _this2 = this;
	
	      var currentPlatform = this.platform.platforms.filter(function (i) {
	        return i.y === _this2.y + 55 && i.x <= _this2.x && _this2.x + 40 <= i.x + i.w;
	      });
	
	      currentPlatform = currentPlatform[0];
	
	      //disable down on bottom platform
	      currentPlatform && currentPlatform.l === 8 ? this.keyboarder.disableDown() : this.keyboarder.enableDown();
	
	      //enable down on top platform & disable up
	      currentPlatform && currentPlatform.l === 1 ? this.keyboarder.disableUp() : this.keyboarder.enableUp();
	
	      //if on platform enable left and right
	      if (currentPlatform && this.x > currentPlatform.x) {
	        this.keyboarder.enableLeft();
	        this.keyboarder.enableRight();
	      }
	
	      // if on left platform disable left
	      if (currentPlatform && this.x === currentPlatform.x) {
	        this.keyboarder.disableLeft();
	      }
	
	      // if on right platform disable right
	      if (currentPlatform && this.x + 40 === currentPlatform.x + currentPlatform.w) {
	        this.keyboarder.disableRight();
	      }
	    }
	  }, {
	    key: 'onABurger',
	    value: function onABurger() {
	      var _this3 = this;
	
	      var currentBurger = this.burgerLayer.burgerLayers.filter(function (i) {
	        return _this3.x >= i.x && _this3.x + 40 <= i.x + i.w && i.y + 10 === _this3.y + 55;
	      });
	      var currentPlatform = this.platform.platforms.filter(function (i) {
	        return i.y === _this3.y + 55 && i.x <= _this3.x && _this3.x + 40 <= i.x + i.w;
	      });
	
	      currentBurger = currentBurger[0];
	      currentPlatform = currentPlatform[0];
	
	      if (currentBurger) {
	        this.squishLeft(currentBurger);
	        this.squishRight(currentBurger);
	        if (currentBurger.smushCount === 2 && currentPlatform.l !== 8) {
	          this.dropBurger(currentBurger, currentPlatform);
	        } else if (currentBurger.smushCount === 2 && currentPlatform.l === 8) {
	          this.dropBurgerToPlate(currentBurger, currentPlatform);
	        }
	      }
	    }
	  }, {
	    key: 'squishLeft',
	    value: function squishLeft(currentBurger) {
	      // Left squish - increase smush count and smush left count to 1
	      if (this.x === currentBurger.x && currentBurger.smushLeft === 0) {
	        currentBurger.smushLeft = 1;
	        currentBurger.smushCount++;
	        this.score += 250;
	      }
	    }
	  }, {
	    key: 'squishRight',
	    value: function squishRight(currentBurger) {
	      // Right squish - increase smush count and smush left count to 1
	      if (this.x + 40 === currentBurger.x + currentBurger.w && currentBurger.smushRight === 0) {
	        currentBurger.smushRight = 1;
	        currentBurger.smushCount++;
	        this.score += 250;
	      }
	    }
	  }, {
	    key: 'dropBurger',
	    value: function dropBurger(currentBurger, currentPlatform) {
	      var nextPlatform = this.findNextPlatform(currentBurger, currentPlatform);
	      var burgerOnNextPlatform = this.findNextBurger(currentBurger, nextPlatform);
	
	      currentBurger.y = nextPlatform.y - 10;
	      this.resetSmushCounts(currentBurger);
	
	      if (burgerOnNextPlatform && nextPlatform.l !== 8) {
	        this.dropBurger(burgerOnNextPlatform, nextPlatform);
	      } else if (burgerOnNextPlatform && nextPlatform.l === 8) {
	        this.dropBurgerToPlate(burgerOnNextPlatform, currentPlatform);
	      }
	    }
	  }, {
	    key: 'findNextBurger',
	    value: function findNextBurger(currentBurger, nextPlatform) {
	      gameBurgerFall.play();
	      return this.burgerLayer.burgerLayers.find(function (i) {
	        return i.y + i.h < nextPlatform.y + nextPlatform.h && nextPlatform.y < i.y + i.h && i.x === currentBurger.x;
	      });
	    }
	  }, {
	    key: 'findNextPlatform',
	    value: function findNextPlatform(currentBurger, currentPlatform) {
	      return this.platform.platforms.find(function (i) {
	        return currentBurger.x > i.x && i.x + i.w > currentBurger.x && i.l > currentPlatform.l;
	      });
	    }
	  }, {
	    key: 'resetSmushCounts',
	    value: function resetSmushCounts(currentBurger) {
	      currentBurger.smushRight = 0;
	      currentBurger.smushLeft = 0;
	      currentBurger.smushCount = 0;
	    }
	  }, {
	    key: 'dropBurgerToPlate',
	    value: function dropBurgerToPlate(currentBurger) {
	      var currentPlate = this.plates.plates.filter(function (i) {
	        return currentBurger.x === i.x + 5;
	      });
	      var currentPlateCount = currentPlate[0].count;
	
	      gameBurgerFall.play();
	      currentBurger.y = currentPlate[0].y - 10 - 20 * currentPlateCount;
	      currentPlate[0].count++;
	      this.score += 1000;
	      this.plates.plateCount++;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      if (this.keyboarder.isDown('right') && !this.keyboarder.rightDisabled) {
	        this.x += 5;
	      } else if (this.keyboarder.isDown('left') && !this.keyboarder.leftDisabled) {
	        this.x -= 5;
	      } else if (this.keyboarder.isDown('up') && this.onLadder && !this.keyboarder.upDisabled) {
	        this.y -= 5;
	      } else if (this.keyboarder.isDown('down') && this.onLadder && !this.keyboarder.downDisabled) {
	        this.y += 5;
	      }
	    }
	  }]);
	
	  return Hero;
	}();
	
	module.exports = Hero;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ladders = function () {
	  function Ladders() {
	    _classCallCheck(this, Ladders);
	
	    var width = 30;
	
	    this.ladders = [{ x: 65, y: 490, w: width, h: 90 }, { x: 65, y: 325, w: width, h: 155 }, { x: 65, y: 130, w: width, h: 75 }, { x: 175, y: 325, w: width, h: 155 }, { x: 175, y: 215, w: width, h: 100 }, { x: 285, y: 490, w: width, h: 90 }, { x: 285, y: 380, w: width, h: 100 }, { x: 285, y: 325, w: width, h: 45 }, { x: 285, y: 270, w: width, h: 45 }, { x: 285, y: 215, w: width, h: 45 }, { x: 285, y: 130, w: width, h: 75 }, { x: 385, y: 130, w: width, h: 130 }, { x: 480, y: 490, w: width, h: 90 }, { x: 480, y: 380, w: width, h: 100 }, { x: 480, y: 270, w: width, h: 100 }, { x: 480, y: 215, w: width, h: 45 }, { x: 480, y: 130, w: width, h: 75 }, { x: 590, y: 215, w: width, h: 155 }, { x: 685, y: 490, w: width, h: 90 }, { x: 685, y: 435, w: width, h: 45 }, { x: 685, y: 380, w: width, h: 45 }, { x: 685, y: 325, w: width, h: 45 }, { x: 685, y: 215, w: width, h: 100 }, { x: 685, y: 130, w: width, h: 75 }, { x: 800, y: 435, w: width, h: 145 }, { x: 800, y: 325, w: width, h: 100 }, { x: 900, y: 435, w: width, h: 145 }, { x: 900, y: 325, w: width, h: 100 }, { x: 900, y: 215, w: width, h: 100 }, { x: 900, y: 130, w: width, h: 75 }];
	  }
	
	  _createClass(Ladders, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = '#5dc8ed';
	      this.ladders.forEach(function (ladder) {
	        for (var i = 0; i < ladder.h; i += 8) {
	          ctx.fillRect(ladder.x, ladder.y + i, ladder.w, 2);
	        }
	      });
	    }
	  }]);
	
	  return Ladders;
	}();
	
	module.exports = Ladders;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Platforms = function () {
	  function Platforms() {
	    _classCallCheck(this, Platforms);
	
	    var height = 10;
	
	    this.platforms = [
	    //top level
	    { x: 40, y: 120, w: 910, h: height, l: 1 },
	    //second level
	    { x: 40, y: 205, w: 295, h: height, l: 2 }, { x: 460, y: 205, w: 490, h: height, l: 2 },
	    //third level
	    { x: 265, y: 260, w: 265, h: height, l: 3 },
	    //fourth level
	    { x: 40, y: 315, w: 295, h: height, l: 4 }, { x: 670, y: 315, w: 280, h: height, l: 4 },
	    //fifth level
	    { x: 265, y: 370, w: 470, h: height, l: 5 },
	    //sixth level
	    { x: 670, y: 425, w: 280, h: height, l: 6 },
	    //sevent level
	    { x: 40, y: 480, w: 700, h: height, l: 7 },
	    //eighth level
	    { x: 40, y: 580, w: 910, h: height, l: 8 }];
	  }
	
	  _createClass(Platforms, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = '#fc9838';
	      this.platforms.map(function (platform) {
	        ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
	      });
	    }
	  }]);
	
	  return Platforms;
	}();
	
	module.exports = Platforms;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Plates = function () {
	  function Plates() {
	    _classCallCheck(this, Plates);
	
	    var width = 135;
	    var height = 5;
	    var posY = 675;
	
	    this.plateCount = 0;
	    this.plates = [{ x: 120, y: posY, w: width, h: height, count: 0 }, { x: 330, y: posY, w: width, h: height, count: 0 }, { x: 530, y: posY, w: width, h: height, count: 0 }, { x: 745, y: posY, w: width, h: height, count: 0 }];
	  }
	
	  _createClass(Plates, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = '#ddd';
	      this.plates.map(function (plate) {
	        ctx.fillRect(plate.x, plate.y, plate.w, plate.h);
	      });
	    }
	  }]);
	
	  return Plates;
	}();
	
	module.exports = Plates;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Text = function () {
	  function Text() {
	    _classCallCheck(this, Text);
	  }
	
	  _createClass(Text, [{
	    key: "draw",
	    value: function draw(ctx, timer, score) {
	      ctx.font = "20px Arial";
	      ctx.fillStyle = "#f00";
	      ctx.fillText("Player 1", 65, 50);
	      ctx.fillText("Score: " + score, 270, 50);
	      ctx.fillStyle = "#fff";
	      ctx.fillText('Time:' + parseInt(timer), 850, 50);
	    }
	  }]);
	
	  return Text;
	}();
	
	module.exports = Text;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BurgerLayer = function () {
	  function BurgerLayer() {
	    _classCallCheck(this, BurgerLayer);
	
	    this.smushCount = 0;
	    var width = 125;
	    var height = 15;
	
	    this.burgerLayers = [{ x: 125, y: 195, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'top' }, { x: 335, y: 110, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'top' }, { x: 535, y: 110, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'top' }, { x: 750, y: 110, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'top' }, { x: 125, y: 305, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'lettuce' }, { x: 335, y: 360, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'lettuce' }, { x: 535, y: 195, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'lettuce' }, { x: 750, y: 195, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'lettuce' }, { x: 125, y: 470, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'patty' }, { x: 335, y: 470, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'patty' }, { x: 535, y: 360, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'patty' }, { x: 750, y: 305, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'patty' }, { x: 125, y: 570, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'bottom' }, { x: 335, y: 570, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'bottom' }, { x: 535, y: 570, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'bottom' }, { x: 750, y: 415, w: width, h: height,
	      smushLeft: 0, smushRight: 0, smushCount: 0, layer: 'bottom' }];
	  }
	
	  _createClass(BurgerLayer, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      this.burgerLayers.forEach(function (burgerLayer) {
	        if (burgerLayer.layer === 'top') {
	          var burgerTopImage = new Image();
	
	          burgerTopImage.src = '../resources/burger_top.png';
	          ctx.drawImage(burgerTopImage, burgerLayer.x, burgerLayer.y);
	        } else if (burgerLayer.layer === 'lettuce') {
	          var burgerLettuceImage = new Image();
	
	          burgerLettuceImage.src = '../resources/burger_lettuce.png';
	          ctx.drawImage(burgerLettuceImage, burgerLayer.x, burgerLayer.y);
	        } else if (burgerLayer.layer === 'patty') {
	          var burgerPattyImage = new Image();
	
	          burgerPattyImage.src = '../resources/burger_patty.png';
	          ctx.drawImage(burgerPattyImage, burgerLayer.x, burgerLayer.y);
	        } else if (burgerLayer.layer === 'bottom') {
	          var burgerBottomImage = new Image();
	
	          burgerBottomImage.src = '../resources/burger_bottom.png';
	          ctx.drawImage(burgerBottomImage, burgerLayer.x, burgerLayer.y);
	        }
	      });
	    }
	  }]);
	
	  return BurgerLayer;
	}();
	
	module.exports = BurgerLayer;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Keyboarder = function () {
	  function Keyboarder() {
	    _classCallCheck(this, Keyboarder);
	
	    this.key = {
	      left: false,
	      right: false,
	      up: false,
	      down: false
	    };
	    this.leftDisabled;
	    this.rightDisabled;
	    this.upDisabled;
	    this.downDisabled;
	    this.keyDownHandler = this.keyDownHandler.bind(this);
	    this.keyUpHandler = this.keyUpHandler.bind(this);
	  }
	
	  _createClass(Keyboarder, [{
	    key: "keyDownHandler",
	    value: function keyDownHandler(e) {
	      e.preventDefault();
	      if (e.keyCode === 39 && !this.disableLeftRight) {
	        this.key.right = true;
	      } else if (e.keyCode === 37 && !this.disableLeftRight) {
	        this.key.left = true;
	      } else if (e.keyCode === 38) {
	        this.key.up = true;
	      } else if (e.keyCode === 40) {
	        this.key.down = true;
	      }
	    }
	  }, {
	    key: "keyUpHandler",
	    value: function keyUpHandler(e) {
	      e.preventDefault();
	      if (e.keyCode === 39) {
	        this.key.right = false;
	      } else if (e.keyCode === 37) {
	        this.key.left = false;
	      } else if (e.keyCode === 38) {
	        this.key.up = false;
	      } else if (e.keyCode === 40) {
	        this.key.down = false;
	      }
	    }
	  }, {
	    key: "isDown",
	    value: function isDown(input) {
	      return this.key[input];
	    }
	  }, {
	    key: "disableLeft",
	    value: function disableLeft() {
	      this.leftDisabled = true;
	    }
	  }, {
	    key: "disableRight",
	    value: function disableRight() {
	      this.rightDisabled = true;
	    }
	  }, {
	    key: "disableDown",
	    value: function disableDown() {
	      this.downDisabled = true;
	    }
	  }, {
	    key: "disableUp",
	    value: function disableUp() {
	      this.upDisabled = true;
	    }
	  }, {
	    key: "enableLeft",
	    value: function enableLeft() {
	      this.leftDisabled = false;
	    }
	  }, {
	    key: "enableRight",
	    value: function enableRight() {
	      this.rightDisabled = false;
	    }
	  }, {
	    key: "enableDown",
	    value: function enableDown() {
	      this.downDisabled = false;
	    }
	  }, {
	    key: "enableUp",
	    value: function enableUp() {
	      this.upDisabled = false;
	    }
	  }]);
	
	  return Keyboarder;
	}();
	
	module.exports = Keyboarder;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjY1MzM1NTZkNWM2Yjc3N2MwYjIiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9HYW1lLmpzIiwid2VicGFjazovLy8uL2xpYi9IZXJvLmpzIiwid2VicGFjazovLy8uL2xpYi9MYWRkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL1BsYXRmb3JtLmpzIiwid2VicGFjazovLy8uL2xpYi9QbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvVGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvQnVyZ2VyTGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL0tleWJvYXJkZXIuanMiXSwibmFtZXMiOlsiR2FtZSIsInJlcXVpcmUiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsIktleWJvYXJkZXIiLCJrZXlib2FyZGVyIiwiZ2FtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJrZXlEb3duSGFuZGxlciIsImtleVVwSGFuZGxlciIsInN0YXJ0R2FtZSIsInNhdmVkQ291bnQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidGltZXIiLCJnYW1lTG9vcCIsIkhlcm8iLCJMYWRkZXIiLCJQbGF0Zm9ybSIsIlBsYXRlcyIsIlRleHQiLCJCdXJnZXJMYXllciIsImdhbWVTdGFydFNvdW5kIiwiQXVkaW8iLCJnYW1lVGhlbWVTb3VuZCIsImdhbWVXaW4iLCJnYW1lTG9zZSIsInBsYXkiLCJsb29wIiwibGFkZGVyIiwicGxhdGZvcm0iLCJidXJnZXJMYXllcnMiLCJwbGF0ZXMiLCJ0ZXh0IiwiZ2FtZU51bWJlciIsImhlcm8iLCJjb25zb2xlIiwibG9nIiwiZHJhdyIsInNjb3JlIiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJkcmF3R2FtZSIsIm9uQUxhZGRlciIsIm9uQVBsYXRmb3JtIiwib25BQnVyZ2VyIiwid2luR2FtZSIsImxvc2VHYW1lIiwiZ2FtZVRpbWVyIiwidXBkYXRlIiwiYmluZCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldEl0ZW0iLCJsb2NhdGlvbiIsInJlbG9hZCIsInBsYXRlQ291bnQiLCJwYXVzZSIsImFsZXJ0IiwibmV4dEdhbWUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZ2FtZUJ1cmdlckZhbGwiLCJidXJnZXJMYXllciIsIngiLCJ5Iiwib25MYWRkZXIiLCJvblBsYXRmb3JtIiwiaGVyb0ltYWdlIiwiSW1hZ2UiLCJzcmMiLCJkcmF3SW1hZ2UiLCJjdXJyZW50TGFkZGVyIiwibGFkZGVycyIsImZpbHRlciIsImkiLCJoIiwibGVuZ3RoIiwiZGlzYWJsZUxlZnQiLCJkaXNhYmxlUmlnaHQiLCJlbmFibGVMZWZ0IiwiZW5hYmxlUmlnaHQiLCJjdXJyZW50UGxhdGZvcm0iLCJwbGF0Zm9ybXMiLCJ3IiwibCIsImRpc2FibGVEb3duIiwiZW5hYmxlRG93biIsImRpc2FibGVVcCIsImVuYWJsZVVwIiwiY3VycmVudEJ1cmdlciIsInNxdWlzaExlZnQiLCJzcXVpc2hSaWdodCIsInNtdXNoQ291bnQiLCJkcm9wQnVyZ2VyIiwiZHJvcEJ1cmdlclRvUGxhdGUiLCJzbXVzaExlZnQiLCJzbXVzaFJpZ2h0IiwibmV4dFBsYXRmb3JtIiwiZmluZE5leHRQbGF0Zm9ybSIsImJ1cmdlck9uTmV4dFBsYXRmb3JtIiwiZmluZE5leHRCdXJnZXIiLCJyZXNldFNtdXNoQ291bnRzIiwiZmluZCIsImN1cnJlbnRQbGF0ZSIsImN1cnJlbnRQbGF0ZUNvdW50IiwiY291bnQiLCJpc0Rvd24iLCJyaWdodERpc2FibGVkIiwibGVmdERpc2FibGVkIiwidXBEaXNhYmxlZCIsImRvd25EaXNhYmxlZCIsIkxhZGRlcnMiLCJmaWxsU3R5bGUiLCJmb3JFYWNoIiwiZmlsbFJlY3QiLCJQbGF0Zm9ybXMiLCJtYXAiLCJwb3NZIiwicGxhdGUiLCJmb250IiwiZmlsbFRleHQiLCJwYXJzZUludCIsImxheWVyIiwiYnVyZ2VyVG9wSW1hZ2UiLCJidXJnZXJMZXR0dWNlSW1hZ2UiLCJidXJnZXJQYXR0eUltYWdlIiwiYnVyZ2VyQm90dG9tSW1hZ2UiLCJrZXkiLCJsZWZ0IiwicmlnaHQiLCJ1cCIsImRvd24iLCJlIiwicHJldmVudERlZmF1bHQiLCJrZXlDb2RlIiwiZGlzYWJsZUxlZnRSaWdodCIsImlucHV0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBLEtBQU1BLE9BQU8sbUJBQUFDLENBQVEsQ0FBUixDQUFiO0FBQ0EsS0FBTUMsU0FBU0MsU0FBU0MsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0EsS0FBTUMsTUFBTUgsT0FBT0ksVUFBUCxDQUFrQixJQUFsQixDQUFaO0FBQ0EsS0FBTUMsYUFBYSxtQkFBQU4sQ0FBUSxDQUFSLENBQW5CO0FBQ0EsS0FBTU8sYUFBYSxJQUFJRCxVQUFKLEVBQW5CO0FBQ0EsS0FBTUUsT0FBTyxJQUFJVCxJQUFKLENBQVNLLEdBQVQsRUFBY0gsTUFBZCxFQUFzQk0sVUFBdEIsQ0FBYjs7QUFFQUwsVUFBU08sZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUNGLFdBQVdHLGNBQWhEO0FBQ0FSLFVBQVNPLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DRixXQUFXSSxZQUE5Qzs7QUFFQSxVQUFTQyxTQUFULEdBQXFCO0FBQ25CLE9BQUlDLGFBQWFDLGFBQWFDLE9BQWIsQ0FBcUIsWUFBckIsQ0FBakI7QUFDQSxPQUFJRixhQUFhLENBQWpCLEVBQW9CO0FBQ2xCTCxVQUFLUSxLQUFMLEdBQWEsRUFBYjtBQUNEO0FBQ0RSLFFBQUtTLFFBQUw7QUFDRDs7QUFFREwsYTs7Ozs7Ozs7Ozs7O0FDbEJBLEtBQU1NLE9BQU8sbUJBQUFsQixD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LEdBQUosRUFBU0MsR0FBRyxHQUFaLEVBQWlCbUIsR0FBRzNDLEtBQXBCLEVBQTJCbUMsR0FBRyxFQUE5QixFQWhCYSxFQWlCYixFQUFDWixHQUFHLEdBQUosRUFBU0MsR0FBRyxHQUFaLEVBQWlCbUIsR0FBRzNDLEtBQXBCLEVBQTJCbUMsR0FBRyxFQUE5QixFQWpCYSxFQWtCYixFQUFDWixHQUFHLEdBQUosRUFBU0MsR0FBRyxHQUFaLEVBQWlCbUIsR0FBRzNDLEtBQXBCLEVBQTJCbUMsR0FBRyxHQUE5QixFQWxCYSxFQW1CYixFQUFDWixHQUFHLEdBQUosRUFBU0MsR0FBRyxHQUFaLEVBQWlCbUIsR0FBRzNDLEtBQXBCLEVBQTJCbUMsR0FBRyxFQUE5QixFQW5CYSxFQW9CYixFQUFDWixHQUFHLEdBQUosRUFBU0MsR0FBRyxHQUFaLEVBQWlCbUIsR0FBRzNDLEtBQXBCLEVBQTJCbUMsR0FBRyxFQUE5QixFQXBCYSxFQXFCYixFQUFDWixHQUFHLEdBQUosRUFBU0MsR0FBRyxHQUFaLEVBQWlCbUIsR0FBRzNDLEtBQXBCLEVBQTJCbUMsR0FBRyxFQUE5QixFQXJCYSxFQXNCYixFQUFDWixHQUFHLEdBQUosRUFBU0MsR0FBRyxHQUFaLEVBQWlCbUIsR0FBRzNDLEtBQXBCLEVBQTJCbUMsR0FBRyxFQUE5QixFQXRCYSxFQXVCYixFQUFDWixHQUFHLEdBQUosRUFBU0MsR0FBRyxHQUFaLEVBQWlCbUIsR0FBRzNDLEtBQXBCLEVBQTJCbUMsR0FBRyxHQUE5QixFQXZCYSxFQXdCYixFQUFDWixHQUFHLEdBQUosRUFBU0MsR0FBRyxHQUFaLEVBQWlCbUIsR0FBRzNDLEtBQXBCLEVBQTJCbUMsR0FBRyxFQUE5QixFQXhCYSxFQXlCYixFQUFDWixHQUFHLEdBQUosRUFBU0MsR0FBRyxHQUFaLEVBQWlCbUIsR0FBRzNDLEtBQXBCLEVBQTJCbUMsR0FBRyxHQUE5QixFQXpCYSxFQTBCYixFQUFDWixHQUFHLEdBQUosRUFBU0MsR0FBRyxHQUFaLEVBQWlCbUIsR0FBRzNDLEtBQXBCLEVBQTJCbUMsR0FBRyxHQUE5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QUFTUyxLQUFULENBQVA7QUFDRDs7O21DQUVhO0FBQ1osWUFBSzVCLFlBQUwsR0FBb0IsSUFBcEI7QUFDRDs7O29DQUVjO0FBQ2IsWUFBS0QsYUFBTCxHQUFxQixJQUFyQjtBQUNEOzs7bUNBRWE7QUFDWixZQUFLRyxZQUFMLEdBQW9CLElBQXBCO0FBQ0Q7OztpQ0FFVztBQUNWLFlBQUtELFVBQUwsR0FBa0IsSUFBbEI7QUFDRDs7O2tDQUVZO0FBQ1gsWUFBS0QsWUFBTCxHQUFvQixLQUFwQjtBQUNEOzs7bUNBRWE7QUFDWixZQUFLRCxhQUFMLEdBQXFCLEtBQXJCO0FBQ0Q7OztrQ0FFWTtBQUNYLFlBQUtHLFlBQUwsR0FBb0IsS0FBcEI7QUFDRDs7O2dDQUVVO0FBQ1QsWUFBS0QsVUFBTCxHQUFrQixLQUFsQjtBQUNEOzs7Ozs7QUFHSGxELFFBQU9DLE9BQVAsR0FBaUJ6RCxVQUFqQixDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjY1MzM1NTZkNWM2Yjc3N2MwYjIiLCJjb25zdCBHYW1lID0gcmVxdWlyZSgnLi9HYW1lJyk7XG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmNvbnN0IEtleWJvYXJkZXIgPSByZXF1aXJlKCcuL0tleWJvYXJkZXInKTtcbmNvbnN0IGtleWJvYXJkZXIgPSBuZXcgS2V5Ym9hcmRlcigpO1xuY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGN0eCwgY2FudmFzLCBrZXlib2FyZGVyKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkZXIua2V5RG93bkhhbmRsZXIpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBrZXlib2FyZGVyLmtleVVwSGFuZGxlcik7XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgbGV0IHNhdmVkQ291bnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZU51bWJlcicpO1xuICBpZiAoc2F2ZWRDb3VudCA+IDEpIHtcbiAgICBnYW1lLnRpbWVyID0gMjY7XG4gIH1cbiAgZ2FtZS5nYW1lTG9vcCgpO1xufVxuXG5zdGFydEdhbWUoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvaW5kZXguanMiLCJjb25zdCBIZXJvID0gcmVxdWlyZSgnLi9IZXJvJyk7XG4vLyBjb25zdCBFbmVteSA9IHJlcXVpcmUoJy4vRW5lbXknKTtcbmNvbnN0IExhZGRlciA9IHJlcXVpcmUoJy4vTGFkZGVyJyk7XG5jb25zdCBQbGF0Zm9ybSA9IHJlcXVpcmUoJy4vUGxhdGZvcm0nKTtcbmNvbnN0IFBsYXRlcyA9IHJlcXVpcmUoJy4vUGxhdGUnKTtcbmNvbnN0IFRleHQgPSByZXF1aXJlKCcuL1RleHQnKTtcbmNvbnN0IEJ1cmdlckxheWVyID0gcmVxdWlyZSgnLi9CdXJnZXJMYXllcicpO1xuY29uc3QgZ2FtZVN0YXJ0U291bmQgPSBuZXcgQXVkaW8oJy4uL3Jlc291cmNlcy9nYW1lU3RhcnQubXAzJyk7XG5jb25zdCBnYW1lVGhlbWVTb3VuZCA9IG5ldyBBdWRpbygnLi4vcmVzb3VyY2VzL2dhbWVfdGhlbWUubXAzJyk7XG5jb25zdCBnYW1lV2luID0gbmV3IEF1ZGlvKCcuLi9yZXNvdXJjZXMvZ2FtZV93aW4ubXAzJyk7XG5jb25zdCBnYW1lTG9zZSA9IG5ldyBBdWRpbygnLi4vcmVzb3VyY2VzL2dhbWVfbG9zZS5tcDMnKTtcblxuZ2FtZVN0YXJ0U291bmQucGxheSgpO1xuXG5nYW1lVGhlbWVTb3VuZC5sb29wID0gdHJ1ZTtcbmdhbWVUaGVtZVNvdW5kLnBsYXkoKTtcblxuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKGN0eCwgY2FudmFzLCBrZXlib2FyZGVyKSB7XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgdGhpcy5rZXlib2FyZGVyID0ga2V5Ym9hcmRlcjtcbiAgICB0aGlzLmxhZGRlciA9IG5ldyBMYWRkZXIoKTtcbiAgICB0aGlzLnBsYXRmb3JtID0gbmV3IFBsYXRmb3JtKCk7XG4gICAgdGhpcy5idXJnZXJMYXllcnMgPSBuZXcgQnVyZ2VyTGF5ZXIoKTtcbiAgICB0aGlzLnBsYXRlcyA9IG5ldyBQbGF0ZXMoKTtcbiAgICB0aGlzLnRleHQgPSBuZXcgVGV4dCgpO1xuICAgIHRoaXMudGltZXIgPSAzMTtcbiAgICB0aGlzLmdhbWVOdW1iZXIgPSAxO1xuICAgIHRoaXMuaGVybyA9IG5ldyBIZXJvKFxuICAgICAgdGhpcy5rZXlib2FyZGVyLFxuICAgICAgdGhpcy5sYWRkZXIsXG4gICAgICB0aGlzLnBsYXRmb3JtLCBcbiAgICAgIHRoaXMuYnVyZ2VyTGF5ZXJzLCBcbiAgICAgIHRoaXMucGxhdGVzXG4gICAgKTtcbiAgfSBcblxuICBkcmF3R2FtZSgpIHtcbiAgICBjb25zb2xlLmxvZygnc2RmJylcbiAgICB0aGlzLnBsYXRmb3JtLmRyYXcodGhpcy5jdHgpO1xuICAgIHRoaXMubGFkZGVyLmRyYXcodGhpcy5jdHgpO1xuICAgIHRoaXMuYnVyZ2VyTGF5ZXJzLmRyYXcodGhpcy5jdHgpO1xuICAgIHRoaXMucGxhdGVzLmRyYXcodGhpcy5jdHgpO1xuICAgIHRoaXMudGV4dC5kcmF3KHRoaXMuY3R4LCB0aGlzLnRpbWVyLCB0aGlzLmhlcm8uc2NvcmUpXG4gICAgdGhpcy5oZXJvLmRyYXcodGhpcy5jdHgpO1xuICB9XG5cbiAgZ2FtZUxvb3AoKSB7XG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMuZHJhd0dhbWUoKTtcbiAgICB0aGlzLmhlcm8ub25BTGFkZGVyKCk7XG4gICAgdGhpcy5oZXJvLm9uQVBsYXRmb3JtKCk7XG4gICAgdGhpcy5oZXJvLm9uQUJ1cmdlcigpO1xuICAgIHRoaXMud2luR2FtZSgpO1xuICAgIHRoaXMubG9zZUdhbWUoKTtcbiAgICB0aGlzLmdhbWVUaW1lcigpO1xuICAgIHRoaXMuaGVyby51cGRhdGUoKTtcbiAgICB0aGlzLmdhbWVMb29wID0gdGhpcy5nYW1lTG9vcC5iaW5kKHRoaXMpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmdhbWVMb29wKTtcbiAgfVxuXG4gIGdhbWVUaW1lcigpIHtcbiAgICB0aGlzLnRpbWVyIC09IDAuMDE1O1xuICB9XG5cbiAgbG9zZUdhbWUoKSB7XG4gICAgaWYgKHRoaXMudGltZXIgPCAwKSB7XG4gICAgICB0aGlzLmdhbWVOdW1iZXIgPSAwO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2dhbWVOdW1iZXInLCB0aGlzLmdhbWVOdW1iZXIpO1xuICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfVxuICB9XG5cbiAgd2luR2FtZSgpIHtcbiAgICBpZiAodGhpcy5wbGF0ZXMucGxhdGVDb3VudCA9PT0gNCkge1xuICAgICAgZ2FtZVRoZW1lU291bmQucGF1c2UoKTtcbiAgICAgIGdhbWVXaW4ucGxheSgpO1xuICAgICAgYWxlcnQoXCJZb3Ugc3RhY2sgbWFkIGJ1cmdlcnMgeW8hIEluY3JlYXNpbmcgdGhlIHNwZWVkISEhXCIpXG4gICAgICB0aGlzLnBsYXRlcy5wbGF0ZUNvdW50ID0gMDtcbiAgICAgIHRoaXMubmV4dEdhbWUoKTtcbiAgICB9XG4gIH1cblxuICBuZXh0R2FtZSgpIHtcbiAgICB0aGlzLmdhbWVOdW1iZXIrKztcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZ2FtZU51bWJlcicsIHRoaXMuZ2FtZU51bWJlcik7XG4gICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cblxuXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9HYW1lLmpzIiwiY29uc3QgZ2FtZUJ1cmdlckZhbGwgPSBuZXcgQXVkaW8oJy4uL3Jlc291cmNlcy9ib2luZy5tcDMnKTtcblxuY2xhc3MgSGVybyB7XG4gIGNvbnN0cnVjdG9yKGtleWJvYXJkZXIsIGxhZGRlciwgcGxhdGZvcm0sIGJ1cmdlckxheWVyLCBwbGF0ZXMpIHtcbiAgICB0aGlzLnggPSA0NzU7XG4gICAgdGhpcy55ID0gNTI1O1xuICAgIHRoaXMub25MYWRkZXIgPSBmYWxzZTtcbiAgICB0aGlzLm9uUGxhdGZvcm0gPSBmYWxzZTtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLmtleWJvYXJkZXIgPSBrZXlib2FyZGVyO1xuICAgIHRoaXMucGxhdGZvcm0gPSBwbGF0Zm9ybTtcbiAgICB0aGlzLmxhZGRlciA9IGxhZGRlcjtcbiAgICB0aGlzLmJ1cmdlckxheWVyID0gYnVyZ2VyTGF5ZXI7XG4gICAgdGhpcy5wbGF0ZXMgPSBwbGF0ZXM7XG4gICAgdGhpcy51cGRhdGUgPSB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjb25zdCBoZXJvSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblxuICAgIGhlcm9JbWFnZS5zcmMgPSAnLi4vcmVzb3VyY2VzL2J1cmdlckhlcm8ucG5nJztcbiAgICBjdHguZHJhd0ltYWdlKGhlcm9JbWFnZSwgdGhpcy54LCB0aGlzLnkpO1xuICB9XG5cbiAgb25BTGFkZGVyKCkge1xuICAgIGxldCBjdXJyZW50TGFkZGVyID1cbiAgICAgIHRoaXMubGFkZGVyLmxhZGRlcnMuZmlsdGVyKFxuICAgICAgICBpID0+XG4gICAgICAgICAgaS54ID49IHRoaXMueCAmJlxuICAgICAgICAgIGkueCArIDMwIDw9IHRoaXMueCArIDQwICYmXG4gICAgICAgICAgdGhpcy55ICsgNTUgPD0gaS55ICsgaS5oICYmXG4gICAgICAgICAgdGhpcy55ID49IGkueSAtIDY1XG4gICAgICApO1xuXG4gICAgaWYgKGN1cnJlbnRMYWRkZXIubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5rZXlib2FyZGVyLmRpc2FibGVMZWZ0KCk7XG4gICAgICB0aGlzLmtleWJvYXJkZXIuZGlzYWJsZVJpZ2h0KCk7XG4gICAgICB0aGlzLm9uTGFkZGVyID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5rZXlib2FyZGVyLmVuYWJsZUxlZnQoKTtcbiAgICAgIHRoaXMua2V5Ym9hcmRlci5lbmFibGVSaWdodCgpO1xuICAgICAgdGhpcy5vbkxhZGRlciA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG9uQVBsYXRmb3JtKCkge1xuICAgIGxldCBjdXJyZW50UGxhdGZvcm0gPVxuICAgICAgdGhpcy5wbGF0Zm9ybS5wbGF0Zm9ybXMuZmlsdGVyKFxuICAgICAgICBpID0+XG4gICAgICAgICAgaS55ID09PSB0aGlzLnkgKyA1NSAmJlxuICAgICAgICAgIGkueCA8PSB0aGlzLnggJiZcbiAgICAgICAgICB0aGlzLnggKyA0MCA8PSBpLnggKyBpLndcbiAgICAgICk7XG5cbiAgICBjdXJyZW50UGxhdGZvcm0gPSBjdXJyZW50UGxhdGZvcm1bMF07XG5cbiAgICAvL2Rpc2FibGUgZG93biBvbiBib3R0b20gcGxhdGZvcm1cbiAgICBjdXJyZW50UGxhdGZvcm0gJiYgY3VycmVudFBsYXRmb3JtLmwgPT09IDggP1xuICAgICAgdGhpcy5rZXlib2FyZGVyLmRpc2FibGVEb3duKCkgOiB0aGlzLmtleWJvYXJkZXIuZW5hYmxlRG93bigpO1xuXG4gICAgLy9lbmFibGUgZG93biBvbiB0b3AgcGxhdGZvcm0gJiBkaXNhYmxlIHVwXG4gICAgY3VycmVudFBsYXRmb3JtICYmIGN1cnJlbnRQbGF0Zm9ybS5sID09PSAxID9cbiAgICAgIHRoaXMua2V5Ym9hcmRlci5kaXNhYmxlVXAoKSA6IHRoaXMua2V5Ym9hcmRlci5lbmFibGVVcCgpO1xuXG4gICAgLy9pZiBvbiBwbGF0Zm9ybSBlbmFibGUgbGVmdCBhbmQgcmlnaHRcbiAgICBpZiAoY3VycmVudFBsYXRmb3JtICYmIHRoaXMueCA+IGN1cnJlbnRQbGF0Zm9ybS54KSB7XG4gICAgICB0aGlzLmtleWJvYXJkZXIuZW5hYmxlTGVmdCgpO1xuICAgICAgdGhpcy5rZXlib2FyZGVyLmVuYWJsZVJpZ2h0KCk7XG4gICAgfVxuXG4gICAgLy8gaWYgb24gbGVmdCBwbGF0Zm9ybSBkaXNhYmxlIGxlZnRcbiAgICBpZiAoY3VycmVudFBsYXRmb3JtICYmIHRoaXMueCA9PT0gY3VycmVudFBsYXRmb3JtLngpIHtcbiAgICAgIHRoaXMua2V5Ym9hcmRlci5kaXNhYmxlTGVmdCgpO1xuICAgIH1cblxuICAgIC8vIGlmIG9uIHJpZ2h0IHBsYXRmb3JtIGRpc2FibGUgcmlnaHRcbiAgICBpZiAoY3VycmVudFBsYXRmb3JtICYmXG4gICAgICAgIHRoaXMueCArIDQwID09PSBjdXJyZW50UGxhdGZvcm0ueCArIGN1cnJlbnRQbGF0Zm9ybS53KSB7XG4gICAgICB0aGlzLmtleWJvYXJkZXIuZGlzYWJsZVJpZ2h0KCk7XG4gICAgfVxuICB9XG5cbiAgb25BQnVyZ2VyKCkge1xuICAgIHZhciBjdXJyZW50QnVyZ2VyID0gdGhpcy5idXJnZXJMYXllci5idXJnZXJMYXllcnMuZmlsdGVyKFxuICAgICAgaSA9PlxuICAgICAgICB0aGlzLnggPj0gaS54ICYmXG4gICAgICAgIHRoaXMueCArIDQwIDw9IGkueCArIGkud1xuICAgICAgICAmJiBpLnkgKyAxMCA9PT0gdGhpcy55ICsgNTVcbiAgICApO1xuICAgIHZhciBjdXJyZW50UGxhdGZvcm0gPSB0aGlzLnBsYXRmb3JtLnBsYXRmb3Jtcy5maWx0ZXIoXG4gICAgICBpID0+XG4gICAgICAgIGkueSA9PT0gdGhpcy55ICsgNTUgJiZcbiAgICAgICAgaS54IDw9IHRoaXMueCAmJlxuICAgICAgICB0aGlzLnggKyA0MCA8PSBpLnggKyBpLndcbiAgICApO1xuXG4gICAgY3VycmVudEJ1cmdlciA9IGN1cnJlbnRCdXJnZXJbMF07XG4gICAgY3VycmVudFBsYXRmb3JtID0gY3VycmVudFBsYXRmb3JtWzBdO1xuXG4gICAgaWYgKGN1cnJlbnRCdXJnZXIpIHtcbiAgICAgIHRoaXMuc3F1aXNoTGVmdChjdXJyZW50QnVyZ2VyKTtcbiAgICAgIHRoaXMuc3F1aXNoUmlnaHQoY3VycmVudEJ1cmdlcik7XG4gICAgICBpZiAoY3VycmVudEJ1cmdlci5zbXVzaENvdW50ID09PSAyICYmIGN1cnJlbnRQbGF0Zm9ybS5sICE9PSA4KSB7XG4gICAgICAgIHRoaXMuZHJvcEJ1cmdlcihjdXJyZW50QnVyZ2VyLCBjdXJyZW50UGxhdGZvcm0pXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRCdXJnZXIuc211c2hDb3VudCA9PT0gMiAmJiBjdXJyZW50UGxhdGZvcm0ubCA9PT0gOCkge1xuICAgICAgICB0aGlzLmRyb3BCdXJnZXJUb1BsYXRlKGN1cnJlbnRCdXJnZXIsIGN1cnJlbnRQbGF0Zm9ybSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3F1aXNoTGVmdChjdXJyZW50QnVyZ2VyKSB7XG4gICAgLy8gTGVmdCBzcXVpc2ggLSBpbmNyZWFzZSBzbXVzaCBjb3VudCBhbmQgc211c2ggbGVmdCBjb3VudCB0byAxXG4gICAgaWYgKHRoaXMueCA9PT0gY3VycmVudEJ1cmdlci54ICYmIGN1cnJlbnRCdXJnZXIuc211c2hMZWZ0ID09PSAwKSB7XG4gICAgICBjdXJyZW50QnVyZ2VyLnNtdXNoTGVmdCA9IDE7XG4gICAgICBjdXJyZW50QnVyZ2VyLnNtdXNoQ291bnQrKztcbiAgICAgIHRoaXMuc2NvcmUgKz0gMjUwO1xuICAgIH1cbiAgfVxuXG4gIHNxdWlzaFJpZ2h0KGN1cnJlbnRCdXJnZXIpIHtcbiAgICAvLyBSaWdodCBzcXVpc2ggLSBpbmNyZWFzZSBzbXVzaCBjb3VudCBhbmQgc211c2ggbGVmdCBjb3VudCB0byAxXG4gICAgaWYgKHRoaXMueCArIDQwID09PSBjdXJyZW50QnVyZ2VyLnggKyBjdXJyZW50QnVyZ2VyLncgJiZcbiAgICAgICAgY3VycmVudEJ1cmdlci5zbXVzaFJpZ2h0ID09PSAwKSB7XG4gICAgICBjdXJyZW50QnVyZ2VyLnNtdXNoUmlnaHQgPSAxO1xuICAgICAgY3VycmVudEJ1cmdlci5zbXVzaENvdW50Kys7XG4gICAgICB0aGlzLnNjb3JlICs9IDI1MDtcbiAgICB9XG4gIH1cblxuICBkcm9wQnVyZ2VyKGN1cnJlbnRCdXJnZXIsIGN1cnJlbnRQbGF0Zm9ybSkge1xuICAgIHZhciBuZXh0UGxhdGZvcm0gPSB0aGlzLmZpbmROZXh0UGxhdGZvcm0oY3VycmVudEJ1cmdlciwgY3VycmVudFBsYXRmb3JtKTtcbiAgICB2YXIgYnVyZ2VyT25OZXh0UGxhdGZvcm0gPSB0aGlzLmZpbmROZXh0QnVyZ2VyKGN1cnJlbnRCdXJnZXIsIG5leHRQbGF0Zm9ybSk7XG5cbiAgICBjdXJyZW50QnVyZ2VyLnkgPSBuZXh0UGxhdGZvcm0ueSAtIDEwO1xuICAgIHRoaXMucmVzZXRTbXVzaENvdW50cyhjdXJyZW50QnVyZ2VyKTtcblxuICAgIGlmIChidXJnZXJPbk5leHRQbGF0Zm9ybSAmJiBuZXh0UGxhdGZvcm0ubCAhPT0gOCkge1xuICAgICAgdGhpcy5kcm9wQnVyZ2VyKGJ1cmdlck9uTmV4dFBsYXRmb3JtLCBuZXh0UGxhdGZvcm0pO1xuICAgIH0gZWxzZSBpZiAoYnVyZ2VyT25OZXh0UGxhdGZvcm0gJiYgbmV4dFBsYXRmb3JtLmwgPT09IDgpIHtcbiAgICAgIHRoaXMuZHJvcEJ1cmdlclRvUGxhdGUoYnVyZ2VyT25OZXh0UGxhdGZvcm0sIGN1cnJlbnRQbGF0Zm9ybSk7XG4gICAgfVxuICB9XG5cbiAgZmluZE5leHRCdXJnZXIoY3VycmVudEJ1cmdlciwgbmV4dFBsYXRmb3JtKSB7XG4gICAgZ2FtZUJ1cmdlckZhbGwucGxheSgpO1xuICAgIHJldHVybiB0aGlzLmJ1cmdlckxheWVyLmJ1cmdlckxheWVycy5maW5kKFxuICAgICAgaSA9PlxuICAgICAgICBpLnkgKyBpLmggPCBuZXh0UGxhdGZvcm0ueSArIG5leHRQbGF0Zm9ybS5oICYmXG4gICAgICAgIG5leHRQbGF0Zm9ybS55IDwgaS55ICsgaS5oICYmIGkueCA9PT0gY3VycmVudEJ1cmdlci54XG4gICAgKVxuICB9XG5cbiAgZmluZE5leHRQbGF0Zm9ybShjdXJyZW50QnVyZ2VyLCBjdXJyZW50UGxhdGZvcm0pIHtcbiAgICByZXR1cm4gdGhpcy5wbGF0Zm9ybS5wbGF0Zm9ybXMuZmluZChcbiAgICAgIGkgPT5cbiAgICAgICAgY3VycmVudEJ1cmdlci54ID4gaS54ICYmXG4gICAgICAgIChpLnggKyBpLncpID4gY3VycmVudEJ1cmdlci54ICYmXG4gICAgICAgIGkubCA+IGN1cnJlbnRQbGF0Zm9ybS5sXG4gICAgKVxuICB9XG5cbiAgcmVzZXRTbXVzaENvdW50cyhjdXJyZW50QnVyZ2VyKSB7XG4gICAgY3VycmVudEJ1cmdlci5zbXVzaFJpZ2h0ID0gMDtcbiAgICBjdXJyZW50QnVyZ2VyLnNtdXNoTGVmdCA9IDA7XG4gICAgY3VycmVudEJ1cmdlci5zbXVzaENvdW50ID0gMDtcbiAgfVxuXG4gIGRyb3BCdXJnZXJUb1BsYXRlKGN1cnJlbnRCdXJnZXIpIHtcbiAgICBsZXQgY3VycmVudFBsYXRlID0gdGhpcy5wbGF0ZXMucGxhdGVzLmZpbHRlcihcbiAgICAgIGkgPT4gY3VycmVudEJ1cmdlci54ID09PSBpLnggKyA1KTtcbiAgICBsZXQgY3VycmVudFBsYXRlQ291bnQgPSBjdXJyZW50UGxhdGVbMF0uY291bnQ7XG4gICAgXG4gICAgZ2FtZUJ1cmdlckZhbGwucGxheSgpO1xuICAgIGN1cnJlbnRCdXJnZXIueSA9IGN1cnJlbnRQbGF0ZVswXS55IC0gMTAgLSAoMjAgKiBjdXJyZW50UGxhdGVDb3VudCk7XG4gICAgY3VycmVudFBsYXRlWzBdLmNvdW50Kys7XG4gICAgdGhpcy5zY29yZSArPSAxMDAwO1xuICAgIHRoaXMucGxhdGVzLnBsYXRlQ291bnQrKztcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5rZXlib2FyZGVyLmlzRG93bigncmlnaHQnKSAmJlxuICAgICAgICAhdGhpcy5rZXlib2FyZGVyLnJpZ2h0RGlzYWJsZWQpIHtcbiAgICAgIHRoaXMueCArPSA1O1xuICAgIH0gZWxzZSBpZiAodGhpcy5rZXlib2FyZGVyLmlzRG93bignbGVmdCcpICYmXG4gICAgICAgICAgICAgICAhdGhpcy5rZXlib2FyZGVyLmxlZnREaXNhYmxlZCkge1xuICAgICAgdGhpcy54IC09IDU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmtleWJvYXJkZXIuaXNEb3duKCd1cCcpICYmXG4gICAgICAgICAgICAgICB0aGlzLm9uTGFkZGVyICYmXG4gICAgICAgICAgICAgICF0aGlzLmtleWJvYXJkZXIudXBEaXNhYmxlZCkge1xuICAgICAgdGhpcy55IC09IDU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmtleWJvYXJkZXIuaXNEb3duKCdkb3duJykgJiZcbiAgICAgICAgICAgICAgIHRoaXMub25MYWRkZXIgJiZcbiAgICAgICAgICAgICAgIXRoaXMua2V5Ym9hcmRlci5kb3duRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMueSArPSA1O1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlcm87XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0hlcm8uanMiLCJjbGFzcyBMYWRkZXJzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IHdpZHRoID0gMzA7XG5cbiAgICB0aGlzLmxhZGRlcnMgPSBbXG4gICAgICB7eDogNjUsIHk6IDQ5MCwgdzogd2lkdGgsIGg6IDkwfSxcbiAgICAgIHt4OiA2NSwgeTogMzI1LCB3OiB3aWR0aCwgaDogMTU1fSxcbiAgICAgIHt4OiA2NSwgeTogMTMwLCB3OiB3aWR0aCwgaDogNzV9LFxuICAgICAge3g6IDE3NSwgeTogMzI1LCB3OiB3aWR0aCwgaDogMTU1fSxcbiAgICAgIHt4OiAxNzUsIHk6IDIxNSwgdzogd2lkdGgsIGg6IDEwMH0sXG4gICAgICB7eDogMjg1LCB5OiA0OTAsIHc6IHdpZHRoLCBoOiA5MH0sXG4gICAgICB7eDogMjg1LCB5OiAzODAsIHc6IHdpZHRoLCBoOiAxMDB9LFxuICAgICAge3g6IDI4NSwgeTogMzI1LCB3OiB3aWR0aCwgaDogNDV9LFxuICAgICAge3g6IDI4NSwgeTogMjcwLCB3OiB3aWR0aCwgaDogNDV9LFxuICAgICAge3g6IDI4NSwgeTogMjE1LCB3OiB3aWR0aCwgaDogNDV9LFxuICAgICAge3g6IDI4NSwgeTogMTMwLCB3OiB3aWR0aCwgaDogNzV9LFxuICAgICAge3g6IDM4NSwgeTogMTMwLCB3OiB3aWR0aCwgaDogMTMwfSxcbiAgICAgIHt4OiA0ODAsIHk6IDQ5MCwgdzogd2lkdGgsIGg6IDkwfSxcbiAgICAgIHt4OiA0ODAsIHk6IDM4MCwgdzogd2lkdGgsIGg6IDEwMH0sXG4gICAgICB7eDogNDgwLCB5OiAyNzAsIHc6IHdpZHRoLCBoOiAxMDB9LFxuICAgICAge3g6IDQ4MCwgeTogMjE1LCB3OiB3aWR0aCwgaDogNDV9LFxuICAgICAge3g6IDQ4MCwgeTogMTMwLCB3OiB3aWR0aCwgaDogNzV9LFxuICAgICAge3g6IDU5MCwgeTogMjE1LCB3OiB3aWR0aCwgaDogMTU1fSxcbiAgICAgIHt4OiA2ODUsIHk6IDQ5MCwgdzogd2lkdGgsIGg6IDkwfSxcbiAgICAgIHt4OiA2ODUsIHk6IDQzNSwgdzogd2lkdGgsIGg6IDQ1fSxcbiAgICAgIHt4OiA2ODUsIHk6IDM4MCwgdzogd2lkdGgsIGg6IDQ1fSxcbiAgICAgIHt4OiA2ODUsIHk6IDMyNSwgdzogd2lkdGgsIGg6IDQ1fSxcbiAgICAgIHt4OiA2ODUsIHk6IDIxNSwgdzogd2lkdGgsIGg6IDEwMH0sXG4gICAgICB7eDogNjg1LCB5OiAxMzAsIHc6IHdpZHRoLCBoOiA3NX0sXG4gICAgICB7eDogODAwLCB5OiA0MzUsIHc6IHdpZHRoLCBoOiAxNDV9LFxuICAgICAge3g6IDgwMCwgeTogMzI1LCB3OiB3aWR0aCwgaDogMTAwfSxcbiAgICAgIHt4OiA5MDAsIHk6IDQzNSwgdzogd2lkdGgsIGg6IDE0NX0sXG4gICAgICB7eDogOTAwLCB5OiAzMjUsIHc6IHdpZHRoLCBoOiAxMDB9LFxuICAgICAge3g6IDkwMCwgeTogMjE1LCB3OiB3aWR0aCwgaDogMTAwfSxcbiAgICAgIHt4OiA5MDAsIHk6IDEzMCwgdzogd2lkdGgsIGg6IDc1fSxcbiAgICBdO1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguZmlsbFN0eWxlID0gJyM1ZGM4ZWQnO1xuICAgIHRoaXMubGFkZGVycy5mb3JFYWNoKGxhZGRlciA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhZGRlci5oOyBpICs9IDgpIHtcbiAgICAgICAgY3R4LmZpbGxSZWN0KGxhZGRlci54LCBsYWRkZXIueSArIGksIGxhZGRlci53LCAyKTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTGFkZGVycztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvTGFkZGVyLmpzIiwiY2xhc3MgUGxhdGZvcm1zIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gMTA7XG5cbiAgICB0aGlzLnBsYXRmb3JtcyA9IFtcbiAgICAgIC8vdG9wIGxldmVsXG4gICAgICB7eDogNDAsIHk6IDEyMCwgdzogOTEwLCBoOiBoZWlnaHQsIGw6IDF9LFxuICAgICAgLy9zZWNvbmQgbGV2ZWxcbiAgICAgIHt4OiA0MCwgeTogMjA1LCB3OiAyOTUsIGg6IGhlaWdodCwgbDogMn0sXG4gICAgICB7eDogNDYwLCB5OiAyMDUsIHc6IDQ5MCwgaDogaGVpZ2h0LCBsOiAyfSxcbiAgICAgIC8vdGhpcmQgbGV2ZWxcbiAgICAgIHt4OiAyNjUsIHk6IDI2MCwgdzogMjY1LCBoOiBoZWlnaHQsIGw6IDN9LFxuICAgICAgLy9mb3VydGggbGV2ZWxcbiAgICAgIHt4OiA0MCwgeTogMzE1LCB3OiAyOTUsIGg6IGhlaWdodCwgbDogNH0sXG4gICAgICB7eDogNjcwLCB5OiAzMTUsIHc6IDI4MCwgaDogaGVpZ2h0LCBsOiA0fSxcbiAgICAgIC8vZmlmdGggbGV2ZWxcbiAgICAgIHt4OiAyNjUsIHk6IDM3MCwgdzogNDcwLCBoOiBoZWlnaHQsIGw6IDV9LFxuICAgICAgLy9zaXh0aCBsZXZlbFxuICAgICAge3g6IDY3MCwgeTogNDI1LCB3OiAyODAsIGg6IGhlaWdodCwgbDogNn0sXG4gICAgICAvL3NldmVudCBsZXZlbFxuICAgICAge3g6IDQwLCB5OiA0ODAsIHc6IDcwMCwgaDogaGVpZ2h0LCBsOiA3fSxcbiAgICAgIC8vZWlnaHRoIGxldmVsXG4gICAgICB7eDogNDAsIHk6IDU4MCwgdzogOTEwLCBoOiBoZWlnaHQsIGw6IDh9XG4gICAgXTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjZmM5ODM4JztcbiAgICB0aGlzLnBsYXRmb3Jtcy5tYXAocGxhdGZvcm0gPT4ge1xuICAgICAgY3R4LmZpbGxSZWN0KHBsYXRmb3JtLngsIHBsYXRmb3JtLnksIHBsYXRmb3JtLncsIHBsYXRmb3JtLmgpO1xuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGxhdGZvcm1zO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9QbGF0Zm9ybS5qcyIsImNsYXNzIFBsYXRlcyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IHdpZHRoID0gMTM1O1xuICAgIGNvbnN0IGhlaWdodCA9IDU7XG4gICAgY29uc3QgcG9zWSA9IDY3NTtcblxuICAgIHRoaXMucGxhdGVDb3VudCA9IDA7XG4gICAgdGhpcy5wbGF0ZXMgPSBbXG4gICAgICB7eDogMTIwLCB5OiBwb3NZLCB3OiB3aWR0aCwgaDogaGVpZ2h0LCBjb3VudDogMH0sXG4gICAgICB7eDogMzMwLCB5OiBwb3NZLCB3OiB3aWR0aCwgaDogaGVpZ2h0LCBjb3VudDogMH0sXG4gICAgICB7eDogNTMwLCB5OiBwb3NZLCB3OiB3aWR0aCwgaDogaGVpZ2h0LCBjb3VudDogMH0sXG4gICAgICB7eDogNzQ1LCB5OiBwb3NZLCB3OiB3aWR0aCwgaDogaGVpZ2h0LCBjb3VudDogMH1cbiAgICBdO1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguZmlsbFN0eWxlID0gJyNkZGQnO1xuICAgIHRoaXMucGxhdGVzLm1hcChwbGF0ZSA9PiB7XG4gICAgICBjdHguZmlsbFJlY3QocGxhdGUueCwgcGxhdGUueSwgcGxhdGUudywgcGxhdGUuaCk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF0ZXM7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL1BsYXRlLmpzIiwiY2xhc3MgVGV4dCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgZHJhdyhjdHgsIHRpbWVyLCBzY29yZSkge1xuICAgIGN0eC5mb250ID0gXCIyMHB4IEFyaWFsXCI7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI2YwMFwiO1xuICAgIGN0eC5maWxsVGV4dChgUGxheWVyIDFgLCA2NSwgNTApO1xuICAgIGN0eC5maWxsVGV4dChgU2NvcmU6ICR7c2NvcmV9YCwgMjcwLCA1MCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZlwiO1xuICAgIGN0eC5maWxsVGV4dCgnVGltZTonICsgcGFyc2VJbnQodGltZXIpLCA4NTAsIDUwKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvVGV4dC5qcyIsImNsYXNzIEJ1cmdlckxheWVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zbXVzaENvdW50ID0gMDtcbiAgICBjb25zdCB3aWR0aCA9IDEyNTtcbiAgICBjb25zdCBoZWlnaHQgPSAxNTtcblxuICAgIHRoaXMuYnVyZ2VyTGF5ZXJzID0gW1xuICAgICAge3g6IDEyNSwgeTogMTk1LCB3OiB3aWR0aCwgaDogaGVpZ2h0LFxuICAgICAgICBzbXVzaExlZnQ6IDAsIHNtdXNoUmlnaHQ6IDAsIHNtdXNoQ291bnQ6IDAsIGxheWVyOiAndG9wJ30sXG4gICAgICB7eDogMzM1LCB5OiAxMTAsIHc6IHdpZHRoLCBoOiBoZWlnaHQsXG4gICAgICAgIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMCwgbGF5ZXI6ICd0b3AnfSxcbiAgICAgIHt4OiA1MzUsIHk6IDExMCwgdzogd2lkdGgsIGg6IGhlaWdodCxcbiAgICAgICAgc211c2hMZWZ0OiAwLCBzbXVzaFJpZ2h0OiAwLCBzbXVzaENvdW50OiAwLCBsYXllcjogJ3RvcCd9LFxuICAgICAge3g6IDc1MCwgeTogMTEwLCB3OiB3aWR0aCwgaDogaGVpZ2h0LFxuICAgICAgICBzbXVzaExlZnQ6IDAsIHNtdXNoUmlnaHQ6IDAsIHNtdXNoQ291bnQ6IDAsIGxheWVyOiAndG9wJ30sXG4gICAgICB7eDogMTI1LCB5OiAzMDUsIHc6IHdpZHRoLCBoOiBoZWlnaHQsXG4gICAgICAgIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMCwgbGF5ZXI6ICdsZXR0dWNlJ30sXG4gICAgICB7eDogMzM1LCB5OiAzNjAsIHc6IHdpZHRoLCBoOiBoZWlnaHQsXG4gICAgICAgIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMCwgbGF5ZXI6ICdsZXR0dWNlJ30sXG4gICAgICB7eDogNTM1LCB5OiAxOTUsIHc6IHdpZHRoLCBoOiBoZWlnaHQsXG4gICAgICAgIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMCwgbGF5ZXI6ICdsZXR0dWNlJ30sXG4gICAgICB7eDogNzUwLCB5OiAxOTUsIHc6IHdpZHRoLCBoOiBoZWlnaHQsXG4gICAgICAgIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMCwgbGF5ZXI6ICdsZXR0dWNlJ30sXG4gICAgICB7eDogMTI1LCB5OiA0NzAsIHc6IHdpZHRoLCBoOiBoZWlnaHQsXG4gICAgICAgIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMCwgbGF5ZXI6ICdwYXR0eSd9LFxuICAgICAge3g6IDMzNSwgeTogNDcwLCB3OiB3aWR0aCwgaDogaGVpZ2h0LFxuICAgICAgICBzbXVzaExlZnQ6IDAsIHNtdXNoUmlnaHQ6IDAsIHNtdXNoQ291bnQ6IDAsIGxheWVyOiAncGF0dHknfSxcbiAgICAgIHt4OiA1MzUsIHk6IDM2MCwgdzogd2lkdGgsIGg6IGhlaWdodCxcbiAgICAgICAgc211c2hMZWZ0OiAwLCBzbXVzaFJpZ2h0OiAwLCBzbXVzaENvdW50OiAwLCBsYXllcjogJ3BhdHR5J30sXG4gICAgICB7eDogNzUwLCB5OiAzMDUsIHc6IHdpZHRoLCBoOiBoZWlnaHQsXG4gICAgICAgIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMCwgbGF5ZXI6ICdwYXR0eSd9LFxuICAgICAge3g6IDEyNSwgeTogNTcwLCB3OiB3aWR0aCwgaDogaGVpZ2h0LFxuICAgICAgICBzbXVzaExlZnQ6IDAsIHNtdXNoUmlnaHQ6IDAsIHNtdXNoQ291bnQ6IDAsIGxheWVyOiAnYm90dG9tJ30sXG4gICAgICB7eDogMzM1LCB5OiA1NzAsIHc6IHdpZHRoLCBoOiBoZWlnaHQsXG4gICAgICAgIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMCwgbGF5ZXI6ICdib3R0b20nfSxcbiAgICAgIHt4OiA1MzUsIHk6IDU3MCwgdzogd2lkdGgsIGg6IGhlaWdodCxcbiAgICAgICAgc211c2hMZWZ0OiAwLCBzbXVzaFJpZ2h0OiAwLCBzbXVzaENvdW50OiAwLCBsYXllcjogJ2JvdHRvbSd9LFxuICAgICAge3g6IDc1MCwgeTogNDE1LCB3OiB3aWR0aCwgaDogaGVpZ2h0LFxuICAgICAgICBzbXVzaExlZnQ6IDAsIHNtdXNoUmlnaHQ6IDAsIHNtdXNoQ291bnQ6IDAsIGxheWVyOiAnYm90dG9tJ30sXG4gICAgXTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgdGhpcy5idXJnZXJMYXllcnMuZm9yRWFjaChidXJnZXJMYXllciA9PiB7XG4gICAgICBpZiAoYnVyZ2VyTGF5ZXIubGF5ZXIgPT09ICd0b3AnKSB7XG4gICAgICAgIGNvbnN0IGJ1cmdlclRvcEltYWdlID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgYnVyZ2VyVG9wSW1hZ2Uuc3JjID0gJy4uL3Jlc291cmNlcy9idXJnZXJfdG9wLnBuZyc7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVyZ2VyVG9wSW1hZ2UsIGJ1cmdlckxheWVyLngsIGJ1cmdlckxheWVyLnkpO1xuICAgICAgfSBlbHNlIGlmIChidXJnZXJMYXllci5sYXllciA9PT0gJ2xldHR1Y2UnKSB7XG4gICAgICAgIGNvbnN0IGJ1cmdlckxldHR1Y2VJbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG4gICAgICAgIGJ1cmdlckxldHR1Y2VJbWFnZS5zcmMgPSAnLi4vcmVzb3VyY2VzL2J1cmdlcl9sZXR0dWNlLnBuZyc7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVyZ2VyTGV0dHVjZUltYWdlLCBidXJnZXJMYXllci54LCBidXJnZXJMYXllci55KTtcbiAgICAgIH0gZWxzZSBpZiAoYnVyZ2VyTGF5ZXIubGF5ZXIgPT09ICdwYXR0eScpIHtcbiAgICAgICAgY29uc3QgYnVyZ2VyUGF0dHlJbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG4gICAgICAgIGJ1cmdlclBhdHR5SW1hZ2Uuc3JjID0gJy4uL3Jlc291cmNlcy9idXJnZXJfcGF0dHkucG5nJztcbiAgICAgICAgY3R4LmRyYXdJbWFnZShidXJnZXJQYXR0eUltYWdlLCBidXJnZXJMYXllci54LCBidXJnZXJMYXllci55KTtcbiAgICAgIH0gZWxzZSBpZiAoYnVyZ2VyTGF5ZXIubGF5ZXIgPT09ICdib3R0b20nKSB7XG4gICAgICAgIGNvbnN0IGJ1cmdlckJvdHRvbUltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIFxuICAgICAgICBidXJnZXJCb3R0b21JbWFnZS5zcmMgPSAnLi4vcmVzb3VyY2VzL2J1cmdlcl9ib3R0b20ucG5nJztcbiAgICAgICAgY3R4LmRyYXdJbWFnZShidXJnZXJCb3R0b21JbWFnZSwgYnVyZ2VyTGF5ZXIueCwgYnVyZ2VyTGF5ZXIueSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCdXJnZXJMYXllcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9CdXJnZXJMYXllci5qcyIsImNsYXNzIEtleWJvYXJkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmtleSA9IHtcbiAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgICAgdXA6IGZhbHNlLFxuICAgICAgZG93bjogZmFsc2VcbiAgICB9XG4gICAgdGhpcy5sZWZ0RGlzYWJsZWQ7XG4gICAgdGhpcy5yaWdodERpc2FibGVkO1xuICAgIHRoaXMudXBEaXNhYmxlZDtcbiAgICB0aGlzLmRvd25EaXNhYmxlZDtcbiAgICB0aGlzLmtleURvd25IYW5kbGVyID0gdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMua2V5VXBIYW5kbGVyID0gdGhpcy5rZXlVcEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCkgIFxuICAgIGlmIChlLmtleUNvZGUgPT09IDM5ICYmICF0aGlzLmRpc2FibGVMZWZ0UmlnaHQpIHtcbiAgICAgIHRoaXMua2V5LnJpZ2h0ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMzcgJiYgIXRoaXMuZGlzYWJsZUxlZnRSaWdodCkge1xuICAgICAgdGhpcy5rZXkubGVmdCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDM4KSB7XG4gICAgICB0aGlzLmtleS51cCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDQwKSB7XG4gICAgICB0aGlzLmtleS5kb3duID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBrZXlVcEhhbmRsZXIoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGlmIChlLmtleUNvZGUgPT09IDM5KSB7XG4gICAgICB0aGlzLmtleS5yaWdodCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSAzNykge1xuICAgICAgdGhpcy5rZXkubGVmdCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSAzOCkge1xuICAgICAgdGhpcy5rZXkudXAgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gNDApIHtcbiAgICAgIHRoaXMua2V5LmRvd24gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpc0Rvd24oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5rZXlbaW5wdXRdO1xuICB9IFxuXG4gIGRpc2FibGVMZWZ0KCkge1xuICAgIHRoaXMubGVmdERpc2FibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGRpc2FibGVSaWdodCgpIHtcbiAgICB0aGlzLnJpZ2h0RGlzYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgZGlzYWJsZURvd24oKSB7XG4gICAgdGhpcy5kb3duRGlzYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgZGlzYWJsZVVwKCkge1xuICAgIHRoaXMudXBEaXNhYmxlZCA9IHRydWU7XG4gIH1cblxuICBlbmFibGVMZWZ0KCkge1xuICAgIHRoaXMubGVmdERpc2FibGVkID0gZmFsc2U7ICAgXG4gIH1cblxuICBlbmFibGVSaWdodCgpIHtcbiAgICB0aGlzLnJpZ2h0RGlzYWJsZWQgPSBmYWxzZTsgICBcbiAgfVxuXG4gIGVuYWJsZURvd24oKSB7XG4gICAgdGhpcy5kb3duRGlzYWJsZWQgPSBmYWxzZTsgICBcbiAgfVxuXG4gIGVuYWJsZVVwKCkge1xuICAgIHRoaXMudXBEaXNhYmxlZCA9IGZhbHNlOyAgIFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvS2V5Ym9hcmRlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=