import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import "vitest-webgl-canvas-mock";

class MockFileReader {
  result: string | ArrayBuffer | null = null;
  error: DOMException | null = null;
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;

  readAsDataURL(file: Blob) {
    if (file.type.startsWith("image/")) {
      this.result = "data:image/mock;base64,AAAA"; // Mocked result
      if (this.onload) this.onload(); // Trigger load event
    } else {
      this.error = new DOMException("Invalid file type");
      if (this.onerror) this.onerror(); // Trigger error event
    }
  }
}

global.FileReader = MockFileReader as any;

global.console = {
  ...console,
  error: vi.fn(),
};

afterEach(() => {
  cleanup();
});
