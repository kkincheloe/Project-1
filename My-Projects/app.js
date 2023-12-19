const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'o'
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]
const boxElements = document.querySelectorAll('[data-box]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_O_Turn = false

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
	isPlayer_O_Turn = false
	boxElements.forEach(box => {
		box.classList.remove(PLAYER_X_CLASS)
		box.classList.remove(PLAYER_O_CLASS)
		box.removeEventListener('click', handleBoxClick)
		box.addEventListener('click', handleBoxClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

function handleBoxClick(e) {
	const box = e.target
	const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
	placeMark(box, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Scratch Game!"
    } else {
        winningMessageTextElement.innerText = `Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!`
    }
    winningMessageElement.classList.add('add')
}
function isDraw() {
	return [...boxElements].every(box => {
		return box.classList.contains(PLAYER_X_CLASS) || box.classList.contains(PLAYER_O_CLASS)
	})
}
function placeMark(box, currentClass) {
	box.classList.add(currentClass)
}

function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn
}
function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_X_CLASS)
	boardElement.classList.remove(PLAYER_O_CLASS)
	if (isPlayer_O_Turn) {
		boardElement.classList.add(PLAYER_O_CLASS)
	} else {
		boardElement.classList.add(PLAYER_X_CLASS)
	}
}
function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return boxElements[index].classList.contains(currentClass)
		})
	})
}