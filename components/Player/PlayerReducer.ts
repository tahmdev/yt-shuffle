import { Reducer } from "react";
import { IVideo } from "../../interfaces/IVideo";
import { fisherYateShuffle } from "../../util/shuffle";

export type PlayerState = {
  videos: IVideo[];
  queue: IVideo[];
  lastPlayed: IVideo[];
  currentlyPlaying: IVideo;
  skip: Set<string>;
  playing: boolean;
};
export type PlayerAction =
  | { type: "PLAY_VIDEO"; payload: IVideo }
  | { type: "SHUFFLE" }
  | { type: "NEXT"; payload: { error: boolean } }
  | { type: "PREV" }
  | { type: "QUEUE_ADD"; payload: IVideo }
  | { type: "SKIP_ADD"; payload: IVideo }
  | { type: "SKIP_REMOVE"; payload: IVideo }
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
      let i = state.videos.findIndex((e) => e === state.currentlyPlaying);
      const nextVideo =
        [
          ...state.queue,
          ...state.videos.slice(i + 1),
          ...state.videos.slice(0, i + 1),
        ].find((e) => !state.skip.has(e.id)) ?? state.videos[0];
      return {
        ...state,
        currentlyPlaying: nextVideo,
        upNext: state.queue.slice(1),
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
    case "QUEUE_ADD": {
      return { ...state, queue: [...state.queue, action.payload] };
    }
    case "SKIP_ADD": {
      const newSkip = new Set(state.skip);
      newSkip.add(action.payload.id);
      return { ...state, skip: newSkip };
    }
    case "SKIP_REMOVE": {
      const newSkip = new Set(state.skip);
      newSkip.delete(action.payload.id);
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