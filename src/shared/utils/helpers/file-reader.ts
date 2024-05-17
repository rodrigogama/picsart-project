export class FileReaderHelper {
  static readAsDataURL(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // set up event handlers
      reader.onload = () => resolve(this.handleLoad(reader));
      reader.onerror = () => reject(this.handleError(reader));

      reader.readAsDataURL(file);
    });
  }

  private static handleLoad(reader: FileReader): string | ArrayBuffer | null {
    return reader.result;
  }

  private static handleError(reader: FileReader): DOMException | null {
    return reader.error;
  }
}
