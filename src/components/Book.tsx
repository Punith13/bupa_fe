import React from "react";

interface BookProps {
  hardCover: boolean;
  bookTitles: string[];
  gender: string;
}

const Book = ({ hardCover, bookTitles, gender }: BookProps) => {
  return (
    <div className="rounded">
      <div className="bg-bupa_blue text-white text-3xl w-3/4 p-4">
        {`${hardCover ? "Hardcover" : ""} Books with ${gender} Owners`}
      </div>
      <div className="book-titles p-4 w-3/4 border-2">
        {bookTitles.map((title, idx) => (
          <p key={idx}>{title}</p>
        ))}
      </div>
    </div>
  );
};

export default Book;
