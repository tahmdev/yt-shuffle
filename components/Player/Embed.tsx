import React, { SetStateAction } from "react";
import ReactPlayer from "react-player";
import { IVideo } from "../../interfaces/IVideo";

interface Props {
  video: IVideo;
  next: (_?: any, error?: boolean) => void;
  isPaused: boolean;
  setIsPaused: React.Dispatch<SetStateAction<boolean>>;
}
export const Embed: React.FC<Props> = ({
  video,
  next,
  isPaused,
  setIsPaused,
}) => {
  return (
    <div>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
        playing={!isPaused}
        controls={true}
        onEnded={next}
        onPause={() => setIsPaused(true)}
        onPlay={() => setIsPaused(false)}
        onError={next}
        muted={true}
        height={390}
        width={640}
      />
    </div>
  );
};
