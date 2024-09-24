import React from "react";
import { Link } from "react-router-dom";

const LinkCustom = ({ content, to, className, icon }) => {
  return (
    <Link to={to} className={`${className}`}>
      {content} {icon}
    </Link>
  );
};

export default LinkCustom;
