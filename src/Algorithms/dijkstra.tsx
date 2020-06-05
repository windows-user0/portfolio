import { find4NeighboursCross, drawPath } from "../helpers/board";
import { cellProps } from "../Types/boardComponentTypes";
import { useInterval } from "../hooks/useInterval";
import { useBoardDispatch, useBoardState } from "../Contexts/boardContexts";
import * as React from "react";

/// How dijksta works
//  We find a start (set on the board)
// We add that start to the frontier array
// we remove first element from frontier array
// if its a wall we skip it
// then we find neighbours of it in a cross pattern
// and we visit each neighbour and add it to the frontier, and add data to it like previous cell
// we loop back to removing first element from frontier
// until we find the endcell
// and then we backtrack our way through previous cells
export async function useDijkstra(
  running: boolean,
  setDijstraFinished: React.ComponentState
) {
  const { board } = useBoardState();

  const [frontier, setFrontier] = React.useState<cellProps[]>([]);
  const [visitedInOrder, setVisitedInOrder] = React.useState<cellProps[]>([]);
  const dispatch = useBoardDispatch();

  // interval hook that calls step each 0ms,if running variable is true
  // and then rerenders board
  useInterval(
    () => {
      dijkstraStep();
      dispatch({ type: "changeBoard", board: board });
    },
    running ? 0 : null
  );

  // runs when user clicks button and changes "running" variable
  // Scans the entire board for start cell and sets it in state
  React.useEffect(() => {
    for (const row of board) {
      for (const cell of row) {
        if (cell.isStart) {
          // set whole frontier to just start cell
          setFrontier([{ ...cell, distance: 0 }]);
          break;
        }
      }
    }
    // remove all visited nodes in order if this is a repeated run
    setVisitedInOrder([]);
  }, [running]);

  // internal function for step of dijkstra
  // used for interval management
  const dijkstraStep = () => {
    // Remove first element from frontier
    const closestCell = frontier.shift();

    // If there was no closest element, finish dijkstra and return
    if (!closestCell) {
      setDijstraFinished(true);
      return;
    }

    // If closest cell is a wall, skip
    if (closestCell.wall) return;

    // if closest cell is a end, we found the end.
    // we can finish
    if (closestCell.isEnd) {
      const nodesInShortestPathOrder = createShortestPathInOrder(closestCell);
      // draw the path
      drawPath(nodesInShortestPathOrder, dispatch);
      setDijstraFinished(true);
      return;
    }

    // Add closest cell to visited array
    setVisitedInOrder([...visitedInOrder, closestCell]);

    // Find all neighbours of this cell, and sort the ones that are not visited already
    const notVisitedNeighbours = find4NeighboursCross(
      closestCell.row,
      closestCell.col,
      board
    ).filter((neighbour) => neighbour && !neighbour.visited);

    notVisitedNeighbours.forEach((neighbour) => {
      if (closestCell.distance !== undefined) {
        // Set each neighbour as visited
        board[neighbour.row][neighbour.col].visited = true;
        // push it to frontier with a previous of this cell
        // and a distance of this cell +1
        // this is so we can find our path back
        frontier.push({
          ...neighbour,
          distance: closestCell.distance + 1,
          previous: closestCell,
        });
      }
    });
  };
}

//creates shortest path in order from distances
function createShortestPathInOrder(closestCell: cellProps): cellProps[] {
  const cellsInShortestPathOrder = [];
  let currentNode = closestCell;
  // go from closest cell, which is the end in this
  // in a loop while theres a previous one,
  // add it to the start of shortest order array
  while (currentNode.previous) {
    cellsInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previous;
  }
  return cellsInShortestPathOrder;
}
