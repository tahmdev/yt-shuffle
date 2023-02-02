import Head from "next/head";
import React, { useEffect, useReducer } from "react";
import { IVideo } from "../../interfaces/IVideo";
import { getRandom } from "../../util/getRandom";
import { Controls } from "./Controls";
import { Embed } from "./Embed";
import { List } from "./List";
import { playerReducer, PlayerState } from "./PlayerReducer";

interface Props {
  videoProps: IVideo[];
  title?: boolean;
}

const initializeState = (videos: IVideo[]): PlayerState => {
  return {
    videos: videos,
    currentlyPlaying: getRandom(videos),
    playing: true,
    lastPlayed: [],
    skip: new Set(),
    queue: new Set(),
  };
};

export const Player: React.FC<Props> = ({ videoProps, title }) => {
  const [state, dispatch] = useReducer(
    playerReducer,
    initializeState(videoProps)
  );

  useEffect(() => {
    dispatch({ type: "SHUFFLE" });
  }, []);

  return (
    <>
      {title && (
        <Head>
          <title> {state.currentlyPlaying.snippet.title} </title>
        </Head>
      )}
      <div className="flex h-full w-full basis-full flex-col ">
        <div className="flex h-1/3 min-h-[18rem] w-full flex-col">
          <Embed state={state} dispatch={dispatch} />
          <Controls state={state} dispatch={dispatch} />
        </div>
        <div className="h-full w-full overflow-y-scroll border-t-2 border-slate-100">
          <List state={state} dispatch={dispatch} />
        </div>
      </div>
    </>
  );
};
