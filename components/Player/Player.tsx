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
    queue: [],
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
      <div>
        <Embed state={state} dispatch={dispatch} />
        <Controls state={state} dispatch={dispatch} />
        <List state={state} dispatch={dispatch} />
      </div>
    </>
  );
};
