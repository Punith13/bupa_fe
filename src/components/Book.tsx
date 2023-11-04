import React from "react";

interface BookProps {
  hardCover: boolean;
  bookTitles: string[];
  gender: string;
}

const Book = ({ hardCover, bookTitles, gender }: BookProps) => {
  return (
    <div className="w-full sm:w-[49%]">
      <div className="bg-bupa_blue text-white text-2xl sm:text-3xl p-2 ">
        {`${hardCover ? "Hardcover" : ""} Books with ${gender} Owners`}
      </div>
      <div className="book-titles p-4 border-2 min-h-[20vh]">
        {bookTitles.map((title, idx) => (
          <p key={idx}>{title}</p>
        ))}
      </div>
    </div>
  );
};

export default Book;
