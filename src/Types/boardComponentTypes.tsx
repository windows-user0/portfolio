export interface cellProps {
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
