'use strict'

var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';

var gBoard;
var gGamerPos;
var gIntervalId;
var gCount = 0;

function initGame() {
	gGamerPos = { i: 2, j: 9 };
	//set model
	gCount = 0;
	gBoard = buildBoard();
	//set DOM
	renderBoard(gBoard);
	 gIntervalId = setInterval(randomBall, 100000, gBoard)
	// randomBall( gBoard);

}

function ballsCount() {
	var elCount = document.querySelector('.counter')
	console.log(elCount)
	elCount.innerText = 'counter : ' + gCount;

	if(checkIsWin() === true){
		console.log(ooooooo);
		// gCount = 0;
		// elCount.innerText = 'counter : ' + 0;
	}
}




function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)


	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)

	board[1][1].gameElement = BALL;
	board[7][4].gameElement = BALL;

	console.log('board:', board);
	return board;
}
// console.log( cell.type);

function checkIsWin() {

	for (var i = 1; i < gBoard.length - 1; i++) {
		for (var j = 1; j < gBoard[0].length - 1; j++) {
			var currCell = gBoard[i][j]
			// console.log(currCell, 'currCell');
			if (currCell.gameElement === BALL) {
				return false
			}

		}
	}
	return true

}

function getReset(elBtn) {
	var elCount = document.querySelector('.counter')
	console.log(elCount)
	
	elCount.innerText = 'counter : ' + 0;
	initGame();
}
// stopGame(checkIsWin())
// function stopGame(isWin) {
// 	if (isWin) {
// 		clearInterval(gIntervalId);
// 	}
// }

function randomBall(board) {
	var emptyIndexs = [];
	for (var i = 1; i < board.length - 1; i++) {
		for (var j = 1; j < board[0].length - 1; j++) {
			emptyIndexs.push({ i, j })
		}
	}
	var randomIdx = getRandomInt(0, emptyIndexs.length)
	var currIdx = emptyIndexs[randomIdx]
	gBoard[currIdx.i][currIdx.j].gameElement = BALL

	renderBoard(gBoard)
	console.table(gBoard);
}



// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j]; // get an object {type: 'WALL', gameElement: null}

			var cellClass = getClassName({ i: i, j: j }) // cell-0-0 

			// TODO - change to short if statement
			// if (currCell.type === FLOOR) cellClass += ' floor';
			// else if (currCell.type === WALL) cellClass += ' wall';
			cellClass += (currCell.type === FLOOR) ? ' floor' : ' wall';

			//TODO - Change To template string
			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			// TODO - change to switch case statement
			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	// console.log('strHTML is:', strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

		if (targetCell.gameElement === BALL) {
			console.log('Collecting!');
			// sound
			gCount++
			ballsCount(gCount);
		}
		console.log('count:', gCount);

		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		// MOVING to selected position
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// DOM:
		renderCell(gGamerPos, GAMER_IMG);
		var isWin = checkIsWin()
		if (isWin) {
			console.log('win');
			stopInt ();
		}

	} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

function stopInt (){
	clearInterval(gIntervalId);
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}