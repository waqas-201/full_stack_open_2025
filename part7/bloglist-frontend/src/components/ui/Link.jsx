import React from "react";
import { Link } from "react-router-dom";

const StyledLink = ({ href, children }) => {
  return (
    <Link
      to={href}
      className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition duration-200"
    >
      {children}
    </Link>
  );
};

export default StyledLink;
