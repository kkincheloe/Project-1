const LOOKUP = {
    "1": "x",
    "-1": "o",
}
const combos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
let board;
let turn;
let winner;

const restartButton = document.getElementById('restartButton')

const boardEl = document.getElementById("board");

boardEl.addEventListener("click", handleClick);

restartButton.addEventListener("click", init);

init();
function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1
    winner = null;
    render()
}

function handleClick(evt) {
    if(board[parseInt(evt.target.id)]   ||
    winner) return;

    board[parseInt(evt.target.id)] = turn;
    turn *= -1;
    winner = checkWinner();
    render()
}

function render() {
    for (let i = 0; i < board.length; i++) {
        const box = document.getElementById(i);
        if(board[i]) {
            box.innerHTML = `${LOOKUP[board[i]]}`;
        } else {
            box.innerHTML = '';
        }
    } 
}

function checkWinner() {

    for (let i= 0; i < combos.length; i++) {
       
        sum = Math.abs(board[combos[i][0]] + board[combos[i][1]] + board[combos[i][2]]);
        if (sum === 3) return board[combos[i][0]];
        
    }

    if (!board.includes(null)) return "TIE GAME!";

    return null;
}