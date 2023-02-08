import Head from "next/head";
import React, { useEffect, useReducer, useRef } from "react";
import { IVideo } from "../../interfaces/IVideo";
import { getRandom } from "../../util/getRandom";
import { Controls } from "./Controls";
import { Embed } from "./Embed";
import { List } from "./List";
import { playerReducer, PlayerState } from "./PlayerReducer";

interface Props {
  videoProps: IVideo[];
  title?: boolean;
  background?: boolean;
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

export const Player: React.FC<Props> = ({ videoProps, title, background }) => {
  const [state, dispatch] = useReducer(
    playerReducer,
    initializeState(videoProps)
  );

  const backgroundRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    dispatch({ type: "SHUFFLE" });
  }, []);

  useEffect(() => {
    if (!backgroundRef.current) return;
    backgroundRef.current.style.backgroundImage = `url(${
      state.currentlyPlaying.snippet.thumbnails.maxres
        ? state.currentlyPlaying.snippet.thumbnails.maxres.url
        : state.currentlyPlaying.snippet.thumbnails.default.url
    })`;
  }, [state]);

  return (
    <>
      {title && (
        <Head>
          <title> {state.currentlyPlaying.snippet.title} </title>
        </Head>
      )}
      <div className="z-10 flex h-full w-full max-w-xl basis-full flex-col rounded-md bg-slate-800 lg:max-h-[30rem] lg:max-w-6xl lg:flex-row-reverse  lg:gap-7 lg:pr-2 lg:align-middle lg:shadow-2xl lg:drop-shadow-2xl">
        <div className="flex h-1/3 min-h-[18rem] w-full flex-col md:min-h-[22rem] lg:my-auto">
          <Embed state={state} dispatch={dispatch} />
          <Controls state={state} dispatch={dispatch} />
        </div>
        <div className="h-full w-full overflow-y-scroll border-t-2 border-slate-100 lg:border-0">
          <List state={state} dispatch={dispatch} />
        </div>
      </div>

      {background && (
        <div
          className="absolute h-full w-full bg-slate-900 bg-cover bg-center blur-2xl transition-all"
          ref={backgroundRef}
        ></div>
      )}
    </>
  );
};
