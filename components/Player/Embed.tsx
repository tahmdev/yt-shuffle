import React, { Dispatch } from "react";
import ReactPlayer from "react-player";
import { PlayerAction, PlayerState } from "./PlayerReducer";

interface Props {
  state: PlayerState;
  dispatch: Dispatch<PlayerAction>;
}
export const Embed: React.FC<Props> = ({ state, dispatch }) => {
  return (
    <div className="h-full">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${state.currentlyPlaying.snippet.resourceId.videoId}`}
        playing={state.playing}
        controls={true}
        onEnded={() => dispatch({ type: "NEXT", payload: { error: false } })}
        onPause={() => dispatch({ type: "SET_PAUSE", payload: false })}
        onPlay={() => dispatch({ type: "SET_PAUSE", payload: true })}
        onError={() => dispatch({ type: "NEXT", payload: { error: true } })}
        muted={true}
        height={"100%"}
        width={"100%"}
      />
    </div>
  );
};
