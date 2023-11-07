import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getPersonBooks } from "../graphql/queries";

import Loader from "./Loader";
import Book from "./Book";
import Header from "./Header";

const Main = () => {
  const [hardCover, setHardCover] = useState(false);
  const { loading, error, data } = useQuery(getPersonBooks, {
    variables: {
      hardcoverOnly: hardCover,
    },
  });

  const getBookTitles = (data, gender) => {
    const bookTitles = data.reduce((acc, curr) => {
      if (curr.gender === gender) {
        return [...acc, ...curr.books.map((book) => book.name)];
      }
      return acc;
    }, []);

    return bookTitles.sort();
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : error ? (
        <p
          data-testid="error"
          className="mt-10 text-center text-xl text-red-400"
        >
          Unable to load the data, please try again!
        </p>
      ) : (
        <>
          <div className="flex flex-col sm:w-[35%] w-[80%] mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 my-10 justify-center items-center sm:items-start flex-wrap">
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
            </div>

            <hr className="border-2 bg-gray-300 " />

            <div className="mt-2 flex flex-col-reverse sm:flex-row sm:justify-end ">
              <button
                className=" mr-1 mb-1 px-3 py-1 bg-transprent text-md font-bold text-bupa_blue underline underline-offset-4"
                onClick={() => setHardCover(true)}
              >
                Hardcover only
              </button>
              <button
                type="button"
                className="text-white bg-bupa_blue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => setHardCover(false)}
              >
                Get Books
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Main;
