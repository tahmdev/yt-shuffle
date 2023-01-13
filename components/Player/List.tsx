import React from "react";
import { IVideo } from "../../interfaces/IVideo";

interface Props {
  videos: IVideo[];
  addUpNext: (video: IVideo) => void;
  addSkip: (id: string) => void;
  removeSkip: (id: string) => void;
  skip: Set<string>;
  play: (video: IVideo) => void;
}
export const List: React.FC<Props> = ({
  addUpNext,
  videos,
  addSkip,
  removeSkip,
  skip,
  play,
}) => {
  return (
    <div>
      <ul>
        {videos.map((video, i) => (
          <li key={i}>
            <div className="flex">
              <button className="flex" onClick={() => play(video)}>
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
          </li>
        ))}
      </ul>
    </div>
  );
};
