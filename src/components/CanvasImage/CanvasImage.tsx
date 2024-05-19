import { useEffect, useRef, CanvasHTMLAttributes } from "react";
import { CanvasManager } from "../../shared/utils/helpers";
import { useColorDropperStore } from "../../store";

export const CanvasImage = ({ imageSrc, ...canvasProps }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setCanvasManager = useColorDropperStore(
    (state) => state.setCanvasManager
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (canvas && container) {
      const manager = new CanvasManager(canvas, imageSrc);
      setCanvasManager(manager);

      const handleResize = () => {
        manager.resizeCanvas(container);
      };

      manager.loadImage().then(handleResize);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [imageSrc, setCanvasManager]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center"
    >
      <canvas ref={canvasRef} {...canvasProps} />
    </div>
  );
};

type Props = {
  imageSrc: string;
} & CanvasHTMLAttributes<HTMLCanvasElement>;
