import * as React from "react";
import {
  State,
  Dispatch,
  BoardProviderProps,
  Action,
} from "../Types/boardReducerTypes";
import {
  generateNewCleanBoard,
  generatePathNewBoard,
  getBoardSize,
} from "../helpers/board";
const BoardStateContext = React.createContext<State | undefined>(undefined);
const BoardDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

const initialState = {
  board: generatePathNewBoard(),
  killSignal: false,
  busy: false,
  brush: "wall",
};

export function BoardProvider({ children }: BoardProviderProps) {
  const [state, dispatch] = React.useReducer(boardReducer, initialState);
  return (
    <BoardStateContext.Provider value={state}>
      <BoardDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDispatchContext.Provider>
    </BoardStateContext.Provider>
  );
}

export function useBoardState() {
  const context = React.useContext(BoardStateContext);
  if (context === undefined) {
    throw new Error("useBoardState must be used within a BoardProvider");
  }
  return context;
}

export function useBoardDispatch() {
  const context = React.useContext(BoardDispatchContext);
  if (context === undefined) {
    throw new Error("useBoardDispatch must be used within a BoardProvider");
  }
  return context;
}

function boardReducer(state: State, action: Action) {
  switch (action.type) {
    case "clear": {
      return { ...state, board: generatePathNewBoard() };
    }
    case "completeClear": {
      return { ...state, board: generateNewCleanBoard() };
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
