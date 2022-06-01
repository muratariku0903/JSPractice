/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/app.ts":
/*!****************************!*\
  !*** ./src/scripts/app.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Bbp_1 = __importDefault(__webpack_require__(/*! ./controller/Bbp */ \"./src/scripts/controller/Bbp.ts\"));\nvar board = document.getElementById('board');\nvar endBtn = document.getElementById('end_btn');\nvar bbpController = new Bbp_1.default(board);\nbbpController.start();\ndocument.addEventListener('keydown', function (e) { return bbpController.keyDownHandler(e); }, false);\ndocument.addEventListener('keyup', function (e) { return bbpController.keyUpHandler(e); }, false);\nendBtn === null || endBtn === void 0 ? void 0 : endBtn.addEventListener('click', function () { return bbpController.end(); });\n\n\n//# sourceURL=webpack://bbp/./src/scripts/app.ts?");

/***/ }),

/***/ "./src/scripts/controller/Bbp.ts":
/*!***************************************!*\
  !*** ./src/scripts/controller/Bbp.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Ball_1 = __importDefault(__webpack_require__(/*! ../view/Ball */ \"./src/scripts/view/Ball.ts\"));\nvar Paddle_1 = __importDefault(__webpack_require__(/*! ../view/Paddle */ \"./src/scripts/view/Paddle.ts\"));\n// 外部からの入力値を元にモデルとビューを制御する\n// こいつがそれぞれのコンポーネントをプロパティにセットするのもアリなのかな\nvar BbpController = /** @class */ (function () {\n    function BbpController(board) {\n        this.keyRightPressed = false;\n        this.keyLeftPressed = false;\n        this.timerId = null;\n        this.board = board;\n        this.cw = board.width;\n        this.ch = board.height;\n        this.paddle = new Paddle_1.default(board);\n        this.ball = new Ball_1.default(board);\n    }\n    // ゲームを開始\n    BbpController.prototype.start = function () {\n        var _this = this;\n        console.log('start');\n        this.timerId = setInterval(function () { return _this.draw(); }, 10);\n    };\n    // ゲームを終了\n    BbpController.prototype.end = function () {\n        console.log('end');\n        if (this.timerId)\n            clearInterval(this.timerId);\n    };\n    BbpController.prototype.draw = function () {\n        this.drawBall();\n        this.drawPaddle();\n    };\n    BbpController.prototype.keyDownHandler = function (e) {\n        if (e.key == 'Right' || e.key == 'ArrowRight') {\n            this.keyRightPressed = true;\n        }\n        else if (e.key == 'Left' || e.key == 'ArrowLeft') {\n            this.keyLeftPressed = true;\n        }\n    };\n    BbpController.prototype.keyUpHandler = function (e) {\n        if (e.key == 'Right' || e.key == 'ArrowRight') {\n            this.keyRightPressed = false;\n        }\n        else if (e.key == 'Left' || e.key == 'ArrowLeft') {\n            this.keyLeftPressed = false;\n        }\n    };\n    BbpController.prototype.drawBall = function () {\n        if (this.isBallConflictX()) {\n            this.ball.reverseDX();\n        }\n        if (this.isBallConflictY()) {\n            this.ball.reverseDY();\n        }\n        this.ball.draw();\n        this.ball.updateX();\n        this.ball.updateY();\n    };\n    BbpController.prototype.drawPaddle = function () {\n        if (this.keyRightPressed && !this.isPaddleConflictRight()) {\n            this.paddle.moveRight();\n        }\n        if (this.keyLeftPressed && !this.isPaddingConflictLeft()) {\n            this.paddle.moveLeft();\n        }\n        this.paddle.draw();\n        console.log(this.paddle.getX());\n    };\n    BbpController.prototype.isBallConflictX = function () {\n        var x = this.ball.getX();\n        var dx = this.ball.getDX();\n        var r = this.ball.getR();\n        return x + dx > this.cw - r || x + dx < r;\n    };\n    BbpController.prototype.isBallConflictY = function () {\n        var y = this.ball.getY();\n        var dy = this.ball.getDY();\n        var r = this.ball.getR();\n        return y + dy > this.ch - r || y + dy < r;\n    };\n    BbpController.prototype.isPaddleConflictRight = function () {\n        var x = this.paddle.getX();\n        var w = this.paddle.getW();\n        return x >= this.cw - w;\n    };\n    BbpController.prototype.isPaddingConflictLeft = function () {\n        return this.paddle.getX() <= 0;\n    };\n    return BbpController;\n}());\nexports[\"default\"] = BbpController;\n\n\n//# sourceURL=webpack://bbp/./src/scripts/controller/Bbp.ts?");

