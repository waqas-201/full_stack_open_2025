import React from "react";

export const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="px-4 py-2 bg-cyan-700 text-white  rounded-lg shadow-md hover:bg-cyan-900 focus:outline-none focus:bg-cyan-900"
    >
      {props.children}
    </button>
  );
};
