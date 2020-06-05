import { getBoardSize } from "../helpers/board";
import { cellProps } from "../Types/boardComponentTypes";
import { Dispatch } from "../Types/boardReducerTypes";
export function makePrimsMaze(board: cellProps[][], dispatch: Dispatch) {
  const notVisited: cellProps[] = [];
  const { ROWS, COL } = getBoardSize();

  // create a checkerboard grid of walls
  // all all other non-walls to notVisited array to loop over
  for (const row of board) {
    for (const cell of row) {
      if (cell.isStart) {
        cell.inMaze = true;
      } else {
        if (cell.col % 2 === 0 || cell.row % 2 === 0) cell.wall = true;
        else notVisited.push(cell);
      }
    }
  }

  // while there are still not visited cells
  while (notVisited.length) {
    // remove first cell from not visited
    const currentCell = notVisited.shift();
    // This satisfies typescript (this isn't a case that can happen)
    if (!currentCell) break;

    // Get neighbours around the cell, we treat a valid neighbour as not a wall, so we should check in this pattern
    // [ ][ ][x][ ][ ]
    // [ ][ ][ ][ ][ ]
    // [x][ ][o][ ][x]
    // [ ][ ][ ][ ][ ]
    // [ ][ ][x][ ][ ]
    // As the ones next to it are walls
    const neighbours: cellProps[] = [];
    if (currentCell.row + 2 < ROWS)
      neighbours.push(board[currentCell.row + 2][currentCell.col]);
    if (currentCell.row - 2 >= 0)
      neighbours.push(board[currentCell.row - 2][currentCell.col]);
    if (currentCell.col - 2 >= 0)
      neighbours.push(board[currentCell.row][currentCell.col - 2]);
    if (currentCell.col + 2 < COL)
      neighbours.push(board[currentCell.row][currentCell.col + 2]);

    // filter out the cells that are already in the maze
    const neighboursInMaze = neighbours.filter((neighbour) => neighbour.inMaze);

    // If theres none we finished
    if (neighboursInMaze.length === 0) break;

    // Get random neighbour thats already in the maze
    // eg start is in the maze, then random neighbour would be start
    const numNeighboursInMaze = neighboursInMaze.length;
    const randNeighbourInMazeIndex = Math.floor(
      Math.random() * numNeighboursInMaze
    );
    const randNeighbourInMaze = neighboursInMaze[randNeighbourInMazeIndex];

    // We find the row and column difference from this random neighbour
    // in order to make a hole in the wall connecting them
    // this is why we needed a neighbour IN THE MAZE
    // so we can have a maze with a solution
    const rowDifference = randNeighbourInMaze.row - currentCell.row;
    const colDifference = randNeighbourInMaze.col - currentCell.col;

    // Once we know if the neighbour is on the Y or X axis

    // if its the column axis
    if (colDifference !== 0) {
      // if its a positive difference meaning 2
      // the hole needs to be made in col+1 to connect them
      if (colDifference > 0) {
        board[currentCell.row][currentCell.col + 1].wall = false;
        // else its negative meaning its -2
      } else board[currentCell.row][currentCell.col - 1].wall = false;
    }
    // same but for rows
    if (rowDifference !== 0) {
      if (rowDifference > 0) {
        board[currentCell.row + 1][currentCell.col].wall = false;
      } else board[currentCell.row - 1][currentCell.col].wall = false;
    }
    // add current cell to maze
    currentCell.inMaze = true;
  }

  // update board state
  dispatch({ type: "changeBoard", board: board });
}
