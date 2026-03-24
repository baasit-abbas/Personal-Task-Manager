import React from "react";

const Loader = (props) => {
  return (
    <div
      className={`w-6 h-6 animate-spin ${props.color} border-4 rounded-full border-t-transparent`}
    ></div>
  );
};

export default Loader;
