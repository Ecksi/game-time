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
	var Keyboarder = __webpack_require__(7);
	var keyboarder = new Keyboarder();
	
	document.addEventListener('keydown', keyboarder.keyDownHandler);
	document.addEventListener('keyup', keyboarder.keyUpHandler);
	
	function startGame() {
	  var game = new Game(ctx, canvas, keyboarder);
	
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
	var BurgerLayer = __webpack_require__(6);
	
	var Game = function () {
	  function Game(ctx, canvas, keyboarder) {
	    _classCallCheck(this, Game);
	
	    this.ctx = ctx;
	    this.canvas = canvas;
	    this.keyboarder = keyboarder;
	    this.ladder = new Ladder(this.ctx);
	    this.platform = new Platform(this.ctx);
	    this.burgerLayers = new BurgerLayer(this.ctx);
	    this.plates = new Plates(this.ctx);
	    this.hero = new Hero(this.ctx, this.keyboarder, this.ladder, this.platform, this.burgerLayers, this.plates);
	  }
	
	  _createClass(Game, [{
	    key: 'drawGame',
	    value: function drawGame() {
	      drawText(this.ctx);
	      this.platform.draw();
	      this.ladder.draw();
	      this.burgerLayers.draw();
	      this.plates.draw();
	      this.hero.draw();
	    }
	  }, {
	    key: 'gameLoop',
	    value: function gameLoop() {
	      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      this.drawGame();
	      this.hero.update();
	      this.hero.onALadder();
	      this.hero.onAPlatform();
	      this.hero.onABurger();
	      this.gameLoop = this.gameLoop.bind(this);
	      requestAnimationFrame(this.gameLoop);
	    }
	  }]);
	
	  return Game;
	}();
	
	function drawText(ctx) {
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
	
	module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Hero = function () {
	  function Hero(ctx, keyboarder, ladder, platform, burgerLayer, plates) {
	    _classCallCheck(this, Hero);
	
	    this.x = 475;
	    this.y = 525;
	    this.ctx = ctx;
	    this.onLadder = false;
	    this.onPlatform = false;
	    this.keyboarder = keyboarder;
	    this.platform = platform;
	    this.ladder = ladder;
	    this.burgerLayer = burgerLayer;
	    this.plates = plates;
	    this.update = this.update.bind(this);
	  }
	
	  _createClass(Hero, [{
	    key: 'draw',
	    value: function draw() {
	      this.ctx.fillStyle = '#9a00fc';
	      this.ctx.fillRect(this.x, this.y, 40, 55);
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
	
	      //disable down on bottom platform
	      if (currentPlatform.length > 0 && currentPlatform[0].l === 8) {
	        this.keyboarder.disableDown();
	      } else {
	        this.keyboarder.enableDown();
	      }
	
	      //enable down on top platform & disable up
	      if (currentPlatform.length > 0 && currentPlatform[0].l === 1) {
	        this.keyboarder.enableDown();
	        this.keyboarder.disableUp();
	      } else {
	        this.keyboarder.enableUp();
	        this.keyboarder.enableDown();
	      }
	
	      //if on platform enable left and right
	      if (currentPlatform.length > 0 && this.x > currentPlatform[0].x) {
	        this.keyboarder.enableLeft();
	        this.keyboarder.enableRight();
	      }
	
	      // if on left of platform disable left
	      if (currentPlatform.length > 0 && this.x === currentPlatform[0].x) {
	        this.keyboarder.disableLeft();
	        this.keyboarder.enableRight();
	      }
	
	      // if on left of platform disable right
	      if (currentPlatform.length > 0 && this.x + 40 === currentPlatform[0].x + currentPlatform[0].w) {
	        this.keyboarder.disableRight();
	        this.keyboarder.enableLeft();
	      }
	    }
	  }, {
	    key: 'onABurger',
	    value: function onABurger() {
	      var _this3 = this;
	
	      var currentBurger = this.burgerLayer.burgerLayers.filter(function (i) {
	        return _this3.x >= i.x && _this3.x + 40 <= i.x + i.w && i.y + 10 === _this3.y + 55;
	      });
	
	      if (currentBurger.length > 0 && this.x === currentBurger[0].x && currentBurger[0].smushLeft === 0) {
	        currentBurger[0].smushLeft = 1;
	        currentBurger[0].smushCount++;
	      }
	
	      if (currentBurger.length > 0 && this.x + 40 === currentBurger[0].x + currentBurger[0].w && currentBurger[0].smushRight === 0) {
	        currentBurger[0].smushRight = 1;
	        currentBurger[0].smushCount++;
	      }
	
	      if (currentBurger.length > 0 && currentBurger[0].smushCount === 2 && currentBurger[0].y + 10 === 580) {
	        var currentPlate = this.plates.plates.filter(function (i) {
	          return currentBurger[0].x === i.x + 5;
	        });
	        var currentPlateCount = currentPlate[0].count;
	
	        currentBurger[0].y = currentPlate[0].y - 10 - 20 * currentPlateCount;
	        currentPlate[0].count++;
	      } else if (currentBurger.length > 0 && currentBurger[0].smushCount === 2) {
	        var platformArray = this.platform.platforms;
	        var currentPlatform = this.platform.platforms.filter(function (i) {
	          return i.y === _this3.y + 55 && i.x <= _this3.x && _this3.x + 40 <= i.x + i.w;
	        });
	        var nextPlatform = platformArray.find(function (i) {
	          return currentBurger[0].x > i.x && i.x + i.w > currentBurger[0].x && i.l > currentPlatform[0].l;
	        });
	
	        var burgerOnNextPlatform = this.burgerLayer.burgerLayers.find(function (i) {
	          return i.y + i.h < nextPlatform.y + nextPlatform.h && nextPlatform.y < i.y + i.h && i.x === currentBurger[0].x;
	        });
	
	        // if (burgerOnNextPlatform) {
	        //   let belowNextPlatform = platformArray.find(i => burgerOnNextPlatform.x > i.x && (i.x + i.w) > burgerOnNextPlatform.x && i.l > nextPlatform.l)
	
	        //   burgerOnNextPlatform.y = belowNextPlatform.y - 10;
	        // } else if (!burgerOnNextPlatform) {
	        //   currentBurger[0].y = nextPlatform.y - 10;
	        //   currentBurger[0].smushRight = 0;
	        //   currentBurger[0].smushLeft = 0;
	        //   currentBurger[0].smushCount = 0;
	        // }
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      if (this.keyboarder.isDown('right') && !this.keyboarder.rightDisabled) {
	        this.x++;
	      } else if (this.keyboarder.isDown('left') && !this.keyboarder.leftDisabled) {
	        this.x--;
	      } else if (this.keyboarder.isDown('up') && this.onLadder && !this.keyboarder.upDisabled) {
	        this.y--;
	      } else if (this.keyboarder.isDown('down') && this.onLadder && !this.keyboarder.downDisabled) {
	        this.y++;
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
	  function Ladders(ctx) {
	    _classCallCheck(this, Ladders);
	
	    var width = 30;
	
	    this.ctx = ctx;
	    this.ladders = [{ x: 65, y: 490, w: width, h: 90 }, { x: 65, y: 325, w: width, h: 155 }, { x: 65, y: 130, w: width, h: 75 }, { x: 175, y: 325, w: width, h: 155 }, { x: 175, y: 215, w: width, h: 100 }, { x: 285, y: 490, w: width, h: 90 }, { x: 285, y: 380, w: width, h: 100 }, { x: 285, y: 325, w: width, h: 45 }, { x: 285, y: 270, w: width, h: 45 }, { x: 285, y: 215, w: width, h: 45 }, { x: 285, y: 130, w: width, h: 75 }, { x: 385, y: 130, w: width, h: 130 }, { x: 480, y: 490, w: width, h: 90 }, { x: 480, y: 380, w: width, h: 100 }, { x: 480, y: 270, w: width, h: 100 }, { x: 480, y: 215, w: width, h: 45 }, { x: 480, y: 130, w: width, h: 75 }, { x: 590, y: 215, w: width, h: 155 }, { x: 685, y: 490, w: width, h: 90 }, { x: 685, y: 435, w: width, h: 45 }, { x: 685, y: 380, w: width, h: 45 }, { x: 685, y: 325, w: width, h: 45 }, { x: 685, y: 215, w: width, h: 100 }, { x: 685, y: 130, w: width, h: 75 }, { x: 800, y: 435, w: width, h: 145 }, { x: 800, y: 325, w: width, h: 100 }, { x: 900, y: 435, w: width, h: 145 }, { x: 900, y: 325, w: width, h: 100 }, { x: 900, y: 215, w: width, h: 100 }, { x: 900, y: 130, w: width, h: 75 }];
	  }
	
	  _createClass(Ladders, [{
	    key: 'draw',
	    value: function draw() {
	      var _this = this;
	
	      this.ctx.fillStyle = '#ddd';
	      this.ladders.map(function (ladder) {
	        _this.ctx.fillRect(ladder.x, ladder.y, ladder.w, ladder.h);
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
	  function Platforms(ctx) {
	    _classCallCheck(this, Platforms);
	
	    var height = 10;
	
	    this.ctx = ctx;
	    this.platforms = [
	    //top level
	    { x: 60, y: 120, w: 880, h: height, l: 1 },
	    //second level
	    { x: 60, y: 205, w: 270, h: height, l: 2 }, { x: 475, y: 205, w: 465, h: height, l: 2 },
	    //third level
	    { x: 265, y: 260, w: 255, h: height, l: 3 },
	    //fourth level
	    { x: 60, y: 315, w: 270, h: height, l: 4 }, { x: 680, y: 315, w: 260, h: height, l: 4 },
	    //fifth level
	    { x: 265, y: 370, w: 460, h: height, l: 5 },
	    //sixth level
	    { x: 680, y: 425, w: 260, h: height, l: 6 },
	    //sevent level
	    { x: 60, y: 480, w: 660, h: height, l: 7 },
	    //eighth level
	    { x: 60, y: 580, w: 870, h: height, l: 8 }];
	  }
	
	  _createClass(Platforms, [{
	    key: 'draw',
	    value: function draw() {
	      var _this = this;
	
	      this.ctx.fillStyle = '#00fff6';
	      this.platforms.map(function (platform) {
	        _this.ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
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
	  function Plates(ctx) {
	    _classCallCheck(this, Plates);
	
	    var width = 135;
	    var height = 5;
	    var posY = 675;
	
	    this.ctx = ctx;
	    this.plates = [{ x: 120, y: posY, w: width, h: height, count: 0 }, { x: 330, y: posY, w: width, h: height, count: 0 }, { x: 530, y: posY, w: width, h: height, count: 0 }, { x: 745, y: posY, w: width, h: height, count: 0 }];
	  }
	
	  _createClass(Plates, [{
	    key: 'draw',
	    value: function draw() {
	      var _this = this;
	
	      this.ctx.fillStyle = '#ddd';
	      this.plates.map(function (plate) {
	        _this.ctx.fillRect(plate.x, plate.y, plate.w, plate.h);
	      });
	    }
	  }]);
	
	  return Plates;
	}();
	
	;
	
	module.exports = Plates;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BurgerLayer = function () {
	  function BurgerLayer(ctx) {
	    _classCallCheck(this, BurgerLayer);
	
	    this.ctx = ctx;
	    this.smushCount = 0;
	    var width = 125;
	    var height = 15;
	
	    this.burgerLayers = [{ x: 125, y: 570, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }, { x: 125, y: 470, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }, { x: 125, y: 305, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }, { x: 125, y: 195, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }, { x: 335, y: 570, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }, { x: 335, y: 470, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }, { x: 335, y: 360, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }, { x: 335, y: 110, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }, { x: 535, y: 570, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }, { x: 535, y: 360, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }, { x: 535, y: 195, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }, { x: 535, y: 110, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }, { x: 750, y: 415, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }, { x: 750, y: 305, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }, { x: 750, y: 195, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }, { x: 750, y: 110, w: width, h: height, smushLeft: 0, smushRight: 0, smushCount: 0 }];
	  }
	
	  _createClass(BurgerLayer, [{
	    key: 'draw',
	    value: function draw() {
	      var _this = this;
	
	      this.ctx.fillStyle = '#ffae00';
	      this.burgerLayers.map(function (burgerLayer) {
	        _this.ctx.fillRect(burgerLayer.x, burgerLayer.y, burgerLayer.w, burgerLayer.h);
	      });
	    }
	  }]);
	
	  return BurgerLayer;
	}();
	
	module.exports = BurgerLayer;

/***/ }),
/* 7 */
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
	    this.leftDisabled = false;
	    this.rightDisabled = false;
	    this.upDisabled = false;
	    this.downDisabled = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDc0MDQ3MzAzNjZkOTkxYzJkYTUiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9HYW1lLmpzIiwid2VicGFjazovLy8uL2xpYi9IZXJvLmpzIiwid2VicGFjazovLy8uL2xpYi9MYWRkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL1BsYXRmb3JtLmpzIiwid2VicGFjazovLy8uL2xpYi9QbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvQnVyZ2VyTGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL0tleWJvYXJkZXIuanMiXSwibmFtZXMiOlsiR2FtZSIsInJlcXVpcmUiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsIktleWJvYXJkZXIiLCJrZXlib2FyZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImtleURvd25IYW5kbGVyIiwia2V5VXBIYW5kbGVyIiwic3RhcnRHYW1lIiwiZ2FtZSIsImdhbWVMb29wIiwiSGVybyIsIkxhZGRlciIsIlBsYXRmb3JtIiwiUGxhdGVzIiwiQnVyZ2VyTGF5ZXIiLCJsYWRkZXIiLCJwbGF0Zm9ybSIsImJ1cmdlckxheWVycyIsInBsYXRlcyIsImhlcm8iLCJkcmF3VGV4dCIsImRyYXciLCJjbGVhclJlY3QiLCJ3aWR0aCIsImhlaWdodCIsImRyYXdHYW1lIiwidXBkYXRlIiwib25BTGFkZGVyIiwib25BUGxhdGZvcm0iLCJvbkFCdXJnZXIiLCJiaW5kIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZm9udCIsImZpbGxTdHlsZSIsImZpbGxUZXh0IiwibW9kdWxlIiwiZXhwb3J0cyIsImJ1cmdlckxheWVyIiwieCIsInkiLCJvbkxhZGRlciIsIm9uUGxhdGZvcm0iLCJmaWxsUmVjdCIsImN1cnJlbnRMYWRkZXIiLCJsYWRkZXJzIiwiZmlsdGVyIiwiaSIsImgiLCJsZW5ndGgiLCJkaXNhYmxlTGVmdCIsImRpc2FibGVSaWdodCIsImVuYWJsZUxlZnQiLCJlbmFibGVSaWdodCIsImN1cnJlbnRQbGF0Zm9ybSIsInBsYXRmb3JtcyIsInciLCJsIiwiZGlzYWJsZURvd24iLCJlbmFibGVEb3duIiwiZGlzYWJsZVVwIiwiZW5hYmxlVXAiLCJjdXJyZW50QnVyZ2VyIiwic211c2hMZWZ0Iiwic211c2hDb3VudCIsInNtdXNoUmlnaHQiLCJjdXJyZW50UGxhdGUiLCJjdXJyZW50UGxhdGVDb3VudCIsImNvdW50IiwicGxhdGZvcm1BcnJheSIsIm5leHRQbGF0Zm9ybSIsImZpbmQiLCJidXJnZXJPbk5leHRQbGF0Zm9ybSIsImlzRG93biIsInJpZ2h0RGlzYWJsZWQiLCJsZWZ0RGlzYWJsZWQiLCJ1cERpc2FibGVkIiwiZG93bkRpc2FibGVkIiwiTGFkZGVycyIsIm1hcCIsIlBsYXRmb3JtcyIsInBvc1kiLCJwbGF0ZSIsImtleSIsImxlZnQiLCJyaWdodCIsInVwIiwiZG93biIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImtleUNvZGUiLCJkaXNhYmxlTGVmdFJpZ2h0IiwiaW5wdXQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsS0FBTUEsT0FBTyxtQkFBQUMsQ0FBUSxDQUFSLENBQWI7QUFDQSxLQUFNQyxTQUFTQyxTQUFTQyxjQUFULENBQXdCLFFBQXhCLENBQWY7QUFDQSxLQUFNQyxNQUFNSCxPQUFPSSxVQUFQLENBQWtCLElBQWxCLENBQVo7QUFDQSxLQUFNQyxhQUFhLG1CQUFBTixDQUFRLENBQVIsQ0FBbkI7QUFDQSxLQUFNTyxhQUFhLElBQUlELFVBQUosRUFBbkI7O0FBRUFKLFVBQVNNLGdCQUFU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S0QsWUFBTCxHQUFvQixLQUFwQjtBQUNEOzs7bUNBRWE7QUFDWixZQUFLRCxhQUFMLEdBQXFCLEtBQXJCO0FBQ0Q7OztrQ0FFWTtBQUNYLFlBQUtHLFlBQUwsR0FBb0IsS0FBcEI7QUFDRDs7O2dDQUVVO0FBQ1QsWUFBS0QsVUFBTCxHQUFrQixLQUFsQjtBQUNEOzs7Ozs7QUFHSHhDLFFBQU9DLE9BQVAsR0FBaUJsQyxVQUFqQixDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDc0MDQ3MzAzNjZkOTkxYzJkYTUiLCJjb25zdCBHYW1lID0gcmVxdWlyZSgnLi9HYW1lJyk7XG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmNvbnN0IEtleWJvYXJkZXIgPSByZXF1aXJlKCcuL0tleWJvYXJkZXInKTtcbmNvbnN0IGtleWJvYXJkZXIgPSBuZXcgS2V5Ym9hcmRlcigpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmRlci5rZXlEb3duSGFuZGxlcik7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGtleWJvYXJkZXIua2V5VXBIYW5kbGVyKTtcblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBjb25zdCBnYW1lID0gbmV3IEdhbWUoY3R4LCBjYW52YXMsIGtleWJvYXJkZXIpO1xuXG4gIGdhbWUuZ2FtZUxvb3AoKTtcbn1cblxuc3RhcnRHYW1lKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2luZGV4LmpzIiwiY29uc3QgSGVybyA9IHJlcXVpcmUoJy4vSGVybycpO1xuLy8gY29uc3QgRW5lbXkgPSByZXF1aXJlKCcuL0VuZW15Jyk7XG5jb25zdCBMYWRkZXIgPSByZXF1aXJlKCcuL0xhZGRlcicpO1xuY29uc3QgUGxhdGZvcm0gPSByZXF1aXJlKCcuL1BsYXRmb3JtJyk7XG5jb25zdCBQbGF0ZXMgPSByZXF1aXJlKCcuL1BsYXRlJyk7XG5jb25zdCBCdXJnZXJMYXllciA9IHJlcXVpcmUoJy4vQnVyZ2VyTGF5ZXInKTtcblxuXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoY3R4LCBjYW52YXMsIGtleWJvYXJkZXIpIHtcbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLmtleWJvYXJkZXIgPSBrZXlib2FyZGVyO1xuICAgIHRoaXMubGFkZGVyID0gbmV3IExhZGRlcih0aGlzLmN0eCk7XG4gICAgdGhpcy5wbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybSh0aGlzLmN0eCk7XG4gICAgdGhpcy5idXJnZXJMYXllcnMgPSBuZXcgQnVyZ2VyTGF5ZXIodGhpcy5jdHgpO1xuICAgIHRoaXMucGxhdGVzID0gbmV3IFBsYXRlcyh0aGlzLmN0eCk7XG4gICAgdGhpcy5oZXJvID0gbmV3IEhlcm8odGhpcy5jdHgsIHRoaXMua2V5Ym9hcmRlciwgdGhpcy5sYWRkZXIsIHRoaXMucGxhdGZvcm0sIHRoaXMuYnVyZ2VyTGF5ZXJzLCB0aGlzLnBsYXRlcyk7XG4gIH0gXG5cbiAgZHJhd0dhbWUoKSB7XG4gICAgZHJhd1RleHQodGhpcy5jdHgpO1xuICAgIHRoaXMucGxhdGZvcm0uZHJhdygpO1xuICAgIHRoaXMubGFkZGVyLmRyYXcoKTtcbiAgICB0aGlzLmJ1cmdlckxheWVycy5kcmF3KCk7XG4gICAgdGhpcy5wbGF0ZXMuZHJhdygpO1xuICAgIHRoaXMuaGVyby5kcmF3KCk7XG4gIH1cblxuICBnYW1lTG9vcCgpIHtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgdGhpcy5kcmF3R2FtZSgpO1xuICAgIHRoaXMuaGVyby51cGRhdGUoKTtcbiAgICB0aGlzLmhlcm8ub25BTGFkZGVyKCk7XG4gICAgdGhpcy5oZXJvLm9uQVBsYXRmb3JtKCk7XG4gICAgdGhpcy5oZXJvLm9uQUJ1cmdlcigpO1xuICAgIHRoaXMuZ2FtZUxvb3AgPSB0aGlzLmdhbWVMb29wLmJpbmQodGhpcyk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZ2FtZUxvb3ApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRyYXdUZXh0KGN0eCkge1xuICAvL3BsYXllclxuICBjdHguZm9udCA9IFwiMjBweCBBcmlhbFwiO1xuICBjdHguZmlsbFN0eWxlID0gXCIjZjAwXCI7XG4gIGN0eC5maWxsVGV4dChcIlBsYXllclwiLCA2NSwgNTApO1xuXG4gIC8vc2NvcmVcbiAgY3R4LmZpbGxUZXh0KFwiU2NvcmU6XCIsIDI3MCwgNTApO1xuXG4gIC8vaGlnaCBzY29yZVxuICBjdHguZmlsbFRleHQoXCJIaS1TY29yZTpcIiwgNDcwLCA1MCk7XG5cbiAgLy9saXZlc1xuICBjdHguZmlsbFN0eWxlID0gXCIjZmZmXCI7XG4gIGN0eC5maWxsVGV4dChcIkxpdmVzOlwiLCA4NTAsIDUwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9HYW1lLmpzIiwiY2xhc3MgSGVybyB7XG4gIGNvbnN0cnVjdG9yKGN0eCwga2V5Ym9hcmRlciwgbGFkZGVyLCBwbGF0Zm9ybSwgYnVyZ2VyTGF5ZXIsIHBsYXRlcykge1xuICAgIHRoaXMueCA9IDQ3NTtcbiAgICB0aGlzLnkgPSA1MjU7XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy5vbkxhZGRlciA9IGZhbHNlO1xuICAgIHRoaXMub25QbGF0Zm9ybSA9IGZhbHNlO1xuICAgIHRoaXMua2V5Ym9hcmRlciA9IGtleWJvYXJkZXI7XG4gICAgdGhpcy5wbGF0Zm9ybSA9IHBsYXRmb3JtO1xuICAgIHRoaXMubGFkZGVyID0gbGFkZGVyO1xuICAgIHRoaXMuYnVyZ2VyTGF5ZXIgPSBidXJnZXJMYXllcjtcbiAgICB0aGlzLnBsYXRlcyA9IHBsYXRlcztcbiAgICB0aGlzLnVwZGF0ZSA9IHRoaXMudXBkYXRlLmJpbmQodGhpcyk7XG4gIH1cblxuICBkcmF3KCkge1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjOWEwMGZjJztcbiAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgNDAsIDU1KTtcbiAgfVxuXG4gIG9uQUxhZGRlcigpIHtcbiAgICBsZXQgY3VycmVudExhZGRlciA9IFxuICAgIHRoaXMubGFkZGVyLmxhZGRlcnMuZmlsdGVyKGkgPT4gaS54ID49IHRoaXMueCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkueCArIDMwIDw9IHRoaXMueCArIDQwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55ICsgNTUgPD0gaS55ICsgaS5oICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55ID49IGkueSAtIDY1KTtcblxuICAgIGlmIChjdXJyZW50TGFkZGVyLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMua2V5Ym9hcmRlci5kaXNhYmxlTGVmdCgpO1xuICAgICAgdGhpcy5rZXlib2FyZGVyLmRpc2FibGVSaWdodCgpO1xuICAgICAgdGhpcy5vbkxhZGRlciA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMua2V5Ym9hcmRlci5lbmFibGVMZWZ0KCk7XG4gICAgICB0aGlzLmtleWJvYXJkZXIuZW5hYmxlUmlnaHQoKTtcbiAgICAgIHRoaXMub25MYWRkZXIgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBvbkFQbGF0Zm9ybSgpIHtcbiAgICBsZXQgY3VycmVudFBsYXRmb3JtID0gXG4gICAgdGhpcy5wbGF0Zm9ybS5wbGF0Zm9ybXMuZmlsdGVyKGkgPT4gaS55ID09PSB0aGlzLnkgKyA1NSAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaS54IDw9IHRoaXMueCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54ICsgNDAgPD0gaS54ICsgaS53KTtcblxuICAgIC8vZGlzYWJsZSBkb3duIG9uIGJvdHRvbSBwbGF0Zm9ybVxuICAgIGlmIChjdXJyZW50UGxhdGZvcm0ubGVuZ3RoID4gMCAmJiBjdXJyZW50UGxhdGZvcm1bMF0ubCA9PT0gOCkge1xuICAgICAgdGhpcy5rZXlib2FyZGVyLmRpc2FibGVEb3duKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMua2V5Ym9hcmRlci5lbmFibGVEb3duKCk7XG4gICAgfVxuXG4gICAgLy9lbmFibGUgZG93biBvbiB0b3AgcGxhdGZvcm0gJiBkaXNhYmxlIHVwXG4gICAgaWYgKGN1cnJlbnRQbGF0Zm9ybS5sZW5ndGggPiAwICYmIGN1cnJlbnRQbGF0Zm9ybVswXS5sID09PSAxKSB7XG4gICAgICB0aGlzLmtleWJvYXJkZXIuZW5hYmxlRG93bigpO1xuICAgICAgdGhpcy5rZXlib2FyZGVyLmRpc2FibGVVcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmtleWJvYXJkZXIuZW5hYmxlVXAoKTtcbiAgICAgIHRoaXMua2V5Ym9hcmRlci5lbmFibGVEb3duKCk7XG4gICAgfVxuXG4gICAgLy9pZiBvbiBwbGF0Zm9ybSBlbmFibGUgbGVmdCBhbmQgcmlnaHRcbiAgICBpZiAoY3VycmVudFBsYXRmb3JtLmxlbmd0aCA+IDAgJiYgdGhpcy54ID4gY3VycmVudFBsYXRmb3JtWzBdLngpIHtcbiAgICAgIHRoaXMua2V5Ym9hcmRlci5lbmFibGVMZWZ0KCk7XG4gICAgICB0aGlzLmtleWJvYXJkZXIuZW5hYmxlUmlnaHQoKTtcbiAgICB9IFxuXG4gICAgLy8gaWYgb24gbGVmdCBvZiBwbGF0Zm9ybSBkaXNhYmxlIGxlZnRcbiAgICBpZiAoY3VycmVudFBsYXRmb3JtLmxlbmd0aCA+IDAgJiYgdGhpcy54ID09PSBjdXJyZW50UGxhdGZvcm1bMF0ueCkge1xuICAgICAgdGhpcy5rZXlib2FyZGVyLmRpc2FibGVMZWZ0KCk7XG4gICAgICB0aGlzLmtleWJvYXJkZXIuZW5hYmxlUmlnaHQoKTtcbiAgICB9XG5cbiAgICAvLyBpZiBvbiBsZWZ0IG9mIHBsYXRmb3JtIGRpc2FibGUgcmlnaHRcbiAgICBpZiAoY3VycmVudFBsYXRmb3JtLmxlbmd0aCA+IDAgJiYgdGhpcy54ICsgNDAgPT09IGN1cnJlbnRQbGF0Zm9ybVswXS54ICsgY3VycmVudFBsYXRmb3JtWzBdLncpIHtcbiAgICAgIHRoaXMua2V5Ym9hcmRlci5kaXNhYmxlUmlnaHQoKTtcbiAgICAgIHRoaXMua2V5Ym9hcmRlci5lbmFibGVMZWZ0KCk7XG4gICAgfVxuICB9XG5cbiAgb25BQnVyZ2VyKCkge1xuICAgIGxldCBjdXJyZW50QnVyZ2VyID0gdGhpcy5idXJnZXJMYXllci5idXJnZXJMYXllcnMuZmlsdGVyKGkgPT4gdGhpcy54ID49IGkueCAmJiB0aGlzLnggKyA0MCA8PSBpLnggKyBpLncgJiYgaS55ICsgMTAgPT09IHRoaXMueSArIDU1KTtcblxuICAgIGlmIChjdXJyZW50QnVyZ2VyLmxlbmd0aCA+IDAgJiYgdGhpcy54ID09PSBjdXJyZW50QnVyZ2VyWzBdLnggJiYgY3VycmVudEJ1cmdlclswXS5zbXVzaExlZnQgPT09IDApIHtcbiAgICAgIGN1cnJlbnRCdXJnZXJbMF0uc211c2hMZWZ0ID0gMTtcbiAgICAgIGN1cnJlbnRCdXJnZXJbMF0uc211c2hDb3VudCsrO1xuICAgIH1cbiAgIFxuICAgIGlmIChjdXJyZW50QnVyZ2VyLmxlbmd0aCA+IDAgJiYgdGhpcy54ICsgNDAgPT09IGN1cnJlbnRCdXJnZXJbMF0ueCArIGN1cnJlbnRCdXJnZXJbMF0udyAmJiBjdXJyZW50QnVyZ2VyWzBdLnNtdXNoUmlnaHQgPT09IDApIHtcbiAgICAgIGN1cnJlbnRCdXJnZXJbMF0uc211c2hSaWdodCA9IDE7XG4gICAgICBjdXJyZW50QnVyZ2VyWzBdLnNtdXNoQ291bnQrKztcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudEJ1cmdlci5sZW5ndGggPiAwICYmIGN1cnJlbnRCdXJnZXJbMF0uc211c2hDb3VudCA9PT0gMiAmJiBjdXJyZW50QnVyZ2VyWzBdLnkgKyAxMCA9PT0gNTgwKSB7XG4gICAgICBsZXQgY3VycmVudFBsYXRlID0gdGhpcy5wbGF0ZXMucGxhdGVzLmZpbHRlcihpID0+IGN1cnJlbnRCdXJnZXJbMF0ueCA9PT0gaS54ICsgNSk7XG4gICAgICBsZXQgY3VycmVudFBsYXRlQ291bnQgPSBjdXJyZW50UGxhdGVbMF0uY291bnQ7XG4gICAgIFxuICAgICAgY3VycmVudEJ1cmdlclswXS55ID0gY3VycmVudFBsYXRlWzBdLnkgLSAxMCAtICgyMCAqIGN1cnJlbnRQbGF0ZUNvdW50KTtcbiAgICAgIGN1cnJlbnRQbGF0ZVswXS5jb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEJ1cmdlci5sZW5ndGggPiAwICYmIGN1cnJlbnRCdXJnZXJbMF0uc211c2hDb3VudCA9PT0gMiApIHtcbiAgICAgIGxldCBwbGF0Zm9ybUFycmF5ID0gdGhpcy5wbGF0Zm9ybS5wbGF0Zm9ybXM7XG4gICAgICBsZXQgY3VycmVudFBsYXRmb3JtID0gdGhpcy5wbGF0Zm9ybS5wbGF0Zm9ybXMuZmlsdGVyKGkgPT4gaS55ID09PSB0aGlzLnkgKyA1NSAmJiBpLnggPD0gdGhpcy54ICYmIHRoaXMueCArIDQwIDw9IGkueCArIGkudyk7XG4gICAgICBsZXQgbmV4dFBsYXRmb3JtID0gcGxhdGZvcm1BcnJheS5maW5kKGkgPT4gY3VycmVudEJ1cmdlclswXS54ID4gaS54ICYmIChpLnggKyBpLncpID4gY3VycmVudEJ1cmdlclswXS54ICYmIGkubCA+IGN1cnJlbnRQbGF0Zm9ybVswXS5sKVxuICAgICAgXG4gICAgICBsZXQgYnVyZ2VyT25OZXh0UGxhdGZvcm0gPSB0aGlzLmJ1cmdlckxheWVyLmJ1cmdlckxheWVycy5maW5kKGkgPT4gaS55ICsgaS5oIDwgbmV4dFBsYXRmb3JtLnkgKyBuZXh0UGxhdGZvcm0uaCAmJiBuZXh0UGxhdGZvcm0ueSA8IGkueSArIGkuaCAmJiBpLnggPT09IGN1cnJlbnRCdXJnZXJbMF0ueClcblxuXG4gICAgICAvLyBpZiAoYnVyZ2VyT25OZXh0UGxhdGZvcm0pIHtcbiAgICAgIC8vICAgbGV0IGJlbG93TmV4dFBsYXRmb3JtID0gcGxhdGZvcm1BcnJheS5maW5kKGkgPT4gYnVyZ2VyT25OZXh0UGxhdGZvcm0ueCA+IGkueCAmJiAoaS54ICsgaS53KSA+IGJ1cmdlck9uTmV4dFBsYXRmb3JtLnggJiYgaS5sID4gbmV4dFBsYXRmb3JtLmwpXG4gICAgICAgIFxuICAgICAgLy8gICBidXJnZXJPbk5leHRQbGF0Zm9ybS55ID0gYmVsb3dOZXh0UGxhdGZvcm0ueSAtIDEwO1xuICAgICAgLy8gfSBlbHNlIGlmICghYnVyZ2VyT25OZXh0UGxhdGZvcm0pIHtcbiAgICAgIC8vICAgY3VycmVudEJ1cmdlclswXS55ID0gbmV4dFBsYXRmb3JtLnkgLSAxMDtcbiAgICAgIC8vICAgY3VycmVudEJ1cmdlclswXS5zbXVzaFJpZ2h0ID0gMDtcbiAgICAgIC8vICAgY3VycmVudEJ1cmdlclswXS5zbXVzaExlZnQgPSAwO1xuICAgICAgLy8gICBjdXJyZW50QnVyZ2VyWzBdLnNtdXNoQ291bnQgPSAwO1xuICAgICAgLy8gfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5rZXlib2FyZGVyLmlzRG93bigncmlnaHQnKSAmJiAhdGhpcy5rZXlib2FyZGVyLnJpZ2h0RGlzYWJsZWQpIHtcbiAgICAgIHRoaXMueCsrO1xuICAgIH0gZWxzZSBpZiAodGhpcy5rZXlib2FyZGVyLmlzRG93bignbGVmdCcpICYmICF0aGlzLmtleWJvYXJkZXIubGVmdERpc2FibGVkKSB7XG4gICAgICB0aGlzLngtLTtcbiAgICB9IGVsc2UgaWYgKHRoaXMua2V5Ym9hcmRlci5pc0Rvd24oJ3VwJykgJiYgdGhpcy5vbkxhZGRlciAmJiAhdGhpcy5rZXlib2FyZGVyLnVwRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMueS0tO1xuICAgIH0gZWxzZSBpZiAodGhpcy5rZXlib2FyZGVyLmlzRG93bignZG93bicpICYmIHRoaXMub25MYWRkZXIgJiYgIXRoaXMua2V5Ym9hcmRlci5kb3duRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMueSsrO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlcm87XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0hlcm8uanMiLCJjbGFzcyBMYWRkZXJzIHtcbiAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgbGV0IHdpZHRoID0gMzA7XG5cbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLmxhZGRlcnMgPSBbXG4gICAgICB7eDogNjUsIHk6IDQ5MCwgdzogd2lkdGgsIGg6IDkwfSxcbiAgICAgIHt4OiA2NSwgeTogMzI1LCB3OiB3aWR0aCwgaDogMTU1fSxcbiAgICAgIHt4OiA2NSwgeTogMTMwLCB3OiB3aWR0aCwgaDogNzV9LFxuICAgICAge3g6IDE3NSwgeTogMzI1LCB3OiB3aWR0aCwgaDogMTU1fSxcbiAgICAgIHt4OiAxNzUsIHk6IDIxNSwgdzogd2lkdGgsIGg6IDEwMH0sXG4gICAgICB7eDogMjg1LCB5OiA0OTAsIHc6IHdpZHRoLCBoOiA5MH0sXG4gICAgICB7eDogMjg1LCB5OiAzODAsIHc6IHdpZHRoLCBoOiAxMDB9LFxuICAgICAge3g6IDI4NSwgeTogMzI1LCB3OiB3aWR0aCwgaDogNDV9LFxuICAgICAge3g6IDI4NSwgeTogMjcwLCB3OiB3aWR0aCwgaDogNDV9LFxuICAgICAge3g6IDI4NSwgeTogMjE1LCB3OiB3aWR0aCwgaDogNDV9LFxuICAgICAge3g6IDI4NSwgeTogMTMwLCB3OiB3aWR0aCwgaDogNzV9LFxuICAgICAge3g6IDM4NSwgeTogMTMwLCB3OiB3aWR0aCwgaDogMTMwfSxcbiAgICAgIHt4OiA0ODAsIHk6IDQ5MCwgdzogd2lkdGgsIGg6IDkwfSxcbiAgICAgIHt4OiA0ODAsIHk6IDM4MCwgdzogd2lkdGgsIGg6IDEwMH0sXG4gICAgICB7eDogNDgwLCB5OiAyNzAsIHc6IHdpZHRoLCBoOiAxMDB9LFxuICAgICAge3g6IDQ4MCwgeTogMjE1LCB3OiB3aWR0aCwgaDogNDV9LFxuICAgICAge3g6IDQ4MCwgeTogMTMwLCB3OiB3aWR0aCwgaDogNzV9LFxuICAgICAge3g6IDU5MCwgeTogMjE1LCB3OiB3aWR0aCwgaDogMTU1fSxcbiAgICAgIHt4OiA2ODUsIHk6IDQ5MCwgdzogd2lkdGgsIGg6IDkwfSxcbiAgICAgIHt4OiA2ODUsIHk6IDQzNSwgdzogd2lkdGgsIGg6IDQ1fSxcbiAgICAgIHt4OiA2ODUsIHk6IDM4MCwgdzogd2lkdGgsIGg6IDQ1fSxcbiAgICAgIHt4OiA2ODUsIHk6IDMyNSwgdzogd2lkdGgsIGg6IDQ1fSxcbiAgICAgIHt4OiA2ODUsIHk6IDIxNSwgdzogd2lkdGgsIGg6IDEwMH0sXG4gICAgICB7eDogNjg1LCB5OiAxMzAsIHc6IHdpZHRoLCBoOiA3NX0sXG4gICAgICB7eDogODAwLCB5OiA0MzUsIHc6IHdpZHRoLCBoOiAxNDV9LFxuICAgICAge3g6IDgwMCwgeTogMzI1LCB3OiB3aWR0aCwgaDogMTAwfSxcbiAgICAgIHt4OiA5MDAsIHk6IDQzNSwgdzogd2lkdGgsIGg6IDE0NX0sXG4gICAgICB7eDogOTAwLCB5OiAzMjUsIHc6IHdpZHRoLCBoOiAxMDB9LFxuICAgICAge3g6IDkwMCwgeTogMjE1LCB3OiB3aWR0aCwgaDogMTAwfSxcbiAgICAgIHt4OiA5MDAsIHk6IDEzMCwgdzogd2lkdGgsIGg6IDc1fSxcbiAgICBdO1xuICB9XG5cbiAgZHJhdygpIHtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI2RkZCc7XG4gICAgdGhpcy5sYWRkZXJzLm1hcChsYWRkZXIgPT4ge1xuICAgICAgdGhpcy5jdHguZmlsbFJlY3QobGFkZGVyLngsIGxhZGRlci55LCBsYWRkZXIudywgbGFkZGVyLmgpO1xuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTGFkZGVycztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvTGFkZGVyLmpzIiwiY2xhc3MgUGxhdGZvcm1zIHtcbiAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gMTA7XG5cbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLnBsYXRmb3JtcyA9IFtcbiAgICAgIC8vdG9wIGxldmVsXG4gICAgICB7eDogNjAsIHk6IDEyMCwgdzogODgwLCBoOiBoZWlnaHQsIGw6IDF9LFxuICAgICAgLy9zZWNvbmQgbGV2ZWxcbiAgICAgIHt4OiA2MCwgeTogMjA1LCB3OiAyNzAsIGg6IGhlaWdodCwgbDogMn0sXG4gICAgICB7eDogNDc1LCB5OiAyMDUsIHc6IDQ2NSwgaDogaGVpZ2h0LCBsOiAyfSxcbiAgICAgIC8vdGhpcmQgbGV2ZWxcbiAgICAgIHt4OiAyNjUsIHk6IDI2MCwgdzogMjU1LCBoOiBoZWlnaHQsIGw6IDN9LFxuICAgICAgLy9mb3VydGggbGV2ZWxcbiAgICAgIHt4OiA2MCwgeTogMzE1LCB3OiAyNzAsIGg6IGhlaWdodCwgbDogNH0sXG4gICAgICB7eDogNjgwLCB5OiAzMTUsIHc6IDI2MCwgaDogaGVpZ2h0LCBsOiA0fSxcbiAgICAgIC8vZmlmdGggbGV2ZWxcbiAgICAgIHt4OiAyNjUsIHk6IDM3MCwgdzogNDYwLCBoOiBoZWlnaHQsIGw6IDV9LFxuICAgICAgLy9zaXh0aCBsZXZlbFxuICAgICAge3g6IDY4MCwgeTogNDI1LCB3OiAyNjAsIGg6IGhlaWdodCwgbDogNn0sXG4gICAgICAvL3NldmVudCBsZXZlbFxuICAgICAge3g6IDYwLCB5OiA0ODAsIHc6IDY2MCwgaDogaGVpZ2h0LCBsOiA3fSxcbiAgICAgIC8vZWlnaHRoIGxldmVsXG4gICAgICB7eDogNjAsIHk6IDU4MCwgdzogODcwLCBoOiBoZWlnaHQsIGw6IDh9XG4gICAgXTtcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyMwMGZmZjYnO1xuICAgIHRoaXMucGxhdGZvcm1zLm1hcChwbGF0Zm9ybSA9PiB7XG4gICAgICB0aGlzLmN0eC5maWxsUmVjdChwbGF0Zm9ybS54LCBwbGF0Zm9ybS55LCBwbGF0Zm9ybS53LCBwbGF0Zm9ybS5oKTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXRmb3JtcztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvUGxhdGZvcm0uanMiLCJjbGFzcyBQbGF0ZXMge1xuICBjb25zdHJ1Y3RvcihjdHgpIHtcbiAgICBjb25zdCB3aWR0aCA9IDEzNTtcbiAgICBjb25zdCBoZWlnaHQgPSA1O1xuICAgIGNvbnN0IHBvc1kgPSA2NzU7XG5cbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLnBsYXRlcyA9IFtcbiAgICAgIHt4OiAxMjAsIHk6IHBvc1ksIHc6IHdpZHRoLCBoOiBoZWlnaHQsIGNvdW50OiAwfSxcbiAgICAgIHt4OiAzMzAsIHk6IHBvc1ksIHc6IHdpZHRoLCBoOiBoZWlnaHQsIGNvdW50OiAwfSxcbiAgICAgIHt4OiA1MzAsIHk6IHBvc1ksIHc6IHdpZHRoLCBoOiBoZWlnaHQsIGNvdW50OiAwfSxcbiAgICAgIHt4OiA3NDUsIHk6IHBvc1ksIHc6IHdpZHRoLCBoOiBoZWlnaHQsIGNvdW50OiAwfVxuICAgIF07XG4gIH07XG5cbiAgZHJhdygpIHtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI2RkZCc7XG4gICAgdGhpcy5wbGF0ZXMubWFwKHBsYXRlID0+IHtcbiAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHBsYXRlLngsIHBsYXRlLnksIHBsYXRlLncsIHBsYXRlLmgpO1xuICAgIH0pO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQbGF0ZXM7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL1BsYXRlLmpzIiwiY2xhc3MgQnVyZ2VyTGF5ZXIge1xuICBjb25zdHJ1Y3RvcihjdHgpIHtcbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLnNtdXNoQ291bnQgPSAwO1xuICAgIGNvbnN0IHdpZHRoID0gMTI1O1xuICAgIGNvbnN0IGhlaWdodCA9IDE1O1xuXG4gICAgdGhpcy5idXJnZXJMYXllcnMgPSBbXG4gICAgICB7eDogMTI1LCB5OiA1NzAsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgICB7eDogMTI1LCB5OiA0NzAsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgICB7eDogMTI1LCB5OiAzMDUsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgICB7eDogMTI1LCB5OiAxOTUsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgICB7eDogMzM1LCB5OiA1NzAsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgICB7eDogMzM1LCB5OiA0NzAsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgICB7eDogMzM1LCB5OiAzNjAsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgICB7eDogMzM1LCB5OiAxMTAsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgICB7eDogNTM1LCB5OiA1NzAsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgICB7eDogNTM1LCB5OiAzNjAsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgICB7eDogNTM1LCB5OiAxOTUsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgICB7eDogNTM1LCB5OiAxMTAsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgICB7eDogNzUwLCB5OiA0MTUsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgICB7eDogNzUwLCB5OiAzMDUsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgICB7eDogNzUwLCB5OiAxOTUsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgICB7eDogNzUwLCB5OiAxMTAsIHc6IHdpZHRoLCBoOiBoZWlnaHQsIHNtdXNoTGVmdDogMCwgc211c2hSaWdodDogMCwgc211c2hDb3VudDogMH0sXG4gICAgXTtcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNmZmFlMDAnO1xuICAgIHRoaXMuYnVyZ2VyTGF5ZXJzLm1hcChidXJnZXJMYXllciA9PiB7XG4gICAgICB0aGlzLmN0eC5maWxsUmVjdChidXJnZXJMYXllci54LCBidXJnZXJMYXllci55LCBidXJnZXJMYXllci53LCBidXJnZXJMYXllci5oKTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1cmdlckxheWVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0J1cmdlckxheWVyLmpzIiwiY2xhc3MgS2V5Ym9hcmRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMua2V5ID0ge1xuICAgICAgbGVmdDogZmFsc2UsXG4gICAgICByaWdodDogZmFsc2UsXG4gICAgICB1cDogZmFsc2UsXG4gICAgICBkb3duOiBmYWxzZVxuICAgIH1cbiAgICB0aGlzLmxlZnREaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMucmlnaHREaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudXBEaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuZG93bkRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5rZXlEb3duSGFuZGxlciA9IHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmtleVVwSGFuZGxlciA9IHRoaXMua2V5VXBIYW5kbGVyLmJpbmQodGhpcyk7XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpICBcbiAgICBpZiAoZS5rZXlDb2RlID09PSAzOSAmJiAhdGhpcy5kaXNhYmxlTGVmdFJpZ2h0KSB7XG4gICAgICB0aGlzLmtleS5yaWdodCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDM3ICYmICF0aGlzLmRpc2FibGVMZWZ0UmlnaHQpIHtcbiAgICAgIHRoaXMua2V5LmxlZnQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSAzOCkge1xuICAgICAgdGhpcy5rZXkudXAgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSA0MCkge1xuICAgICAgdGhpcy5rZXkuZG93biA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAga2V5VXBIYW5kbGVyKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBpZiAoZS5rZXlDb2RlID09PSAzOSkge1xuICAgICAgdGhpcy5rZXkucmlnaHQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMzcpIHtcbiAgICAgIHRoaXMua2V5LmxlZnQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMzgpIHtcbiAgICAgIHRoaXMua2V5LnVwID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDQwKSB7XG4gICAgICB0aGlzLmtleS5kb3duID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaXNEb3duKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMua2V5W2lucHV0XTtcbiAgfSBcblxuICBkaXNhYmxlTGVmdCgpIHtcbiAgICB0aGlzLmxlZnREaXNhYmxlZCA9IHRydWU7XG4gIH1cblxuICBkaXNhYmxlUmlnaHQoKSB7XG4gICAgdGhpcy5yaWdodERpc2FibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGRpc2FibGVEb3duKCkge1xuICAgIHRoaXMuZG93bkRpc2FibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGRpc2FibGVVcCgpIHtcbiAgICB0aGlzLnVwRGlzYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgZW5hYmxlTGVmdCgpIHtcbiAgICB0aGlzLmxlZnREaXNhYmxlZCA9IGZhbHNlOyAgIFxuICB9XG5cbiAgZW5hYmxlUmlnaHQoKSB7XG4gICAgdGhpcy5yaWdodERpc2FibGVkID0gZmFsc2U7ICAgXG4gIH1cblxuICBlbmFibGVEb3duKCkge1xuICAgIHRoaXMuZG93bkRpc2FibGVkID0gZmFsc2U7ICAgXG4gIH1cblxuICBlbmFibGVVcCgpIHtcbiAgICB0aGlzLnVwRGlzYWJsZWQgPSBmYWxzZTsgICBcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkZXI7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0tleWJvYXJkZXIuanMiXSwic291cmNlUm9vdCI6IiJ9