import { cellProps } from "./boardComponentTypes";

export type Dispatch = (action: Action) => void;
export type State = {
  board: cellProps[][];
  busy: boolean;
  brush: string;
};

export type Action =
  | { type: "clear" }
  | {
      type: "changeCell";
      payload: { row: number; col: number; value: {} };
    }
  | { type: "changeBoard"; board: cellProps[][] }
  | { type: "setBrush"; brush: string }
  | { type: "setBusy"; value: boolean }
  | { type: "completeClear" }
  | { type: "resize" };

export type BoardProviderProps = { children: React.ReactNode };
export type BrowserEventSetupProps = { children: React.ReactNode };
