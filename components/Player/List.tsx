import React, { Dispatch } from "react";
import { Button } from "../Button";
import { PlayerAction, PlayerState } from "./PlayerReducer";

interface Props {
  state: PlayerState;
  dispatch: Dispatch<PlayerAction>;
}
export const List: React.FC<Props> = ({ state, dispatch }) => {
  return (
    <ul className="flex flex-col gap-3">
      {state.videos.map((video, i) => (
        <li key={i} className="flex h-20 w-full first:mt-3">
          <button
            className={`mr-2 ml-2 flex w-full items-center overflow-hidden rounded-md bg-slate-600 hover:bg-slate-700 ${
              state.skip.has(video) ? "bg-slate-800 text-gray-400" : ""
            }`}
            onClick={() => dispatch({ type: "PLAY_VIDEO", payload: video })}
          >
            <img
              className="ml-2 aspect-square h-5/6 rounded-md object-cover"
              src={
                video.snippet.thumbnails.maxres
                  ? video.snippet.thumbnails.maxres.url
                  : video.snippet.thumbnails.default.url
              }
              alt={`Thumbnail of video ${video.snippet.title}`}
            />
            <div className="ml-2 h-full w-full overflow-hidden text-left [&>*]:overflow-hidden [&>*]:text-ellipsis [&>*]:whitespace-nowrap">
              <p>{video.snippet.title}</p>
              <p>{video.snippet.videoOwnerChannelTitle}</p>
            </div>
          </button>
          <div className="ml-auto mr-2 flex w-fit gap-3 ">
            <Button
              className={`px-2 ${
                state.queue.has(video) ? "bg-blue-900 hover:bg-blue-900" : ""
              }`}
              onClick={() => dispatch({ type: "QUEUE_TOGGLE", payload: video })}
            >
              Next
            </Button>
            <Button
              className={`px-2 ${
                state.skip.has(video) ? "bg-blue-900 hover:bg-blue-900" : ""
              }`}
              onClick={() => dispatch({ type: "SKIP_TOGGLE", payload: video })}
            >
              Skip
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};
