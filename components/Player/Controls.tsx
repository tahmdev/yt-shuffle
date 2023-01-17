import React, { Dispatch } from "react";
import { PlayerAction, PlayerState } from "./Player";

interface Props {
  state: PlayerState;
  dispatch: Dispatch<PlayerAction>;
}
export const Controls: React.FC<Props> = ({ state, dispatch }) => {
  return (
    <div>
      <button onClick={() => dispatch({ type: "PREV" })}>prev</button>
      <button
        onClick={() => dispatch({ type: "SET_PAUSE", payload: !state.playing })}
      >
        {state.playing ? "pause" : "play"}
      </button>
      <button
        onClick={() => dispatch({ type: "NEXT", payload: { error: false } })}
      >
        next
      </button>
      <button onClick={() => dispatch({ type: "SHUFFLE" })}>shuffle</button>
    </div>
  );
};
