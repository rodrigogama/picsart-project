import { useRef, useState } from "react";
import { ImageDropzone } from "../../components/ImageDropzone";
import { PageShell } from "../../components/PageShell";
import { IconColorPicker } from "../../components/IconColorPicker";
import { IconButton } from "../../components/IconButton/IconButton";
import { CanvasImage } from "../../components/CanvasImage";
import { ColorPickerCursor } from "../../components/ColorPickerCursor";
import { useColorDropperStore } from "../../store";
import clsx from "clsx";

export const ColorDropperPage = () => {
  const cursorCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgData, setImgData] = useState<string | null>(null);
  const [isColorDropperEnabled, setIsColorDropperEnabled] = useState(false);

  const {
    selectedColor,
    canvasManager,
    setSelectedColor,
    setCursorPosition,
    reset,
  } = useColorDropperStore();

  const toggleColorDropper = () => {
    setIsColorDropperEnabled((prevValue) => !prevValue);
    setCursorPosition(null, null);
  };

  const handleImageUpload = (imgSrc: string) => {
    setImgData(imgSrc);
  };

  const handleReset = () => {
    setImgData(null);
    setIsColorDropperEnabled(false);

    reset();
  };

  const handleCanvasMouseLeave = () => {
    setCursorPosition(null, null);
  };

  const handleCanvasMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isColorDropperEnabled || !canvasManager) return;

    const { clientX, clientY } = event;
    const { x, y } = canvasManager.getCursorPosition(clientX, clientY);
    setCursorPosition(x, y);
  };

  const handleCanvasClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvasManager) return;

    const { clientX, clientY } = event;
    const color = canvasManager.getColorAtPosition(clientX, clientY);
    setSelectedColor(color);
  };

  return (
    <PageShell>
      {!imgData && <ImageDropzone onImageLoaded={handleImageUpload} />}

      {imgData && (
        <div className="border border-1 border-gray-800 rounded p-2">
          <div className="grid grid-cols-3 items-center pb-2">
            <IconButton
              className={clsx(
                "border border-1 border-gray-200 hover:border-gray-300",
                {
                  "bg-slate-300 !border-gray-400": isColorDropperEnabled,
                }
              )}
              onClick={toggleColorDropper}
              icon={<IconColorPicker />}
            />
            <div className="flex items-center gap-x-4 justify-center">
              <span
                className="border border-1 w-8 h-8 rounded"
                style={{ backgroundColor: selectedColor }}
              />
              <p className="font-semibold uppercase text-gray-800 min-w-20">
                {selectedColor}
              </p>
            </div>
            <button
              className="w-fit justify-self-end rounded-full bg-brand-secondary px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
              onClick={handleReset}
            >
              Reset image
            </button>
          </div>

          <CanvasImage
            imageSrc={imgData}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={handleCanvasMouseLeave}
            onClick={handleCanvasClick}
            // className="cursor-none"
          />
          <ColorPickerCursor ref={cursorCanvasRef} />
        </div>
      )}
    </PageShell>
  );
};
