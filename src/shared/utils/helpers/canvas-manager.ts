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

  public getColorAtPosition(clientX: number, clientY: number): string {
    if (!this.context) return "";

    const canvasCoordinates = this.canvas.getBoundingClientRect();
    const x = clientX - canvasCoordinates.left;
    const y = clientY - canvasCoordinates.top;

    const pixel = this.context.getImageData(x, y, 1, 1).data;
    const [r, g, b] = pixel;
    return rgbToHex(r, g, b);
  }

  public getCursorPosition(
    clientX: number,
    clientY: number
  ): { x: number | null; y: number | null } {
    if (!this.context) return { x: null, y: null };

    const canvasCoordinates = this.canvas.getBoundingClientRect();
    const x = clientX - canvasCoordinates.left;
    const y = clientY - canvasCoordinates.top - canvasCoordinates.height;

    return { x, y };
  }
}
