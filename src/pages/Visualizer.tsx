import * as React from "react";
import GridCell from "../components/GridCell";
import { useInterval } from "../hooks/useInterval";
import {
  BoardProvider,
  useBoardDispatch,
  useBoardState,
} from "../Contexts/boardContexts";
import { cellProps } from "../Types/boardComponentTypes";
import { Dispatch } from "../Types/boardReducerTypes";
import { BrowserEventSetupProps } from "../Types/boardReducerTypes";
import {
  generatePathNewBoard,
  getBoardSize,
  getCellAtCoords,
  find4NeighboursCross,
  find9NeighboursAround,
} from "../helpers/board";
import { sleep } from "../helpers/sleep";
import Loading from "../components/Loading";
import { useDijkstra } from "../Algorithms/dijkstra";
import { makePrimsMaze } from "../Algorithms/primsMaze";
function preventDefault(e: Event) {
  e.preventDefault();
}
function enableScroll() {
  document.body.removeEventListener("touchmove", preventDefault);
}
function disableScroll() {
  document.body.addEventListener("touchmove", preventDefault, {
    passive: false,
  });
}

function BrowserEventSetup({ children }: BrowserEventSetupProps) {
  const [mousePressed, setMousePressed] = React.useState(false);

  const { board, brush, busy } = useBoardState();
  const dispatch = useBoardDispatch();

  const changeBoard = () => {
    dispatch({ type: "clear" });
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", () => setMousePressed(true));
    document.addEventListener("mouseup", () => setMousePressed(false));
    document.addEventListener("touchstart", () => {
      setMousePressed(true);
    });
    window.addEventListener("resize", changeBoard);
    document.addEventListener("touchend", () => {
      setMousePressed(false);
    });
    return function cleanup() {
      window.removeEventListener("resize", changeBoard);
      document.removeEventListener("mousedown", () => setMousePressed(true));
      document.removeEventListener("mouseup", () => setMousePressed(false));
      document.removeEventListener("touchstart", () => setMousePressed(true));
      document.removeEventListener("touchend", () => setMousePressed(false));
    };
  });

  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [draggedCell, setDraggedCell] = React.useState("");

  const func = (event: any) => {
    if (mousePressed || event.type === "click") {
      const x = event.clientX || event.touches[0].clientX;
      const y = event.clientY || event.touches[0].clientY;

      const currentCoords = getCellAtCoords(board, y - offset.y, x - offset.x);

      if (!currentCoords) return;

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
    <div className="flex justify-center pb-20">
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
      const aliveNeighbours = find9NeighboursAround(
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

function BoardDisplay() {
  const { board } = useBoardState();

  return (
    <>
      {board.map((row, rowIndex) => (
        <div className="flex flex-row " key={`Board-${rowIndex}`}>
          {row.map((cell, cellIndex) => (
            <GridCell
              key={`Board-${rowIndex}/${cellIndex}`}
              visited={board[rowIndex][cellIndex].visited}
              id={`Board-${rowIndex}/${cellIndex}`}
              findNeighbours={find4NeighboursCross}
              {...board[rowIndex][cellIndex]}
            />
          ))}
        </div>
      ))}
    </>
  );
}

function BoardControls() {
  const [gameOfLifeRunning, setGameOfLifeRunning] = React.useState(false);
  const [dijkstraFinished, setDijstraFinished] = React.useState(false);
  const { board } = useBoardState();
  const [currentMode, setCurrentMode] = React.useState("shortest path");

  useInterval(
    () => {
      gameOfLifeTick(board, dispatch);
    },
    gameOfLifeRunning ? 500 : null
  );

  const dispatch = useBoardDispatch();

  React.useEffect(() => {
    setDijkstraRunning(false);
  }, [dijkstraFinished]);

  const [dijkstraRunning, setDijkstraRunning] = React.useState<any>(false);
  const dijstra = useDijkstra(dijkstraRunning, setDijstraFinished);

  const ModeSwitcher = () => {
    switch (currentMode) {
      case "shortest path":
        return (
          <button
            className="p-2 bg-green-900 m-2 hover:bg-green-700 rounded text-green-100"
            onClick={() => {
              setCurrentMode("game of life");
              dispatch({ type: "setBrush", brush: "alive" });
              dispatch({ type: "completeClear" });
            }}
          >
            Switch to Game Of Life
          </button>
        );
      case "game of life":
        return (
          <button
            className="p-2 bg-yellow-900 m-2 hover:bg-yellow-700 rounded text-yellow-100"
            onClick={() => {
              setCurrentMode("shortest path");
              setGameOfLifeRunning(false);
              dispatch({ type: "clear" });
              dispatch({ type: "setBrush", brush: "wall" });
            }}
          >
            Switch to Game Of Life
          </button>
        );
      default:
        return <div>Error mode not set</div>;
    }
  };
  const ShortestPathControlls = () => {
    return (
      <div className="flex flex-row justify-center">
        {dijkstraFinished ? (
          <button
            className="p-2 bg-blue-900 m-2 hover:bg-blue-700 rounded text-blue-100"
            onClick={() => {
              dispatch({ type: "clear" });
              setDijstraFinished(false);
            }}
          >
            New
          </button>
        ) : (
          <>
            <button
              className="p-2 bg-orange-900 hover:bg-orange-700   m-2 rounded text-orange-100"
              onClick={() => {
                setDijkstraRunning(!dijkstraRunning);
              }}
            >
              Find shortest path
            </button>
          </>
        )}
        <button
          className="p-2 bg-yellow-900 m-2 hover:bg-yellow-700 rounded text-yellow-100"
          onClick={() => {
            setDijstraFinished(false);
            makePrimsMaze(generatePathNewBoard(), dispatch);
          }}
        >
          Maze
        </button>
      </div>
    );
  };
  const GameOfLifeControls = () => {
    return (
      <div className="flex flex-row justify-center">
        <button
          className="m-2 rounded p-2 bg-yellow-900 text-yellow-100 hover:bg-yellow-700"
          onClick={() => {
            setGameOfLifeRunning(!gameOfLifeRunning);
          }}
        >
          Auto
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
      </div>
    );
  };
  return (
    <div className=" flex flex-col justify-center ">
      <div className="flex justify-center ">
        <ModeSwitcher />
      </div>
      {currentMode === "shortest path" && <ShortestPathControlls />}
      {currentMode === "game of life" && <GameOfLifeControls />}
    </div>
  );
}

export default function App() {
  return (
    <BoardProvider>
      <BoardControls />
      <BrowserEventSetup>
        <React.Suspense fallback={<Loading />}>
          <BoardDisplay />
        </React.Suspense>
      </BrowserEventSetup>
    </BoardProvider>
  );
}
