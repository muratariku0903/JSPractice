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

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Bbp_1 = __importDefault(__webpack_require__(/*! ./controller/Bbp */ \"./src/scripts/controller/Bbp.ts\"));\nvar board = document.getElementById('board');\nvar endBtn = document.getElementById('end_btn');\nvar score = document.getElementById('score');\nvar bbpController = new Bbp_1.default(board, score);\nbbpController.start();\ndocument.addEventListener('keydown', function (e) { return bbpController.keyDownHandler(e); }, false);\ndocument.addEventListener('keyup', function (e) { return bbpController.keyUpHandler(e); }, false);\nendBtn.addEventListener('click', function () { return bbpController.end(); });\n\n\n//# sourceURL=webpack://bbp/./src/scripts/app.ts?");

/***/ }),

/***/ "./src/scripts/controller/Bbp.ts":
/*!***************************************!*\
  !*** ./src/scripts/controller/Bbp.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Ball_1 = __importDefault(__webpack_require__(/*! ../view/Ball */ \"./src/scripts/view/Ball.ts\"));\nvar Board_1 = __importDefault(__webpack_require__(/*! ../view/Board */ \"./src/scripts/view/Board.ts\"));\nvar Paddle_1 = __importDefault(__webpack_require__(/*! ../view/Paddle */ \"./src/scripts/view/Paddle.ts\"));\nvar Bricks_1 = __importDefault(__webpack_require__(/*! ../view/Bricks */ \"./src/scripts/view/Bricks.ts\"));\nvar Score_1 = __importDefault(__webpack_require__(/*! ../view/Score */ \"./src/scripts/view/Score.ts\"));\n// 外部からの入力値を元にモデルとビューを制御する\nvar BbpController = /** @class */ (function () {\n    // これboardではなくて基準となる要素じゃない？\n    function BbpController(boardEl, outputEl) {\n        this.keyRightPressed = false;\n        this.keyLeftPressed = false;\n        this.timerId = null;\n        this.cw = boardEl.width;\n        this.ch = boardEl.height;\n        this.board = new Board_1.default(boardEl);\n        this.paddle = new Paddle_1.default(boardEl);\n        this.ball = new Ball_1.default(boardEl);\n        this.bricks = new Bricks_1.default(boardEl);\n        this.score = new Score_1.default(outputEl);\n    }\n    BbpController.prototype.start = function () {\n        var _this = this;\n        console.log('start');\n        this.timerId = setInterval(function () { return _this.draw(); }, 10);\n    };\n    BbpController.prototype.end = function () {\n        console.log('end');\n        if (this.timerId)\n            clearInterval(this.timerId);\n        console.log(this.bricks.getBrickExists());\n        // document.location.reload();\n    };\n    // ここでボールの衝突を検知しても良いかもしれない\n    BbpController.prototype.draw = function () {\n        this.clearBoard();\n        this.drawBoard();\n        this.drawBall();\n        this.drawPaddle();\n        this.drawBricks();\n    };\n    BbpController.prototype.keyDownHandler = function (e) {\n        if (e.key == 'Right' || e.key == 'ArrowRight') {\n            this.keyRightPressed = true;\n        }\n        else if (e.key == 'Left' || e.key == 'ArrowLeft') {\n            this.keyLeftPressed = true;\n        }\n    };\n    BbpController.prototype.keyUpHandler = function (e) {\n        if (e.key == 'Right' || e.key == 'ArrowRight') {\n            this.keyRightPressed = false;\n        }\n        else if (e.key == 'Left' || e.key == 'ArrowLeft') {\n            this.keyLeftPressed = false;\n        }\n    };\n    BbpController.prototype.drawBoard = function () {\n        this.board.draw();\n    };\n    BbpController.prototype.clearBoard = function () {\n        this.board.clear();\n    };\n    BbpController.prototype.drawBall = function () {\n        if (this.isBallConflictX())\n            this.ball.reverseDX();\n        if (this.isBallConflictTop())\n            this.ball.reverseDY();\n        if (this.isBallConflictBottom()) {\n            if (this.isBallConflictPaddle()) {\n                this.ball.reverseDY();\n            }\n            else {\n                this.end();\n            }\n        }\n        if (this.isBallConflictBrick()) {\n            this.ball.reverseDY();\n        }\n        this.ball.draw();\n        this.ball.updateX();\n        this.ball.updateY();\n    };\n    BbpController.prototype.drawPaddle = function () {\n        if (this.keyRightPressed && !this.isPaddleConflictRight())\n            this.paddle.moveRight();\n        if (this.keyLeftPressed && !this.isPaddingConflictLeft())\n            this.paddle.moveLeft();\n        this.paddle.draw();\n    };\n    BbpController.prototype.drawBricks = function () {\n        this.bricks.draw();\n    };\n    BbpController.prototype.drawScore = function () {\n        this.score.count();\n    };\n    BbpController.prototype.isBallConflictX = function () {\n        var x = this.ball.getX();\n        var dx = this.ball.getDX();\n        var r = this.ball.getR();\n        return x + dx > this.cw - r || x + dx < r;\n    };\n    BbpController.prototype.isBallConflictTop = function () {\n        var y = this.ball.getY();\n        var dy = this.ball.getDY();\n        var r = this.ball.getR();\n        return y + dy < r;\n    };\n    BbpController.prototype.isBallConflictBottom = function () {\n        var y = this.ball.getY();\n        var dy = this.ball.getDY();\n        var r = this.ball.getR();\n        return y + dy > this.ch - r;\n    };\n    // ボールはそれ自体パドルやレンガに関心を持たない。だからコントローラーで管理した\n    BbpController.prototype.isBallConflictPaddle = function () {\n        var bx = this.ball.getX();\n        var px = this.paddle.getX();\n        var pw = this.paddle.getW();\n        return px <= bx && bx <= px + pw;\n    };\n    BbpController.prototype.isBallConflictBrick = function () {\n        var bx = this.ball.getX();\n        var by = this.ball.getY();\n        return this.bricks.isConflictedByBall(bx, by);\n    };\n    BbpController.prototype.isPaddleConflictRight = function () {\n        var x = this.paddle.getX();\n        var w = this.paddle.getW();\n        return x >= this.cw - w;\n    };\n    BbpController.prototype.isPaddingConflictLeft = function () {\n        return this.paddle.getX() <= 0;\n    };\n    return BbpController;\n}());\nexports[\"default\"] = BbpController;\n\n\n//# sourceURL=webpack://bbp/./src/scripts/controller/Bbp.ts?");

