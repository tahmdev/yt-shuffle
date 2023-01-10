import React from "react";
import { IVideo } from "../../interfaces/IVideo";

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
        ))}
      </ul>
    </div>
  );
};
