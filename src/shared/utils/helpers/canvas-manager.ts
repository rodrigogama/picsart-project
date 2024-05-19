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

  public getColorAtPosition(x: number, y: number): string | null {
    if (!this.context) return null;

    const pixel = this.context.getImageData(x, y, 1, 1).data;
    const [r, g, b] = pixel;
    return rgbToHex(r, g, b);
  }
}
