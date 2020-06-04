import React, { memo } from "react";
import { useBoardDispatch } from "../Contexts/boardContexts";
import "../App.css";
const Cell = (props: any) => {
  const {
    visited,
    isStart,
    isEnd,
    col,
    row,
    xCoord,
    wall,
    alive,
    shortestPath,
    movementShadow,
  } = props;
  const dispatch = useBoardDispatch();

  function cellTypeClass() {
    if (movementShadow) return "movement_shadow";
    if (shortestPath) return "shortest_path";
    if (alive) return "alive";
    if (wall) return "wall";
    if (isStart) return "start";
    if (isEnd) return "end";
    if (visited) return "visited";
  }
  return (
    <div
      ref={(el: any) => {
        if (el && !xCoord) {
          const { x, y, width } = el.getBoundingClientRect();
          dispatch({
            type: "changeCell",
            payload: {
              row: row,
              col: col,
              value: { xCoord: x, yCoord: y, width: width },
            },
          });
        }
      }}
      draggable={true}
      id={props.id}
      className={` cell bg-green-400 font-xs
      ${cellTypeClass()}
       `}
    />
  );
};

export default memo(Cell);
