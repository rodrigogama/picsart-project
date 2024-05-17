import { screen, render } from "@testing-library/react";
import { PageShell } from "./PageShell";

describe("PageShell component", () => {
  it("should render PageShell with children correctly", () => {
    render(
      <PageShell>
        <div>Test Content</div>
      </PageShell>
    );

    // dummy navbar
    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/picsart_logo.svg");

    // pageshell content
    const testContent = screen.getByText("Test Content");
    expect(testContent).toBeInTheDocument();
  });
});