/***/ }),

/***/ "./src/scripts/view/Ball.ts":
/*!**********************************!*\
  !*** ./src/scripts/view/Ball.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Ball = /** @class */ (function () {\n    function Ball(board) {\n        this.x = 600;\n        this.dx = 50;\n        this.y = 0;\n        this.dy = 50;\n        this.r = 20;\n        this.bgc = \"green\";\n        var ctx = board.getContext('2d');\n        if (ctx) {\n            this.ctx = ctx;\n        }\n        else {\n            throw ('フィールドが設定されていません。');\n        }\n    }\n    Ball.prototype.draw = function () {\n        this.ctx.beginPath();\n        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);\n        this.ctx.fillStyle = this.bgc;\n        this.ctx.fill();\n        this.ctx.closePath();\n    };\n    Ball.prototype.reverseDX = function () {\n        this.setDX(-1 * this.getDX());\n    };\n    Ball.prototype.reverseDY = function () {\n        this.setDY(-1 * this.getDY());\n    };\n    Ball.prototype.updateX = function () {\n        this.setX(this.x + this.dx);\n    };\n    Ball.prototype.updateY = function () {\n        this.setY(this.y + this.dy);\n    };\n    Ball.prototype.getX = function () {\n        return this.x;\n    };\n    Ball.prototype.setX = function (x) {\n        this.x = x;\n    };\n    Ball.prototype.getY = function () {\n        return this.y;\n    };\n    Ball.prototype.setY = function (y) {\n        this.y = y;\n    };\n    Ball.prototype.getDX = function () {\n        return this.dx;\n    };\n    Ball.prototype.setDX = function (dx) {\n        this.dx = dx;\n    };\n    Ball.prototype.getDY = function () {\n        return this.dy;\n    };\n    Ball.prototype.setDY = function (dy) {\n        this.dy = dy;\n    };\n    Ball.prototype.getR = function () {\n        return this.r;\n    };\n    Ball.prototype.setR = function (r) {\n        this.r = r;\n    };\n    return Ball;\n}());\nexports[\"default\"] = Ball;\n\n\n//# sourceURL=webpack://bbp/./src/scripts/view/Ball.ts?");

/***/ }),

/***/ "./src/scripts/view/Paddle.ts":
/*!************************************!*\
  !*** ./src/scripts/view/Paddle.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Paddle = /** @class */ (function () {\n    function Paddle(board) {\n        this.x = 600;\n        this.dx = 50;\n        this.y = 0;\n        this.w = 75;\n        this.h = 10;\n        this.bgc = \"black\";\n        this.y = board.height;\n        var ctx = board.getContext('2d');\n        if (ctx) {\n            this.ctx = ctx;\n        }\n        else {\n            throw ('フィールドが設定されていません。');\n        }\n    }\n    Paddle.prototype.draw = function () {\n        this.ctx.beginPath();\n        this.ctx.rect(this.x, this.y - this.h, this.w, this.h);\n        this.ctx.fillStyle = this.bgc;\n        this.ctx.fill();\n        this.ctx.closePath();\n    };\n    Paddle.prototype.moveRight = function () {\n        console.log('right');\n        this.setX(this.x + this.dx);\n        this.draw();\n    };\n    Paddle.prototype.moveLeft = function () {\n        console.log('left');\n        this.setX(this.x - this.dx);\n        this.draw();\n    };\n    Paddle.prototype.getX = function () {\n        return this.x;\n    };\n    Paddle.prototype.setX = function (x) {\n        this.x = x;\n    };\n    Paddle.prototype.getY = function () {\n        return this.y;\n    };\n    Paddle.prototype.setY = function (y) {\n        this.y = y;\n    };\n    Paddle.prototype.getDX = function () {\n        return this.dx;\n    };\n    Paddle.prototype.setDX = function (dx) {\n        this.dx = dx;\n    };\n    Paddle.prototype.getW = function () {\n        return this.w;\n    };\n    Paddle.prototype.setW = function (w) {\n        this.w = w;\n    };\n    Paddle.prototype.setH = function (h) {\n        this.h = h;\n    };\n    return Paddle;\n}());\nexports[\"default\"] = Paddle;\n\n\n//# sourceURL=webpack://bbp/./src/scripts/view/Paddle.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/app.ts");
/******/ 	
/******/ })()
;