import { cellProps } from "../Types/boardComponentTypes";

export function getBoardSize() {
  let ROWS = Math.round((window.innerHeight * 0.7) / 32);
  let COL = Math.round((window.innerWidth * 0.8) / 32);
  if (ROWS % 2 === 0) ROWS++;
  if (COL % 2 === 0) COL++;
  return { COL, ROWS };
}
const defaultCell = {
  visited: false,
  wall: false,
  isMaze: false,
  movementShadow: false,
  isStart: false,
  isEnd: false,
  alive: false,
};

export function generatePathNewBoard(): cellProps[][] {
  const { COL, ROWS } = getBoardSize();
  let board = [];
  board = generateNewCleanBoard();
  board[1][1].isStart = true;
  board[ROWS - 2][COL - 2].isEnd = true;
  return board;
}
export function generateNewCleanBoard(): cellProps[][] {
  const { COL, ROWS } = getBoardSize();
  let board = [];

  for (let i = 0; i < ROWS; i++) {
    let row = [];
    for (let k = 0; k < COL; k++) {
      let currentCell = { ...defaultCell, row: i, col: k };
      row.push(currentCell);
    }
    board.push(row);
  }
  return board;
}
