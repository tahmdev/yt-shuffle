import React, { Dispatch } from "react";
import { PlayerAction, PlayerState } from "./PlayerReducer";

interface Props {
  state: PlayerState;
  dispatch: Dispatch<PlayerAction>;
}
export const List: React.FC<Props> = ({ state, dispatch }) => {
  return (
    <div>
      <ul>
        {state.videos.map((video, i) => (
          <li key={i}>
            <div className="flex">
              <button
                className="flex"
                onClick={() => dispatch({ type: "PLAY_VIDEO", payload: video })}
              >
                <img
                  src={video.snippet.thumbnails.default.url}
                  alt={`Thumbnail of video ${video.snippet.title}`}
                />
                <div> {video.snippet.title} </div>
              </button>

              {state.skip.has(video.id) && (
                <button
                  onClick={() =>
                    dispatch({ type: "SKIP_REMOVE", payload: video })
                  }
                >
                  unskip
                </button>
              )}
              {!state.skip.has(video.id) && (
                <button
                  onClick={() => dispatch({ type: "SKIP_ADD", payload: video })}
                >
                  skip
                </button>
              )}

              <button
                onClick={() => dispatch({ type: "QUEUE_ADD", payload: video })}
              >
                queue
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
