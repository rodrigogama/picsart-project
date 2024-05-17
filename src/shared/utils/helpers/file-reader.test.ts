import { FileReaderHelper } from "./file-reader";

describe("[utils]: FileReader helper", () => {
  it("should read a file as DataURL", async () => {
    const file = new File(["content"], "test.png", { type: "image/png" });

    const result = await FileReaderHelper.readAsDataURL(file);
    expect(result).toBe("data:image/mock;base64,AAAA");
  });

  it("should throw an error for non-image files", async () => {
    const file = new File(["content"], "test.pdf", { type: "application/pdf" });

    await expect(FileReaderHelper.readAsDataURL(file)).rejects.toThrow(
      "Invalid file type"
    );
  });
});
