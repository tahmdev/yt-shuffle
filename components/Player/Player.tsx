import Head from "next/head";
import React, { useEffect, useState } from "react";
import { IVideo } from "../../interfaces/IVideo";
import { getRandom } from "../../util/getRandom";
import { fisherYateShuffle } from "../../util/shuffle";
import { Controls } from "./Controls";
import { Embed } from "./Embed";
import { List } from "./List";

interface Props {
  videoProps: IVideo[];
  title?: boolean;
}
export const Player: React.FC<Props> = ({ videoProps, title }) => {
  const [videos, setVideos] = useState(videoProps);
  const [upNext, setUpNext] = useState<IVideo[]>([]);
  const [lastPlayed, setLastPlayed] = useState<IVideo[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<IVideo>(
    getRandom(videoProps)
  );
  const [isPaused, setIsPaused] = useState(false);
  const [skip, setSkip] = useState<Set<string>>(new Set());

  const shuffle = () => {
    const newState = fisherYateShuffle(videos);

    //Keep currentlyPlaying as first entry
    const playingIndex = newState.findIndex((e) => e === currentlyPlaying);
    [newState[0], newState[playingIndex]] = [
      newState[playingIndex],
      newState[0],
    ];
    setVideos(newState);
    setUpNext([]);
    setLastPlayed([]);
  };

  const play = (video: IVideo) => {
    setLastPlayed((prev) => [...prev, currentlyPlaying]);
    setCurrentlyPlaying(video);
  };

  const next = (_: any = null, error = false, skipIndex = 1) => {
    let nextVideo: IVideo;
    if (upNext.length) {
      nextVideo = upNext[0];
      setUpNext((prev) => prev.slice(1));
    } else {
      const playingIndex = videos.findIndex((e) => e === currentlyPlaying);
      nextVideo = videos[playingIndex + skipIndex];
    }
    //Only add to lastPlayed if video was playable and not skipped
    if (!error) {
      setLastPlayed((prev) => [...prev, currentlyPlaying]);
    }

    if (!nextVideo) next(_, true, skipIndex - videos.length);
    else if (skip.has(nextVideo.id)) next(_, true, skipIndex + 1);
    else setCurrentlyPlaying(nextVideo);
  };

  const prev = () => {
    if (!lastPlayed.length) return;
    setCurrentlyPlaying(lastPlayed[lastPlayed.length - 1]);
    setLastPlayed((prev) => prev.slice(0, -1));
    setUpNext((prev) => [currentlyPlaying, ...prev]);
  };

  const addUpNext = (video: IVideo) => {
    setUpNext((prev) => [...prev, video]);
  };

  const addSkip = (id: string) => {
    const newState = new Set(skip);
    newState.add(id);
    setSkip(newState);
  };

  const removeSkip = (id: string) => {
    const newState = new Set(skip);
    newState.delete(id);
    setSkip(newState);
  };

  useEffect(() => {
    shuffle();
  }, []);

  return (
    <>
      {title && (
        <Head>
          <title> {currentlyPlaying.snippet.title} </title>
        </Head>
      )}
      <div>
        <Embed
          video={currentlyPlaying}
          next={next}
          setIsPaused={setIsPaused}
          isPaused={isPaused}
        />
        <Controls
          next={next}
          prev={prev}
          shuffle={shuffle}
          setIsPaused={setIsPaused}
          isPaused={isPaused}
        />
        <List
          videos={videos}
          addUpNext={addUpNext}
          addSkip={addSkip}
          removeSkip={removeSkip}
          skip={skip}
          play={play}
        />
      </div>
    </>
  );
};
