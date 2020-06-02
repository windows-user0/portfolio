import * as React from "react";
import GridCell from "../components/GridCell";
import { useInterval } from "../hooks/useInterval";
let ROWS: number = 0;
let COL: number = 0;
function resizeBoard() {
  ROWS = Math.round((window.innerHeight * 0.7) / 32);
  COL = Math.round((window.innerWidth * 0.8) / 32);
  if (ROWS % 2 === 0) ROWS++;
  if (COL % 2 === 0) COL++;
}
resizeBoard();

type Action =
  | { type: "clear" }
  | {
      type: "changeCell";
      payload: { row: number; col: number; value: {} };
    }
  | { type: "mouseDown" }
  | { type: "mouseUp" }
  | { type: "changeBoard"; board: cellProps[][] }
  | { type: "setBrush"; brush: string }
  | { type: "setBusy"; value: boolean }
  | { type: "killSignal"; kill: boolean }
  | { type: "completeClear" };

type Dispatch = (action: Action) => void;
type State = {
  board: cellProps[][];

  busy: boolean;
  brush: string;
  killSignal: boolean;
};
type BoardProviderProps = { children: React.ReactNode };
const BoardStateContext = React.createContext<State | undefined>(undefined);
const BoardDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function getCellAtCoords(
  board: cellProps[][],
  y: number,
  x: number
): { col: number; row: number } | undefined {
  const width = board[0][0].width;
  if (!width) return undefined;

  const row = Math.floor(y / width);

  const col = Math.floor(x / width);

  if (!board[row]) return undefined;
  if (!board[row][col]) return undefined;

  return { col: col, row: row };
}
function preventDefault(e: Event) {
  e.preventDefault();
}
function BrowserEventSetup({ children }: BoardProviderProps) {
  const [mousePressed, setMousePressed] = React.useState(false);

  const { board, brush, busy } = useBoardState();
  const dispatch = useBoardDispatch();
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    document.addEventListener("mousedown", () => setMousePressed(true));
    document.addEventListener("mouseup", () => setMousePressed(false));
    document.addEventListener("touchstart", () => {
      setMousePressed(true);
    });
    window.addEventListener("resize", () => {
      resizeBoard();

      setOffset({ x: 0, y: 0 });
      dispatch({ type: "changeBoard", board: generateNewBoard(COL, ROWS) });
    });
    document.addEventListener("touchend", () => {
      setMousePressed(false);
    });
    return function cleanup() {
      window.removeEventListener("resize", () => {
        setOffset({ x: 0, y: 0 });
      });
      document.removeEventListener("mousedown", () => setMousePressed(true));
      document.removeEventListener("mouseup", () => setMousePressed(false));
      document.removeEventListener("touchstart", () => setMousePressed(true));
      document.removeEventListener("touchend", () => setMousePressed(false));
    };
  }, []);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [draggedCell, setDraggedCell] = React.useState("");
  const func = (event: any) => {
    if (mousePressed || event.type === "click") {
      const x = event.clientX || event.touches[0].clientX;
      const y = event.clientY || event.touches[0].clientY;

      const currentCoords = getCellAtCoords(board, y - offset.y, x - offset.x);

      if (!currentCoords) return;

      setCoords({ x: currentCoords.row, y: currentCoords.col });

      const currentCell = board[currentCoords.row][currentCoords.col];

      if (!currentCell.wall && !currentCell.isEnd && !currentCell.isStart) {
        dispatch({
          type: "changeCell",
          payload: {
            ...currentCoords,
            value: { [`${brush}`]: true },
          },
        });
      }
    }
  };

  function enableScroll() {
    document.body.removeEventListener("touchmove", preventDefault);
  }
  function disableScroll() {
    document.body.addEventListener("touchmove", preventDefault, {
      passive: false,
    });
  }

  function handleDragStart(evt: React.SyntheticEvent) {
    const target = (evt.target as HTMLTextAreaElement).id
      .split("-")[1]
      .split("/");
    const row: number = parseInt(target[0]);
    const col: number = parseInt(target[1]);

    if (board[row][col].isStart) {
      setDraggedCell("isStart");
    } else if (board[row][col].isEnd) {
      setDraggedCell("isEnd");
    } else {
      if (!busy) func(evt);
      evt.preventDefault();
      return;
    }

    dispatch({ type: "setBusy", value: true });
  }
  function handleDragEnd(evt: any) {
    const x = evt.clientX || evt.changedTouches[0].clientX;
    const y = evt.clientY || evt.changedTouches[0].clientY;
    const currentCoords = getCellAtCoords(board, y - offset.y, x - offset.x);
    if (!currentCoords) return;

    setCoords({ x: currentCoords.row, y: currentCoords.col });

    const currentCell = board[currentCoords.row][currentCoords.col];

    dispatch({
      type: "changeCell",
      payload: {
        col: currentCell.col,
        row: currentCell.row,
        value: { [draggedCell]: true, movementShadow: false },
      },
    });
    const target = evt.target.id.split("-")[1].split("/");
    const row: number = parseInt(target[0]);
    const col: number = parseInt(target[1]);
    dispatch({
      type: "changeCell",
      payload: {
        col: col,
        row: row,
        value: { [`${draggedCell}`]: false },
      },
    });
    setMousePressed(false);
    if (evt.clientX) dispatch({ type: "setBrush", brush: "wall" });
    dispatch({ type: "setBusy", value: false });
  }

  const [previousCell, setPreviousCell] = React.useState(board[0][0]);
  return (
    <div className="flex justify-center">
      <div
        onTouchMove={(evt) => (busy ? null : func(evt))}
        onMouseMove={(evt) => (busy ? null : func(evt))}
        onClick={(evt) => (busy ? null : func(evt))}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTouchStart={(evt) => {
          handleDragStart(evt);
          disableScroll();
          return false;
        }}
        onTouchEnd={(evt) => {
          handleDragEnd(evt);
          enableScroll();
          return false;
        }}
        onDragCapture={(evt) => {
          const x = evt.clientX - offset.x;
          const y = evt.clientY - offset.y;
          const currentCoords = getCellAtCoords(board, y, x);

          if (currentCoords && brush) {
            const currentCell = board[currentCoords.row][currentCoords.col];
            if (brush !== "movementShadow")
              dispatch({
                type: "setBrush",
                brush: "movementShadow",
              });
            if (!currentCell["movementShadow"]) {
              dispatch({
                type: "changeCell",
                payload: {
                  col: previousCell.col,
                  row: previousCell.row,
                  value: { movementShadow: false },
                },
              });
              dispatch({
                type: "changeCell",
                payload: {
                  ...currentCoords,
                  value: { movementShadow: true },
                },
              });
              setPreviousCell(currentCell);
            }
          }
        }}
        style={{
          borderWidth: "1px",
          borderColor: "red",
        }}
        ref={(el) => {
          if (el && offset.x === 0) {
            const { x, y } = el.getBoundingClientRect();

            setOffset({ x: x, y: y });
          }
        }}
        className="flex flex-col"
        onDrag={(evt) => evt.preventDefault()}
      >
        {children}
      </div>
    </div>
  );
}

