import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header"; // Assuming the component is in a separate file

describe("Header Component", () => {
  test("renders without errors", () => {
    render(<Header />);

    const loader = screen.getByTestId("header"); // Add data-testid to the root element
    expect(loader).toBeInTheDocument();
  });

  test("applies the correct styling classes", () => {
    render(<Header />);
    const header = screen.getByText("Owners and Books");
    expect(header).toHaveClass("text-2xl"); // Check for the text size class
    expect(header).toHaveClass("sm:text-4xl"); // Check for the text size class for larger screens
    expect(header).toHaveClass("bg-bupa_blue"); // Check for the background color class
    expect(header).toHaveClass("text-white"); // Check for the text color class
    expect(header).toHaveClass("text-center"); // Check for the text alignment class
    expect(header).toHaveClass("py-4"); // Check for the padding class
  });

  test("has the correct text content", () => {
    render(<Header />);
    const header = screen.getByText("Owners and Books");
    expect(header.textContent).toBe("Owners and Books");
  });
});
