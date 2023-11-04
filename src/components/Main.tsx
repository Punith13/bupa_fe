import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getPersonBooks } from "../graphql/queries";

import Loader from "./Loader";
import Book from "./Book";

const Main = () => {
  const [hardCover, setHardCover] = useState(false);
  const { loading, error, data } = useQuery(getPersonBooks, {
    variables: {
      hardcoverOnly: hardCover,
    },
  });

  const getBookTitles = (data, gender) => {
    return data.reduce((acc, curr) => {
      if (curr.gender === gender) {
        return [...acc, ...curr.books.map((book) => book.name)];
      }
      return acc;
    }, []);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col sm:flex-row gap-4">
      <Book
        hardCover={hardCover}
        bookTitles={getBookTitles(data?.people, "Male")}
        gender="Male"
      />
      <Book
        hardCover={hardCover}
        bookTitles={getBookTitles(data?.people, "Female")}
        gender="Female"
      />

      <button onClick={() => setHardCover(true)}>Hardcover only</button>
    </div>
  );
};

export default Main;