async function gameOfLifeTick(board: cellProps[][], dispatch: Dispatch) {
  let dispatches = [];

  for (const row of board) {
    for (const cell of row) {
      const aliveNeighbours = findNeighboursAround(
        cell.row,
        cell.col,
        board
      ).filter((neighbour) => neighbour.alive);

      const neighbourAliveCount = aliveNeighbours.length;
      if (!cell.alive && neighbourAliveCount !== 3) continue;
      if (neighbourAliveCount < 2) {
        dispatches.push(() =>
          dispatch({
            type: "changeCell",
            payload: {
              row: cell.row,
              col: cell.col,
              value: { alive: false },
            },
          })
        );
      } else if (neighbourAliveCount > 3) {
        dispatches.push(() =>
          dispatch({
            type: "changeCell",
            payload: {
              row: cell.row,
              col: cell.col,
              value: { alive: false },
            },
          })
        );
      } else if (neighbourAliveCount === 3) {
        dispatches.push(() =>
          dispatch({
            type: "changeCell",
            payload: {
              row: cell.row,
              col: cell.col,
              value: { alive: true },
            },
          })
        );
      }
    }
  }
  dispatches.forEach((dispatch) => dispatch());
  await sleep(0);
}

function boardReducer(state: State, action: Action) {
  switch (action.type) {
    case "clear": {
      return { ...state, board: generateNewBoard(COL, ROWS) };
    }
    case "completeClear": {
      return { ...state, board: generateNewCleanBoard(COL, ROWS) };
    }
    case "killSignal": {
      return { ...state, killSignal: action.kill };
    }
    case "changeBoard": {
      return { ...state, board: action.board };
    }
    case "setBrush": {
      return { ...state, brush: action.brush };
    }
    case "setBusy": {
      return { ...state, busy: action.value };
    }
    case "changeCell": {
      const payload = action.payload;

      if (state.board[payload.row] !== undefined)
        state.board[payload.row][payload.col] = {
          ...state.board[payload.row][payload.col],
          ...payload.value,
        };
      return { ...state };
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function findNeighbours(
  row: number,
  col: number,
  board: cellProps[][]
): cellProps[] {
  let neighbours = [];

  if (row - 1 >= 0) neighbours.push(board[row - 1][col]);
  if (board[row + 1]) neighbours.push(board[row + 1][col]);
  if (col - 1 >= 0) neighbours.push(board[row][col - 1]);
  if (board[row]) neighbours.push(board[row][col + 1]);
  return neighbours;
}
function findNeighboursAround(
  row: number,
  col: number,
  board: cellProps[][]
): cellProps[] {
  let neighbours = [];

  for (let i = row - 1; i < row + 2; i++) {
    if (board[i]) {
      for (let j = col - 1; j < col + 2; j++) {
        if (i === row && j === col) continue;
        if (board[i][j]) neighbours.push(board[i][j]);
      }
    }
  }
  return neighbours;
}

interface cellProps {
  visited?: boolean;
  row: number;
  col: number;
  distance?: number;
  previous?: cellProps;
  isStart?: boolean;
  isEnd?: boolean;
  yCoord?: number;
  xCoord?: number;
  width?: number;
  wall?: boolean;
  alive?: boolean;
  shortestPath?: boolean;
  movementShadow?: boolean;
  inMaze?: boolean;
}
const cell = {
  visited: false,
  wall: false,
  isMaze: false,
  movementShadow: false,
  isStart: false,
  isEnd: false,
  alive: false,
};
function generateNewBoard(width: number, height: number): cellProps[][] {
  let board = [];

  for (let i = 0; i < height; i++) {
    let row = [];
    for (let k = 0; k < width; k++) {
      let currentCell = { ...cell, row: i, col: k };
      if (i === 1 && k === 1) row.push({ ...currentCell, isStart: true });
      else if (i === height - 2 && k === width - 2)
        row.push({ ...currentCell, isEnd: true });
      else row.push(currentCell);
    }
    board.push(row);
  }
  return board;
}
function generateNewCleanBoard(width: number, height: number): cellProps[][] {
  let board = [];

  for (let i = 0; i < height; i++) {
    let row = [];
    for (let k = 0; k < width; k++) {
      let currentCell = { ...cell, row: i, col: k };
      row.push(currentCell);
    }
    board.push(row);
  }
  return board;
}
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const initialState = {
  board: generateNewBoard(COL, ROWS),
  killSignal: false,
  busy: false,
  brush: "wall",
};
function BoardProvider({ children }: BoardProviderProps) {
  const [state, dispatch] = React.useReducer(boardReducer, initialState);

  return (
    <BoardStateContext.Provider value={state}>
      <BoardDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDispatchContext.Provider>
    </BoardStateContext.Provider>
  );
}
function useBoardState() {
  const context = React.useContext(BoardStateContext);
  if (context === undefined) {
    throw new Error("useBoardState must be used within a BoardProvider");
  }
  return context;
}
function useBoardDispatch() {
  const context = React.useContext(BoardDispatchContext);
  if (context === undefined) {
    throw new Error("useBoardDispatch must be used within a BoardProvider");
  }
  return context;
}

function BoardDisplay() {
  const { board } = useBoardState();

  return (
    <>
      {board.map((row, rowIndex) => (
        <div className="flex flex-row flex-shrink" key={`Board-${rowIndex}`}>
          {row.map((cell, cellIndex) => (
            <GridCell
              key={`Board-${rowIndex}/${cellIndex}`}
              visited={board[rowIndex][cellIndex].visited}
              id={`Board-${rowIndex}/${cellIndex}`}
              findNeighbours={findNeighbours}
              {...board[rowIndex][cellIndex]}
            />
          ))}
        </div>
      ))}
    </>
  );
}

async function dijkstra(
  board: cellProps[][],
  dispatch: Dispatch,
  setFinished: any
) {
  let start: cellProps | undefined = undefined;
  for (const row of board) {
    if (start) break;
    for (const cell of row) {
      if (cell.isStart) {
        start = { ...cell, distance: 0 };
        break;
      }
    }
  }
  if (!start) throw new Error("No Start selected");

  const visitedInOrder = [];

  const notVisitedCells: cellProps[] = [];
  notVisitedCells.push(start);
  let endCell: cellProps | undefined = undefined;

  let dijkstraStepps: any;

  dijkstraStepps = setInterval(() => dijkstraStep(), 20);

  async function dijkstraStep() {
    const closestCell = notVisitedCells.shift();

    if (!closestCell) {
      clearInterval(dijkstraStepps);
      setFinished(true);
      return;
    }
    if (closestCell.wall) return;

    visitedInOrder.push(closestCell);

    if (closestCell.isEnd) {
      endCell = closestCell;
      const nodesInShortestPathOrder = [];
      let currentNode = endCell;
      while (currentNode.previous) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previous;
      }
      nodesInShortestPathOrder.forEach(async (node) => {
        if (!node.isEnd && !node.isStart) {
          dispatch({
            type: "changeCell",
            payload: {
              row: node.row,
              col: node.col,
              value: { shortestPath: true },
            },
          });
          await sleep(0);
        }
      });
      clearInterval(dijkstraStepps);
      setFinished(true);
      return;
    }
    const notVisitedNeighbours = findNeighbours(
      closestCell.row,
      closestCell.col,
      board
    ).filter((neighbour) => neighbour && !neighbour.visited);

    if (notVisitedNeighbours === []) return;

    notVisitedNeighbours.forEach((neighbour) => {
      if (closestCell.distance !== undefined) {
        neighbour.visited = true;
        notVisitedCells.push({
          ...neighbour,
          distance: closestCell.distance + 1,
          previous: closestCell,
        });
      }
    });

    await sleep(100);
    dispatch({ type: "changeBoard", board: board });
  }
}

async function makePrimsMaze(board: cellProps[][], dispatch: Dispatch) {
  const notVisited: cellProps[] = [];

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

  notVisited.unshift(board[3][1]);
  while (notVisited.length) {
    const currentCell = notVisited.shift();

    if (!currentCell) return;
    let neighbours: cellProps[] = [];
    if (currentCell.row + 3 <= ROWS)
      neighbours.push(board[currentCell.row + 2][currentCell.col]);
    if (currentCell.row - 2 >= 0)
      neighbours.push(board[currentCell.row - 2][currentCell.col]);
    if (currentCell.col - 2 >= 0)
      neighbours.push(board[currentCell.row][currentCell.col - 2]);
    if (currentCell.col + 3 <= COL)
      neighbours.push(board[currentCell.row][currentCell.col + 2]);

    const neighboursInMaze = neighbours.filter((neighbour) => neighbour.inMaze);

    if (neighboursInMaze.length === 0) continue;
    const numNeighboursInMaze = neighboursInMaze.length;
    const randNeighbourInMazeIndex = Math.floor(
      Math.random() * numNeighboursInMaze
    );
    const randNeighbourInMaze = neighboursInMaze[randNeighbourInMazeIndex];
    const rowDifference = randNeighbourInMaze.row - currentCell.row;
    const colDifference = randNeighbourInMaze.col - currentCell.col;
    if (colDifference !== 0) {
      if (colDifference > 0) {
        board[currentCell.row][currentCell.col + 1].wall = false;
      } else board[currentCell.row][currentCell.col - 1].wall = false;
    }
    if (rowDifference !== 0) {
      if (rowDifference > 0) {
        board[currentCell.row + 1][currentCell.col].wall = false;
      } else board[currentCell.row - 1][currentCell.col].wall = false;
    }
    currentCell.inMaze = true;
  }

  dispatch({ type: "changeBoard", board: board });
  await sleep(0);
}

function BoardControls() {
  const [gameOfLifeRunning, setGameOfLifeRunning] = React.useState(false);
  const [showNewButton, setShowNewButton] = React.useState(false);
  const { board } = useBoardState();
  const [currentMode, setCurrentMode] = React.useState("shortest path");

  useInterval(
    () => {
      // Your custom logic here
      gameOfLifeTick(board, dispatch);
    },
    gameOfLifeRunning ? 500 : null
  );

  const dispatch = useBoardDispatch();

  return (
    <div className=" flex flex-row justify-center ">
      {currentMode === "shortest path" && (
        <>
          <button
            className="p-2 bg-orange-900 hover:bg-orange-700   m-2 rounded text-orange-100"
            onClick={() => {
              dijkstra(board, dispatch, setShowNewButton);
            }}
          >
            Find shortest Path
          </button>
          <button
            className="p-2 bg-yellow-900 m-2 hover:bg-yellow-700 rounded text-yellow-100"
            onClick={async () => {
              makePrimsMaze(generateNewBoard(COL, ROWS), dispatch);
            }}
          >
            Maze
          </button>
        </>
      )}
      {showNewButton && (
        <button
          className="p-2 bg-blue-900 m-2 hover:bg-blue-700 rounded text-blue-100"
          onClick={() => {
            dispatch({ type: "clear" });
            setShowNewButton(false);
          }}
        >
          New
        </button>
      )}
      {currentMode === "game of life" && (
        <>
          <button
            className="m-2 rounded p-2 bg-yellow-900 text-yellow-100 hover:bg-yellow-700"
            onClick={() => {
              setGameOfLifeRunning(!gameOfLifeRunning);
            }}
          >
            Toggle Auto
          </button>
          <button
            className="m-2 p-2 rounded bg-purple-900 text-purple-100 hover:bg-purple-700"
            onClick={() => {
              gameOfLifeTick(board, dispatch);
            }}
          >
            Step
          </button>
          <button
            className="p-2 bg-blue-900 m-2 hover:bg-blue-700 rounded text-blue-100"
            onClick={() => {
              dispatch({ type: "completeClear" });
            }}
          >
            New
          </button>
        </>
      )}
      {currentMode === "game of life" ? (
        <button
          className="p-2 bg-yellow-900 m-2 hover:bg-yellow-700 rounded text-yellow-100"
          onClick={() => {
            setCurrentMode("shortest path");
            setGameOfLifeRunning(false);
            dispatch({ type: "clear" });
            dispatch({ type: "setBrush", brush: "wall" });
          }}
        >
          Shortest Path
        </button>
      ) : (
        <button
          className="p-2 bg-green-900 m-2 hover:bg-green-700 rounded text-green-100"
          onClick={() => {
            setCurrentMode("game of life");
            dispatch({ type: "setBrush", brush: "alive" });
            dispatch({ type: "completeClear" });
          }}
        >
          Game Of Life
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BoardProvider>
      <BoardControls />
      <BrowserEventSetup>
        <React.Suspense fallback="LOADING">
          <BoardDisplay />
        </React.Suspense>
      </BrowserEventSetup>
    </BoardProvider>
  );
}
export { useBoardDispatch, useBoardState };
