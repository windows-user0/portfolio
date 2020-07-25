import { useInterval } from "../hooks/useInterval";
import { useBoardDispatch, useBoardState } from "../Contexts/boardContexts";
import { generatePathNewBoard } from "../helpers/board";
import gameOfLifeTick from "../Algorithms/gameOfLife";
import { useDijkstra } from "../Algorithms/dijkstra";
import { makePrimsMaze } from "../Algorithms/primsMaze";
import * as React from "react";

export default function BoardControls() {
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