/***/ }),

/***/ "./src/scripts/view/Ball.ts":
/*!**********************************!*\
  !*** ./src/scripts/view/Ball.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Ball = /** @class */ (function () {\n    function Ball(board) {\n        this.x = 600;\n        this.dx = 3;\n        this.y = 0;\n        this.dy = 3;\n        this.r = 20;\n        this.bgc = \"green\";\n        this.x = board.width / 2;\n        this.y = board.height / 2;\n        var ctx = board.getContext('2d');\n        if (ctx) {\n            this.ctx = ctx;\n        }\n        else {\n            throw ('フィールドが設定されていません。');\n        }\n    }\n    Ball.prototype.draw = function () {\n        this.ctx.beginPath();\n        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);\n        this.ctx.fillStyle = this.bgc;\n        this.ctx.fill();\n        this.ctx.closePath();\n    };\n    Ball.prototype.reverseDX = function () {\n        this.setDX(-1 * this.getDX());\n    };\n    Ball.prototype.reverseDY = function () {\n        this.setDY(-1 * this.getDY());\n    };\n    Ball.prototype.updateX = function () {\n        this.setX(this.x + this.dx);\n    };\n    Ball.prototype.updateY = function () {\n        this.setY(this.y + this.dy);\n    };\n    Ball.prototype.getX = function () {\n        return this.x;\n    };\n    Ball.prototype.setX = function (x) {\n        this.x = x;\n    };\n    Ball.prototype.getY = function () {\n        return this.y;\n    };\n    Ball.prototype.setY = function (y) {\n        this.y = y;\n    };\n    Ball.prototype.getDX = function () {\n        return this.dx;\n    };\n    Ball.prototype.setDX = function (dx) {\n        this.dx = dx;\n    };\n    Ball.prototype.getDY = function () {\n        return this.dy;\n    };\n    Ball.prototype.setDY = function (dy) {\n        this.dy = dy;\n    };\n    Ball.prototype.getR = function () {\n        return this.r;\n    };\n    Ball.prototype.setR = function (r) {\n        this.r = r;\n    };\n    return Ball;\n}());\nexports[\"default\"] = Ball;\n\n\n//# sourceURL=webpack://bbp/./src/scripts/view/Ball.ts?");

/***/ }),

