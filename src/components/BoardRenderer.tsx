import { find4NeighboursCross } from "../helpers/board";
import { useBoardState } from "../Contexts/boardContexts";
import GridCell from "../components/GridCell";
import * as React from "react";
export default function BoardDisplay() {
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
