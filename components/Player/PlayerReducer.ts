import { Reducer } from "react";
import { IVideo } from "../../interfaces/IVideo";
import { findAndRemoveAllBefore } from "../../util/removeAllBefore";
import { setToggle } from "../../util/setToggle";
import { fisherYateShuffle } from "../../util/shuffle";

export type PlayerState = {
  videos: IVideo[];
  queue: Set<IVideo>;
  lastPlayed: IVideo[];
  currentlyPlaying: IVideo;
  skip: Set<IVideo>;
  playing: boolean;
};
export type PlayerAction =
  | { type: "PLAY_VIDEO"; payload: IVideo }
  | { type: "SHUFFLE" }
  | { type: "NEXT"; payload: { error: boolean } }
  | { type: "PREV" }
  | { type: "QUEUE_TOGGLE"; payload: IVideo }
  | { type: "SKIP_TOGGLE"; payload: IVideo }
  | { type: "SET_PAUSE"; payload: boolean };

export const playerReducer: Reducer<PlayerState, PlayerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "PLAY_VIDEO": {
      return {
        ...state,
        currentlyPlaying: action.payload,
        lastPlayed: [...state.lastPlayed, state.currentlyPlaying],
      };
    }
    case "SHUFFLE": {
      const shuffledVideos = fisherYateShuffle(state.videos);
      //Keep currently playing song at index 0
      const i = shuffledVideos.findIndex((e) => e === state.currentlyPlaying);
      [shuffledVideos[0], shuffledVideos[i]] = [
        shuffledVideos[i],
        shuffledVideos[0],
      ];
      return { ...state, videos: shuffledVideos, upNext: [], lastPlayed: [] };
    }
    case "NEXT": {
      const playingIndex = state.videos.findIndex(
        (e) => e === state.currentlyPlaying
      );
      const nextVideo =
        [
          ...state.queue,
          ...state.videos.slice(playingIndex + 1),
          ...state.videos.slice(0, playingIndex + 1),
        ].find((e) => !state.skip.has(e)) ?? state.videos[0];

      const newQueueArray = findAndRemoveAllBefore(
        [...state.queue],
        (e) => !state.skip.has(e),
        true
      );

      return {
        ...state,
        currentlyPlaying: nextVideo,
        queue: new Set(newQueueArray),
        lastPlayed: action.payload.error
          ? [...state.lastPlayed]
          : [...state.lastPlayed, state.currentlyPlaying],
      };
    }
    case "PREV": {
      if (!state.lastPlayed.length) return { ...state };
      return {
        ...state,
        currentlyPlaying: state.lastPlayed[state.lastPlayed.length - 1],
        lastPlayed: state.lastPlayed.slice(0, -1),
        upNext: [state.currentlyPlaying, ...state.queue],
      };
    }
    case "QUEUE_TOGGLE": {
      const newQueue = new Set(state.queue);
      setToggle(newQueue, action.payload);
      return { ...state, queue: newQueue };
    }
    case "SKIP_TOGGLE": {
      const newSkip = new Set(state.skip);
      setToggle(newSkip, action.payload);
      return { ...state, skip: newSkip };
    }
    case "SET_PAUSE": {
      return { ...state, playing: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};
