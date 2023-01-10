import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { IVideo } from "../../interfaces/IVideo";

interface Props {
  currentlyPlaying: IVideo;
  next: (e: any, error?: boolean) => void;
}
export const Embed: React.FC<Props> = ({ currentlyPlaying, next }) => {
  const opts = {
    playerVars: {
      height: 390,
      width: 640,
      autoplay: 1,
      enablejsapi: 1,
      muted: 1,
    },
  };
  return (
    <div>
      <YouTube
        videoId={currentlyPlaying.snippet.resourceId.videoId}
        title={currentlyPlaying.snippet.title}
        opts={opts}
        onError={(e) => next(e, true)}
        onEnd={next}
      />
    </div>
  );
};
