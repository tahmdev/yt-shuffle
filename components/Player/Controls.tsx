import React, { Dispatch } from "react";
import { PlayerAction, PlayerState } from "./PlayerReducer";

interface Props {
  state: PlayerState;
  dispatch: Dispatch<PlayerAction>;
}
export const Controls: React.FC<Props> = ({ state, dispatch }) => {
  return (
    <div className="flex justify-center gap-5 p-3 [&>*]:text-4xl">
      <button
        aria-label="Previous song"
        onClick={() => dispatch({ type: "PREV" })}
      >
        ⏮️
      </button>
      <button
        onClick={() => dispatch({ type: "SET_PAUSE", payload: !state.playing })}
      >
        {state.playing ? "⏸️" : "▶️"}
      </button>
      <button
        aria-label="Next song"
        onClick={() => dispatch({ type: "NEXT", payload: { error: false } })}
      >
        ⏭️
      </button>
      <button onClick={() => dispatch({ type: "SHUFFLE" })}>🔀</button>
    </div>
  );
};
