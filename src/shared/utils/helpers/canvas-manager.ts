import { CANVAS_ZOOM_LEVEL } from "../../constants";
import { rgbToHex } from "./colors";

export class CanvasManager {
  private canvas: HTMLCanvasElement;
  private imageSrc: string;
  private context: CanvasRenderingContext2D | null;
  private aspectRatio: number = 1;

  constructor(canvas: HTMLCanvasElement, imageSrc: string) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d", { willReadFrequently: true });
    this.imageSrc = imageSrc;
  }

  public async loadImage(): Promise<void> {
    const image = new Image();
    image.src = this.imageSrc;

    return new Promise((resolve, reject) => {
      image.onload = () => {
        this.aspectRatio = image.width / image.height;
        this.drawImage(image);
        resolve();
      };

      image.onerror = (error) => reject(error);
    });
  }

  public resizeCanvas(container: HTMLElement): void {
    if (!this.context) return;

    const width = container.clientWidth;
    const height = width / this.aspectRatio;

    this.canvas.width = width;
    this.canvas.height = height;

    // redraw the image with the new dimensions
    this.loadImage();
  }

  private drawImage(image: HTMLImageElement): void {
    if (!this.context) return;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
  }

  private getCanvasXYCoordinates(
    clientX: number,
    clientY: number
  ): { x: number | null; y: number | null } {
    if (!this.context) return { x: null, y: null };

    const canvasCoordinates = this.canvas.getBoundingClientRect();
    const x = clientX - canvasCoordinates.left - CANVAS_ZOOM_LEVEL / 10;
    const y = clientY - canvasCoordinates.top - CANVAS_ZOOM_LEVEL / 10;

    return { x, y };
  }

  public getColorAtPosition(clientX: number, clientY: number): string {
    const { x, y } = this.getCanvasXYCoordinates(clientX, clientY);

    if (!this.context || x === null || y === null) return "";

    const pixel = this.context.getImageData(x, y, 1, 1).data;
    const [r, g, b] = pixel;
    return rgbToHex(r, g, b);
  }

  public getCursorPosition(
    clientX: number,
    clientY: number
  ): { x: number | null; y: number | null } {
    if (!this.context) return { x: null, y: null };

    const { x: canvasX, y: canvasY } = this.getCanvasXYCoordinates(
      clientX,
      clientY
    );

    const canvasCoordinates = this.canvas.getBoundingClientRect();
    const y = (canvasY ?? 0) - canvasCoordinates.height;

    return { x: canvasX, y };
  }

  public applyCursorZoom(
    cursorZoomCanvas: HTMLCanvasElement,
    coordinates: { clientX: number; clientY: number },
    zoomLevel = CANVAS_ZOOM_LEVEL
  ) {
    const { clientX, clientY } = coordinates;
    const { x, y } = this.getCanvasXYCoordinates(clientX, clientY);

    const zoomContext = cursorZoomCanvas.getContext("2d");

    if (!zoomContext || x === null || y === null) return;

    const { width, height } = cursorZoomCanvas;

    zoomContext.clearRect(0, 0, width, height);
    zoomContext.imageSmoothingEnabled = false;

    zoomContext.drawImage(
      this.canvas,
      x - zoomLevel / 2,
      y - zoomLevel / 2,
      zoomLevel,
      zoomLevel,
      0,
      0,
      width,
      height
    );

    this.drawZoomGrid(cursorZoomCanvas, zoomLevel);
  }

  private drawZoomGrid(cursorZoomCanvas: HTMLCanvasElement, zoomLevel: number) {
    const zoomContext = cursorZoomCanvas.getContext("2d");

    if (!zoomContext) return;

    const step = cursorZoomCanvas.width / zoomLevel;
    zoomContext.strokeStyle = "#a3a3a3";
    zoomContext.lineWidth = 1;

    // draw pixelated grid
    for (let i = 0; i <= zoomLevel; i++) {
      zoomContext.beginPath();
      zoomContext.moveTo(i * step, 0);
      zoomContext.lineTo(i * step, cursorZoomCanvas.height);
      zoomContext.moveTo(0, i * step);
      zoomContext.lineTo(cursorZoomCanvas.width, i * step);
      zoomContext.stroke();
    }

    // highlight the center cell
    const centerX = Math.floor(zoomLevel / 2);
    const centerY = Math.floor(zoomLevel / 2);
    zoomContext.strokeStyle = "#fff";
    zoomContext.lineWidth = 1.75;
    zoomContext.strokeRect(centerX * step, centerY * step, step, step);
  }
}
