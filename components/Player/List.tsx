import React from "react";
import { IVideo } from "../../interfaces/IVideo";
import { VideoCard } from "../VideoCard";

interface Props {
  videos: IVideo[];
  addUpNext: (video: IVideo) => void;
  addSkip: (id: string) => void;
  removeSkip: (id: string) => void;
  skip: Set<string>;
}
export const List: React.FC<Props> = ({
  addUpNext,
  videos,
  addSkip,
  removeSkip,
  skip,
}) => {
  return (
    <div>
      <ul>
        {videos.map((el, i) => (
          <li key={i}>
            <VideoCard
              video={el}
              addSkip={addSkip}
              removeSkip={removeSkip}
              skip={skip}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
