import React from "react";
import { IVideo } from "../interfaces/IVideo";

interface Props {
  video: IVideo;
}
export const VideoCard: React.FC<Props> = ({
  video,
  addSkip,
  removeSkip,
  skip,
}) => {
  return (
    <div className="flex">
      <button className="flex" onClick={() => console.log(video)}>
        <img
          src={video.snippet.thumbnails.default.url}
          alt={`Thumbnail of video ${video.snippet.title}`}
        />
        <div> {video.snippet.title} </div>
    </div>
  );
};
