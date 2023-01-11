import React, { SetStateAction } from "react";

interface Props {
  next: (e: any, error?: boolean) => void;
  prev: () => void;
  shuffle: () => void;
  setIsPaused: React.Dispatch<SetStateAction<boolean>>;
  isPaused: boolean;
}
export const Controls: React.FC<Props> = ({
  next,
  prev,
  shuffle,
  setIsPaused,
  isPaused,
}) => {
  return (
    <div>
      <button onClick={prev}>prev</button>
      <button onClick={() => setIsPaused((prev) => !prev)}>
        {isPaused ? "play" : "pause"}
      </button>
      <button onClick={next}>next</button>
      <button onClick={shuffle}>shuffle</button>
    </div>
  );
};
