import { cellProps } from "../Types/boardComponentTypes";
import { Dispatch } from "../Types/boardReducerTypes";
// Gets current size of board depending on user window size
export function getBoardSize() {
    let ROWS = Math.round((window.innerHeight * 0.7) / 32);
    let COL = Math.round((window.innerWidth * 0.8) / 32);
    // Forces the rows and columsn to be even for maze generation and overall cleanlyness
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

// function tht draws a path from array of cells given to it
export function drawPath(pathArray: cellProps[], dispatch: Dispatch) {
    pathArray.forEach((cell) => {
        if (!cell.isEnd && !cell.isStart) {
            dispatch({
                type: "changeCell",
                payload: {
                    row: cell.row,
                    col: cell.col,
                    value: { shortestPath: true },
                },
            });
        }
    });
}

// Generates new board with start and end
export function generatePathNewBoard(): cellProps[][] {
    const { COL, ROWS } = getBoardSize();
    let board = [];
    board = generateNewCleanBoard();
    board[1][1].isStart = true;
    board[ROWS - 2][COL - 2].isEnd = true;
    return board;
}

// returns if a cell is valid
export function isValidCellInBoard(coordinates: { ROWS: number; COL: number }) {
    const { COL, ROWS } = getBoardSize();
    if (coordinates.ROWS < 0) return false;
    if (coordinates.COL < 0) return false;
    if (coordinates.ROWS >= ROWS) return false;
    if (coordinates.COL >= COL) return false;
    return true;
}

// function that finds 4 neighbours around row/col in a cross pattern
// [ ][x][ ]
// [x][o][x]   o being the cell
// [ ][x][ ]
export function find4NeighboursCross(
    row: number,
    col: number,
    board: cellProps[][]
): cellProps[] {
    const neighbours = [];
    if (isValidCellInBoard({ ROWS: row - 1, COL: col }))
        neighbours.push(board[row - 1][col]);
    if (isValidCellInBoard({ ROWS: row + 1, COL: col }))
        neighbours.push(board[row + 1][col]);
    if (isValidCellInBoard({ ROWS: row, COL: col - 1 }))
        neighbours.push(board[row][col - 1]);
    if (isValidCellInBoard({ ROWS: row, COL: col + 1 }))
        neighbours.push(board[row][col + 1]);
    return neighbours;
}

// function that finds 9 neighbours around row/col
// [x][x][x]
// [x][o][x]   o being the cell
// [x][x][x]
export function find9NeighboursAround(
    row: number,
    col: number,
    board: cellProps[][]
): cellProps[] {
    const neighbours = [];
    for (let i = row - 1; i < row + 2; i++) {
        if (board[i]) {
            for (let j = col - 1; j < col + 2; j++) {
                if (i === row && j === col) continue;
                if (isValidCellInBoard({ ROWS: i, COL: j }))
                    neighbours.push(board[i][j]);
            }
        }
    }
    return neighbours;
}

// Generates and returns new clean board without anything, no start and end
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

// Given coordinates returns col and row, returns undefined if not found
export function getCellAtCoords(
    board: cellProps[][],
    y: number,
    x: number
): { col: number; row: number } | undefined {
    // get width of element each element sets its own width inside the state when rendered
    const width = board[0][0].width;
    if (!width) return undefined;
    // x and y is supposed to be already passed with offset
    const row = Math.floor(y / width);
    const col = Math.floor(x / width);
    if (!board[row]) return undefined;
    if (!board[row][col]) return undefined;
    return { col: col, row: row };
}
