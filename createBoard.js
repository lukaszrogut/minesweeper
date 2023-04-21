const BOARD_ELEMENT_STATUS = {
  HIDDEN: "hidden",
  MARKED: "marked",
  MINE: "mine",
  NUMBER: "number",
}

export function createBoard(boardRows, boardCols, mines) {
  const minesPositions = getMinesPositions(boardRows, boardCols, mines)
  let board = []
  for (let i = 0; i < boardRows; i++) {
    let row = []
    for (let j = 0; j < boardCols; j++) {
      let boardElement = {
        x: j,
        y: i,
        mine: minesPositions.some((item) => item[0] === j && item[1] === i),
        status: BOARD_ELEMENT_STATUS.HIDDEN,
      }
      row.push(boardElement)
    }
    board.push(row)
  }

  return board
}

function getMinesPositions(boardRows, boardCols, mines) {
  let minesPositions = []
  while (minesPositions.length < mines) {
    const x = randomNumber(boardCols)
    const y = randomNumber(boardRows)
    if (!isPositionUnique(minesPositions, [x, y])) {
      minesPositions.push([x, y])
    }
  }

  return minesPositions
}

function randomNumber(maxNumber) {
  return Math.floor(Math.random() * maxNumber)
}

function isPositionUnique(array, position) {
  return array.some((item) => {
    item.x === position[0] && item.y === position[1]
  })
}
