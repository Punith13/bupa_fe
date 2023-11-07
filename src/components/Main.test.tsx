import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import Main from "./Main";
import { getPersonBooks } from "../graphql/queries";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

loadDevMessages();
loadErrorMessages();

const mocks = [
  {
    request: {
      query: getPersonBooks,
      variables: {
        hardcoverOnly: false,
      },
    },
    result: {
      data: {
        people: [
          {
            gender: "Male",
            name: "Charles",
            books: [
              { name: "Book 1", type: "Hardcover" },
              { name: "Book 2", type: "Paperback" },
            ],
          },
          {
            gender: "Female",
            name: "Charlotte",
            books: [
              { name: "Book 3", type: "Hardcover" },
              { name: "Book 4", type: "Paperback" },
            ],
          },
        ],
      },
    },
  },
  {
    request: {
      query: getPersonBooks,
      variables: {
        hardcoverOnly: true,
      },
    },
    result: {
      data: {
        people: [
          {
            gender: "Male",
            name: "Charles",
            books: [
              { name: "Book 5", type: "Hardcover" },
              { name: "Book 6", type: "Hardcover" },
            ],
          },
          {
            gender: "Female",
            name: "Charlotte",
            books: [], // No books for females when hardCover is true
          },
        ],
      },
    },
  },
];

describe("Main Component", () => {
  test("displays loader while loading data", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Main />
      </MockedProvider>,
    );

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      // Loading is complete when the loader disappears
      expect(screen.queryByTestId("loader")).toBeNull();
    });
  });

  test("displays data when loading is complete", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Main />
      </MockedProvider>,
    );

    await waitFor(() => {
      // Loading is complete when the loader disappears
      expect(screen.queryByTestId("loader")).toBeNull();

      // Verify that the book titles are displayed
      expect(screen.getByText("Book 1")).toBeInTheDocument();
      expect(screen.getByText("Book 2")).toBeInTheDocument();
      expect(screen.getByText("Book 3")).toBeInTheDocument();
      expect(screen.getByText("Book 4")).toBeInTheDocument();
    });
  });

  test("displays data for both hardcover and non-hardcover scenarios", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Main />
      </MockedProvider>,
    );

    await waitFor(async () => {
      // Loading is complete when the loader disappears
      expect(screen.queryByTestId("loader")).toBeNull();

      // Verify that the book titles are displayed for the default scenario
      expect(screen.getByText("Book 1")).toBeInTheDocument();
      expect(screen.getByText("Book 2")).toBeInTheDocument();
      expect(screen.getByText("Book 3")).toBeInTheDocument();
      expect(screen.getByText("Book 4")).toBeInTheDocument();
    });

    // Click the "Hardcover only" button
    const hardcoverButton = screen.getByText("Hardcover only");
    userEvent.click(hardcoverButton);

    // Verify that the book titles are displayed for the hardcover scenario

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).toBeNull();

      expect(screen.getByText("Book 5")).toBeInTheDocument();
      expect(screen.getByText("Book 6")).toBeInTheDocument();
    });

    // Click the "Get Books" button to return to the default scenario
    const getBooksButton = screen.getByText("Get Books");
    userEvent.click(getBooksButton);

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).toBeNull();

      // Verify that the book titles are displayed for the default scenario
      expect(screen.getByText("Book 1")).toBeInTheDocument();
      expect(screen.getByText("Book 2")).toBeInTheDocument();
      expect(screen.getByText("Book 3")).toBeInTheDocument();
      expect(screen.getByText("Book 4")).toBeInTheDocument();
    });
  });

  test("displays error message when there is an error", async () => {
    const errorMock = [
      {
        request: {
          query: getPersonBooks,
          variables: {
            hardcoverOnly: false,
          },
        },
        error: new Error("Failed to fetch data"), // Simulate an error
      },
    ];
    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <Main />
      </MockedProvider>,
    );

    await waitFor(() => {
      // Loading is complete when the loader disappears
      expect(screen.queryByTestId("loader")).toBeNull();

      // Verify that the error message is displayed
      const errorMessage = screen.getByTestId("error");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage.textContent).toBe(
        "Unable to load the data, please try again!",
      );
    });
  });
});
