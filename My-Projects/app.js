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
let xWins = 0;
let oWins = 0;


const restartButton = document.getElementById('restartButton')

const boardEl = document.getElementById("board");

const playAgain = document.getElementById('playAgain');

playAgain.addEventListener("click", init);

boardEl.addEventListener("click", handleClick);

restartButton.addEventListener("click", init);

init();
function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1
    winner = null;
    xWins = 0;
    oWins = 0;
    render()
    playAgain.style.display = 'none';
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

const gameStatus = document.getElementById("game-status");
    if (winner === "TIE GAME!") {
        gameStatus.innerHTML = "tie!";
    } else if (winner) {
        gameStatus.innerHTML = `${LOOKUP[winner]} wins the game!`;
    } else {
        gameStatus.innerHTML = `Current turn: ${LOOKUP[turn]}`;
    } if (winner) {
        playAgain.style.display = 'block';
    }

    document.getElementById("x-wins").textContent = xWins; 
    document.getElementById("o-wins").textContent = oWins;    
}    
    function checkWinner() {

        for (let i= 0; i < combos.length; i++) {
           
            sum = Math.abs(board[combos[i][0]] + board[combos[i][1]] + board[combos[i][2]]);
            if (sum === 3) {
                const winner = board[combos[i][0]];
                if (winner === 1) {
                    xWins++;
                } else {
                    oWins ++;
                }
                return winner;
            }
        }
    
        if (!board.includes(null)) return "TIE GAME!";
    
        return null
        
    }

