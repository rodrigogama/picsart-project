import { forwardRef, useEffect, useRef } from "react";
import clsx from "clsx";
import { useColorDropperStore } from "../../store";

export const ColorPickerCursor = forwardRef<HTMLCanvasElement>((_, ref) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const { cursorXPosition, cursorYPosition, hoveredColor } =
    useColorDropperStore();

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
      <div className="relative">
        <canvas
          ref={ref}
          width={150}
          height={150}
          className="border-[10px] rounded-full"
          style={{
            imageRendering: "pixelated",
            borderColor: hoveredColor,
          }}
        />

        {hoveredColor && (
          <div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-2/3 uppercase text-center text-xs font-semibold text-white bg-gray-400 rounded-md py-1 px-2">
            {hoveredColor}
          </div>
        )}
      </div>
    </div>
  );
});
