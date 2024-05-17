import { render } from "@testing-library/react";
import { Navbar } from "./Navbar";

describe("[components]: Navbar", () => {
  it("should render the Navbar with Picsart logo", () => {
    const { getByAltText } = render(<Navbar />);
    const logo = getByAltText("Picsart logo");

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/picsart_logo.svg");
  });

  it("should apply correct class names", () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");
    const div = container.querySelector("div");
    const img = container.querySelector("img");

    expect(nav).toHaveClass("bg-white shadow");
    expect(div).toHaveClass("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8");
    expect(img).toHaveClass("h-6 w-auto");
  });
});