/***/ "./src/scripts/view/Board.ts":
/*!***********************************!*\
  !*** ./src/scripts/view/Board.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Board = /** @class */ (function () {\n    function Board(board) {\n        this.x = 0;\n        this.y = 0;\n        this.w = 75;\n        this.h = 10;\n        this.bgc = \"gray\";\n        this.w = board.width;\n        this.h = board.height;\n        var ctx = board.getContext('2d');\n        if (ctx) {\n            this.ctx = ctx;\n        }\n        else {\n            throw ('フィールドが設定されていません。');\n        }\n    }\n    Board.prototype.draw = function () {\n        this.ctx.beginPath();\n        this.ctx.rect(this.x, this.y, this.w, this.h);\n        this.ctx.fillStyle = this.bgc;\n        this.ctx.fill();\n        this.ctx.closePath();\n    };\n    Board.prototype.clear = function () {\n        this.ctx.clearRect(this.x, this.y, this.w, this.h);\n    };\n    return Board;\n}());\nexports[\"default\"] = Board;\n\n\n//# sourceURL=webpack://bbp/./src/scripts/view/Board.ts?");

/***/ }),

/***/ "./src/scripts/view/Brick.ts":
/*!***********************************!*\
  !*** ./src/scripts/view/Brick.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n// ベースクラスを用意してctxをプロパティにセットする\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Brick = /** @class */ (function () {\n    function Brick(board, x, y, w, h) {\n        this.x = 0;\n        this.y = 0;\n        this.w = 75;\n        this.h = 30;\n        this.bgc = \"brown\";\n        this.x = x;\n        this.y = y;\n        this.w = w;\n        this.h = h;\n        var ctx = board.getContext('2d');\n        if (ctx) {\n            this.ctx = ctx;\n        }\n        else {\n            throw ('フィールドが設定されていません。');\n        }\n    }\n    Brick.prototype.draw = function () {\n        this.ctx.beginPath();\n        this.ctx.rect(this.x, this.y, this.w, this.h);\n        this.ctx.fillStyle = this.bgc;\n        this.ctx.fill();\n        this.ctx.closePath();\n    };\n    Brick.prototype.isConflictedByBall = function (ballX, ballY) {\n        if (ballX < this.x)\n            return false;\n        if (ballX > this.x + this.w)\n            return false;\n        if (ballY < this.y)\n            return false;\n        if (ballY > this.y + this.h)\n            return false;\n        return true;\n    };\n    return Brick;\n}());\nexports[\"default\"] = Brick;\n\n\n//# sourceURL=webpack://bbp/./src/scripts/view/Brick.ts?");

/***/ }),

