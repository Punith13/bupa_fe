import React from "react";

const Loader = () => {
  return (
    <div
      data-testid="loader"
      className="w-12 h-12 rounded-full animate-spin
    border border-solid border-yellow-500 border-t-transparent"
    ></div>
  );
};

export default Loader;
