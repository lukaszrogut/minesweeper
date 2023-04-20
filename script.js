const board = document.querySelector(".board")

const BOARD_ROWS = 16
const BOARD_COLS = 16
const BOARD_MINES = 40

function createBoard(BOARD_HEIGHT, BOARD_WIDTH) {
  // TODO: REPAIR CHANGING BOARD DIMENSIONS
  let a = 1
  for (let i = 1; i <= BOARD_ROWS; i++) {
    for (let j = 1; j <= BOARD_COLS; j++) {
      const div = document.createElement("div")
      div.classList.add("square")
      div.setAttribute("id", a)
      div.setAttribute("data-row", i)
      div.setAttribute("data-col", j)
      board.appendChild(div)
      a++
    }
  }
}

function maskSquares() {
  const squares = document.querySelectorAll(".square")
  squares.forEach((square) => {
    square.classList.add("mask")
  })
}
function removeMask() {
  const squares = document.querySelectorAll(".square")
  squares.forEach((square) =>
    square.addEventListener("click", handleMaskRemoval)
  )
}

function getNeighbours(id) {
  const numbers = [-17, -16, -15, -1, 1, 15, 16, 17]
  for (let i = 0; i < numbers.length; i++) {
    const idNumber = +id + numbers[i]
    const element = document.getElementById(idNumber)
    if (element) {
      element.classList.remove("mask")
    }
  }
}

function unmaskZeros() {
  const zeros = document.querySelectorAll(".zero:not(.mask)")
  if (zeros) {
    zeros.forEach((item) => {
      getNeighbours(item.id)
    })
  } else {
    return false
  }
}

function handleMaskRemoval(e) {
  // TODO: ERROR WITH UNMASKING COLUMN 1
  // TODO: REPAIR RECURRING SQUARE ZERO UNMASKING
  if (e.target.classList.contains("zero")) {
    e.target.classList.remove("mask")
    unmaskZeros()
  } else if (e.target.classList.contains("number")) {
    e.target.classList.remove("mask")
  } else {
    e.target.classList.remove("mask")
    alert("game over")
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function minesPositions() {
  const drawedNumbers = []
  while (drawedNumbers.length < BOARD_MINES) {
    const number = getRandomInt(BOARD_COLS * BOARD_ROWS)
    if (!drawedNumbers.includes(number)) {
      drawedNumbers.push(number)
    }
  }
  return drawedNumbers
}

createBoard(16, 16)

maskSquares()
removeMask()

function markPositions() {
  const drawedNumbers = minesPositions()
  const squares = document.querySelectorAll(".square")
  squares.forEach((element) => {
    if (drawedNumbers.includes(+element.id)) {
      element.classList.add("mine")
    }
  })
}

markPositions()

document.addEventListener("contextmenu", setUserMine)

function setUserMine(e) {
  if (e.target.classList.contains("square")) {
    e.preventDefault()
    e.target.classList.toggle("user-set-mine")
  }
}

function markNumbers() {
  for (let i = 1; i <= BOARD_COLS * BOARD_ROWS; i++) {
    const element = document.getElementById(i)
    const { row, col } = element.dataset
    let mines = 0

    let numbers = [-1, 0, 1, -15, -16, -17, 15, 16, 17]
    let neighbourElement
    for (let j = 0; j <= 8; j++) {
      const idNumber = i + numbers[j]
      neighbourElement = document.getElementById(idNumber)
      if (neighbourElement) {
        if (neighbourElement.classList.contains("mine")) mines += 1
      }
    }
    if (!element.classList.contains("mine")) {
      if (mines === 0) {
        element.classList.add("zero")
      } else {
        element.classList.add("number")
      }
      element.innerText = mines
    }
  }
}
markNumbers()
