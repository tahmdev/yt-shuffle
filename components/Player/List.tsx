import React from "react";
import { IVideo } from "../../interfaces/IVideo";
import { VideoCard } from "../VideoCard";

interface Props {
  videos: IVideo[];
  addUpNext: (video: IVideo) => void;
}
export const List: React.FC<Props> = ({ addUpNext, videos }) => {
  return (
    <div>
      <ul>
        {videos.map((el, i) => (
          <li key={i}> {el.snippet.title} </li>
          <li key={i}>
            <VideoCard
              video={el}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
