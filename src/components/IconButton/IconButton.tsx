import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export const IconButton = ({ icon, className, ...buttonProps }: Props) => {
  return (
    <button
      className={clsx(
        "cursor-pointer rounded-full bg-gray-200 p-2 hover:bg-slate-300 transition-colors w-fit",
        className
      )}
      {...buttonProps}
    >
      {icon}
    </button>
  );
};

type Props = {
  icon: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
