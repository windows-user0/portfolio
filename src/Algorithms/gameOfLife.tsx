import { Dispatch } from "../Types/boardReducerTypes";
import { cellProps } from "../Types/boardComponentTypes";
import { sleep } from "../helpers/sleep";
import { find9NeighboursAround } from "../helpers/board";
export default async function gameOfLifeTick(
    board: cellProps[][],
    dispatch: Dispatch
) {
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
