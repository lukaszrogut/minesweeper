import { createBoard } from "./createBoard"

const board = document.querySelector(".board")

const BOARD_ROWS = 16
const BOARD_COLS = 16
const BOARD_MINES = 40

let root = document.documentElement
root.style.setProperty("--cols", BOARD_COLS)
root.style.setProperty("--rows", BOARD_ROWS)

const result = createBoard(BOARD_ROWS, BOARD_COLS, BOARD_MINES)
result.forEach((item) => {
  item.forEach((itemInside) => {
    const div = document.createElement("div")
    div.dataset.status = itemInside.status
    div.dataset.mine = itemInside.mine
    div.addEventListener("click", revealSquare)
    div.addEventListener("contextmenu", markSquare)
    board.append(div)
  })
})

function markSquare(e) {
  e.preventDefault()
  e.target.dataset.status = "marked"
}

function revealSquare(e) {
  if (e.target.dataset.mine === "true") {
    e.target.dataset.status = "mine"
  } else {
    e.target.dataset.status = "number"
    e.target.innerText = getNumberOfNearbyMines(e.target)
  }
  // if (e.target.dataset.mine) {
  //   e.target.dataset.status = "mine"
  // }
}

function getNumberOfNearbyMines() {
  console.log("ok")
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
// markNumbers()
