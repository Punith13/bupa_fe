import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./Loader"; // Assuming the component is in a separate file

describe("Loader Component", () => {
  test("renders without errors", () => {
    render(<Loader />);
    const loader = screen.getByTestId("loader"); // Add data-testid to the root element
    expect(loader).toBeInTheDocument();
  });

  test("applies the correct styling classes", () => {
    render(<Loader />);
    const loader = screen.getByTestId("loader");

    // Check for the expected Tailwind CSS classes
    expect(loader).toHaveClass("w-12");
    expect(loader).toHaveClass("h-12");
    expect(loader).toHaveClass("rounded-full");
    expect(loader).toHaveClass("animate-spin");
    expect(loader).toHaveClass("border");
    expect(loader).toHaveClass("border-solid");
    expect(loader).toHaveClass("border-yellow-500");
    expect(loader).toHaveClass("border-t-transparent");
  });
});
