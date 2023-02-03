import { Reducer } from "react";

let count = 0;
export type ToastActions =
  | {
      type: "ADD";
      payload: {
        text: string;
        type: "SUCCESS" | "ERROR" | "INFO";
        timer?: number;
      };
    }
  | {
      type: "REMOVE";
      payload: {
        id: number;
      };
    };

export interface Notification {
  type: string;
  text: string;
  id: number;
  timer: number;
}

export const toastReducer: Reducer<Notification[], ToastActions> = (
  state,
  action
) => {
  switch (action.type) {
    case "ADD":
      count++;
      return [
        ...state,
        {
          type: action.payload.type,
          text: action.payload.text,
          id: count,
          timer: action.payload.timer ?? 1000,
        },
      ];
    case "REMOVE":
      return state.filter((a) => a.id !== action.payload.id);
    default:
      return state;
  }
};
