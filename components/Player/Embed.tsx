import React, { SetStateAction, useEffect, useRef } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { IVideo } from "../../interfaces/IVideo";

interface Props {
  currentlyPlaying: IVideo;
  next: (e: any, error?: boolean) => void;
  isPaused: boolean;
  setIsPaused: React.Dispatch<SetStateAction<boolean>>;
}
export const Embed: React.FC<Props> = ({
  currentlyPlaying,
  next,
  isPaused,
  setIsPaused,
}) => {
  const playerRef = useRef<any>(null);

  const opts = {
    playerVars: {
      height: 390,
      width: 640,
      autoplay: 1,
      enablejsapi: 1,
      muted: 1,
    },
  };

  const onPause = () => {
    setIsPaused(true);
  };

  const onPlay = () => {
    setIsPaused(false);
  };

  const onReady: YouTubeProps["onReady"] = (e) => {
    //The built in ref parameter doesn't give access to
    //pause and play functions, so we assign it to an event target
    playerRef.current = e.target;
    console.log(e.target);

    if (e.target.playerInfo.playerState !== 1) {
      setIsPaused(true);
    }
  };

  useEffect(() => {
    if (!playerRef.current) return;
    if (!isPaused) playerRef.current.playVideo();
    else playerRef.current.pauseVideo();
  }, [isPaused]);

  return (
    <div>
      <YouTube
        videoId={currentlyPlaying.snippet.resourceId.videoId}
        title={currentlyPlaying.snippet.title}
        opts={opts}
        onError={(e) => next(e, true)}
        onEnd={next}
        onPause={onPause}
        onPlay={onPlay}
        onReady={onReady}
      />
    </div>
  );
};
