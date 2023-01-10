import React from "react";

interface Props {
  next: (e: any, error?: boolean) => void;
  prev: () => void;
  shuffle: () => void;
}
export const Controls: React.FC<Props> = ({ next, prev, shuffle }) => {
  return (
    <div>
      <button onClick={prev}>prev</button>
      <button onClick={next}>next</button>
      <button onClick={shuffle}>shuffle</button>
    </div>
  );
};