/***/ "./src/scripts/view/Bricks.ts":
/*!************************************!*\
  !*** ./src/scripts/view/Bricks.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Brick_1 = __importDefault(__webpack_require__(/*! ./Brick */ \"./src/scripts/view/Brick.ts\"));\nvar Bricks = /** @class */ (function () {\n    function Bricks(board) {\n        this.rowCnt = 3;\n        this.colCnt = 5;\n        this.brickHeight = 30;\n        this.brickGap = 5;\n        this.board = board;\n        this.brickWidth = (board.width - (this.colCnt + 1) * this.brickGap) / this.colCnt;\n        this.brickExists = this.createBrickExists();\n    }\n    Bricks.prototype.draw = function () {\n        for (var r = 0; r < this.rowCnt; r++) {\n            for (var c = 0; c < this.colCnt; c++) {\n                if (!this.brickExists[r][c])\n                    continue;\n                var brick = this.createBrick(r, c);\n                brick.draw();\n            }\n        }\n    };\n    Bricks.prototype.isConflictedByBall = function (ballX, ballY) {\n        for (var r = 0; r < this.rowCnt; r++) {\n            for (var c = 0; c < this.colCnt; c++) {\n                if (!this.brickExists[r][c])\n                    continue;\n                var brick = this.createBrick(r, c);\n                if (brick.isConflictedByBall(ballX, ballY)) {\n                    this.brickExists[r][c] = false;\n                    return true;\n                }\n            }\n        }\n        return false;\n    };\n    Bricks.prototype.getBrickExists = function () {\n        return this.brickExists;\n    };\n    Bricks.prototype.createBrick = function (r, c) {\n        var brickX = this.brickGap + c * (this.brickGap + this.brickWidth);\n        var brickY = this.brickGap + r * (this.brickGap + this.brickHeight);\n        return new Brick_1.default(this.board, brickX, brickY, this.brickWidth, this.brickHeight);\n    };\n    Bricks.prototype.createBrickExists = function () {\n        var _this = this;\n        return __spreadArray([], Array(this.rowCnt), true).map(function () { return Array(_this.colCnt).fill(true); });\n    };\n    return Bricks;\n}());\nexports[\"default\"] = Bricks;\n\n\n//# sourceURL=webpack://bbp/./src/scripts/view/Bricks.ts?");

/***/ }),

/***/ "./src/scripts/view/Paddle.ts":
/*!************************************!*\
  !*** ./src/scripts/view/Paddle.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n// 動位置を設定するのと描画はタイミングを統一させる\n// バラバラなタイミングでやると処理がわからなくなる\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Paddle = /** @class */ (function () {\n    function Paddle(board) {\n        this.x = 600;\n        this.dx = 5;\n        this.y = 0;\n        this.w = 100;\n        this.h = 10;\n        this.bgc = \"black\";\n        this.x = board.width / 2;\n        this.y = board.height - this.h;\n        var ctx = board.getContext('2d');\n        if (ctx) {\n            this.ctx = ctx;\n        }\n        else {\n            throw ('フィールドが設定されていません。');\n        }\n    }\n    Paddle.prototype.draw = function () {\n        this.ctx.beginPath();\n        this.ctx.rect(this.x, this.y, this.w, this.h);\n        this.ctx.fillStyle = this.bgc;\n        this.ctx.fill();\n        this.ctx.closePath();\n    };\n    Paddle.prototype.moveRight = function () {\n        this.setX(this.x + this.dx);\n    };\n    Paddle.prototype.moveLeft = function () {\n        this.setX(this.x - this.dx);\n    };\n    Paddle.prototype.getX = function () {\n        return this.x;\n    };\n    Paddle.prototype.setX = function (x) {\n        this.x = x;\n    };\n    Paddle.prototype.getY = function () {\n        return this.y;\n    };\n    Paddle.prototype.setY = function (y) {\n        this.y = y;\n    };\n    Paddle.prototype.getDX = function () {\n        return this.dx;\n    };\n    Paddle.prototype.setDX = function (dx) {\n        this.dx = dx;\n    };\n    Paddle.prototype.getW = function () {\n        return this.w;\n    };\n    Paddle.prototype.setW = function (w) {\n        this.w = w;\n    };\n    Paddle.prototype.setH = function (h) {\n        this.h = h;\n    };\n    return Paddle;\n}());\nexports[\"default\"] = Paddle;\n\n\n//# sourceURL=webpack://bbp/./src/scripts/view/Paddle.ts?");

/***/ }),

/***/ "./src/scripts/view/Score.ts":
/*!***********************************!*\
  !*** ./src/scripts/view/Score.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Score = /** @class */ (function () {\n    function Score(outputEl) {\n        this.outputEl = outputEl;\n    }\n    Score.prototype.count = function () {\n        this.outputEl.innerHTML += 1;\n    };\n    return Score;\n}());\nexports[\"default\"] = Score;\n\n\n//# sourceURL=webpack://bbp/./src/scripts/view/Score.ts?");

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