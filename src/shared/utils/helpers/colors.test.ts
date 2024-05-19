import { rgbToHex } from "./colors";

describe("[utils]: Colors helper", () => {
  it("should convert rgb(0, 0, 0) to #000000", () => {
    expect(rgbToHex(0, 0, 0)).toBe("#000000");
  });

  it("should convert rgb(255, 255, 255) to #ffffff", () => {
    expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
  });

  it("should convert rgb(255, 0, 0) to #ff0000", () => {
    expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
  });

  it("should convert rgb(0, 255, 0) to #00ff00", () => {
    expect(rgbToHex(0, 255, 0)).toBe("#00ff00");
  });

  it("should convert rgb(0, 0, 255) to #0000ff", () => {
    expect(rgbToHex(0, 0, 255)).toBe("#0000ff");
  });

  it("should convert rgb(173, 216, 230) to #add8e6", () => {
    expect(rgbToHex(173, 216, 230)).toBe("#add8e6");
  });

  it("should convert rgb(128, 128, 128) to #808080", () => {
    expect(rgbToHex(128, 128, 128)).toBe("#808080");
  });
});
