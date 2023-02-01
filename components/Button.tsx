import React, { PropsWithChildren } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
}
export const Button: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={`rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 ${
        className ?? ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};
