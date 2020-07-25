import { useBoardDispatch, useBoardState } from "../Contexts/boardContexts";
import * as React from "react";
import { BrowserEventSetupProps } from "../Types/boardReducerTypes";
import { getCellAtCoords } from "../helpers/board";
import { enableScroll, disableScroll } from "../helpers/scroll";

export default function BrowserEventSetup({
    children,
}: BrowserEventSetupProps) {
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
            document.removeEventListener("mousedown", () =>
                setMousePressed(true)
            );
            document.removeEventListener("mouseup", () =>
                setMousePressed(false)
            );
            document.removeEventListener("touchstart", () =>
                setMousePressed(true)
            );
            document.removeEventListener("touchend", () =>
                setMousePressed(false)
            );
        };
    });

    const [offset, setOffset] = React.useState({ x: 0, y: 0 });
    const [draggedCell, setDraggedCell] = React.useState("");

    const func = (event: any) => {
        if (mousePressed || event.type === "click") {
            const x = event.clientX || event.touches[0].clientX;
            const y = event.clientY || event.touches[0].clientY;

            const currentCoords = getCellAtCoords(
                board,
                y - offset.y,
                x - offset.x
            );

            if (!currentCoords) return;

            const currentCell = board[currentCoords.row][currentCoords.col];

            if (
                !currentCell.wall &&
                !currentCell.isEnd &&
                !currentCell.isStart
            ) {
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
        const currentCoords = getCellAtCoords(
            board,
            y - offset.y,
            x - offset.x
        );
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
                        const currentCell =
                            board[currentCoords.row][currentCoords.col];
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
