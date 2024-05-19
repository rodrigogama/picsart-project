import { forwardRef, useEffect, useRef } from "react";
import clsx from "clsx";
import { useColorDropperStore } from "../../store";

export const ColorPickerCursor = forwardRef<HTMLCanvasElement>((_, ref) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const { cursorXPosition, cursorYPosition } = useColorDropperStore();

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(calc(${cursorXPosition}px - 50%), calc(${cursorYPosition}px - 50%), 0px)`;
    }
  }, [cursorXPosition, cursorYPosition]);

  const hasCursorPosition =
    cursorXPosition !== null && cursorYPosition !== null;

  return (
    <div
      ref={cursorRef}
      className={clsx("fixed pointer-events-none invisible -z-10", {
        "z-10 !visible": hasCursorPosition,
      })}
      style={{ transform: "translate3d(0px, 0px, 0px)" }}
    >
      <canvas
        ref={ref}
        width={100}
        height={100}
        className="border border-1 border-gray-800 rounded-full"
      />
    </div>
  );
});
