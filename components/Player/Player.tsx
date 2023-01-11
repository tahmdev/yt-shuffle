import React, { useEffect, useState } from "react";
import { IVideo } from "../../interfaces/IVideo";
import { getRandom } from "../../util/getRandom";
import { fisherYateShuffle } from "../../util/shuffle";
import { Controls } from "./Controls";
import { Embed } from "./Embed";
import { List } from "./List";

interface Props {
  videoProps: IVideo[];
}
export const Player: React.FC<Props> = ({ videoProps }) => {
  const [videos, setVideos] = useState(videoProps);
  const [upNext, setUpNext] = useState<IVideo[]>([]);
  const [lastPlayed, setLastPlayed] = useState<IVideo[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<IVideo>(
    getRandom(videoProps)
  );
  const [isPaused, setIsPaused] = useState(false);

  const shuffle = () => {
    const newState = fisherYateShuffle(videos);

    //Keep currentlyPlaying as first entry
    const playingIndex = newState.findIndex((e) => e === currentlyPlaying);
    [newState[0], newState[playingIndex]] = [
      newState[playingIndex],
      newState[0],
    ];
    setVideos(newState);
  };

  const next = (e: any, error = false) => {
    if (upNext.length) {
      setCurrentlyPlaying(upNext[0]);
      setUpNext((prev) => prev.slice(1));
    } else {
      const playingIndex = videos.findIndex((e) => e === currentlyPlaying);
      setCurrentlyPlaying(videos[playingIndex + 1]);
    }
    //Only add to lastPlayed if video was playable
    if (!error) {
      setLastPlayed((prev) => [...prev, currentlyPlaying]);
    }
  };

  const prev = () => {
    if (!lastPlayed.length) return;
    setCurrentlyPlaying(lastPlayed[lastPlayed.length - 1]);
    setLastPlayed((prev) => prev.slice(0, -1));
  };

  const addUpNext = (video: IVideo) => {
    setUpNext((prev) => [...prev, video]);
  };

  useEffect(() => {
    shuffle();
  }, []);

  return (
    <div>
      <div>
        <h1>DEBUG</h1>
        <button onClick={() => console.log(videos)}>aaa</button>
        <p>{currentlyPlaying.snippet.title}</p>
      </div>
      <Embed currentlyPlaying={currentlyPlaying} next={next} />
      <Controls next={next} prev={prev} shuffle={shuffle} />
      <List videos={videos} addUpNext={addUpNext} />
    </div>
  );
};
