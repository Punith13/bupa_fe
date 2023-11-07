import React from "react";
import { render, screen } from "@testing-library/react";
import Book from "./Book";

describe("Book Component", () => {
  test("renders without errors", () => {
    render(
      <Book hardCover={true} bookTitles={["Book 1", "Book 2"]} gender="Male" />,
    );
    const bookComponent = screen.getByText("Hardcover Books with Male Owners");
    expect(bookComponent).toBeInTheDocument();
  });

  test("displays 'Hardcover' when hardCover is true", () => {
    render(<Book hardCover={true} bookTitles={["Book 1"]} gender="Female" />);
    const hardCoverText = screen.getByText(
      "Hardcover Books with Female Owners",
    );
    expect(hardCoverText).toBeInTheDocument();
  });

  test("displays gender correctly in the title", () => {
    render(<Book hardCover={false} bookTitles={["Book 1"]} gender="Male" />);
    const titleText = screen.getByText("Books with Male Owners");
    expect(titleText).toBeInTheDocument();
  });

  test("renders book titles", () => {
    const bookTitles = ["Book 1", "Book 2", "Book 3"];
    render(<Book hardCover={false} bookTitles={bookTitles} gender="Female" />);

    for (const title of bookTitles) {
      const titleElement = screen.getByText(title);
      expect(titleElement).toBeInTheDocument();
    }
  });

  test("applies the correct Tailwind CSS classes for mobile", () => {
    // Set a mobile-sized viewport (e.g., 360x640 pixels)
    global.innerWidth = 360;
    global.innerHeight = 640;

    // Render the Book component
    render(
      <Book hardCover={true} bookTitles={["Book 1", "Book 2"]} gender="Male" />,
    );

    // Assert that the expected Tailwind CSS classes are applied
    const bookComponent = screen.getByTestId("book-component");
    expect(bookComponent).toHaveClass("w-full");
  });
});
