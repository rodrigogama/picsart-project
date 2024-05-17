import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

vi.mock("../pages/ColorDropperPage", () => ({
  ColorDropperPage: () => <div>Color Dropper Page</div>,
}));

describe("[Routes]: AppRoutes", () => {
  it("should render ColorDropperPage for /color-dropper route", () => {
    render(
      <MemoryRouter initialEntries={["/color-dropper"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText("Color Dropper Page")).toBeInTheDocument();
  });

  it("should redirect to default path route from the index route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText("Color Dropper Page")).toBeInTheDocument();
  });
});
