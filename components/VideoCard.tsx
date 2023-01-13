import React from "react";
import { IVideo } from "../interfaces/IVideo";

interface Props {
  video: IVideo;
  addSkip: (id: string) => void;
  removeSkip: (id: string) => void;
  skip: Set<string>;
  addUpNext: (video: IVideo) => void;
}
export const VideoCard: React.FC<Props> = ({
  video,
  addSkip,
  removeSkip,
  skip,
  addUpNext,
}) => {
  return (
    <div className="flex">
      <button className="flex" onClick={() => console.log(video)}>
        <img
          src={video.snippet.thumbnails.default.url}
          alt={`Thumbnail of video ${video.snippet.title}`}
        />
        <div> {video.snippet.title} </div>
      </button>

      {skip.has(video.id) ? (
        <button onClick={() => removeSkip(video.id)}>unskip</button>
      ) : (
        <button onClick={() => addSkip(video.id)}>skip</button>
      )}

      <button onClick={() => addUpNext(video)}>queue</button>
    </div>
  );
};
