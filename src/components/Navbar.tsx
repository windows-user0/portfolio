import * as React from "react";
import { Link, useLocation } from "react-router-dom";
export default () => {
  // Get current location to switch classes in JSX.
  const location = useLocation().pathname;

  return (
    <nav className="flex flex-row mt-2 md:mt-10 mb-5 justify-around">
      <Link
        className={`  ${
          location === "/" ? "font-bold cursor-default" : "hover:underline"
        }`}
        to="/"
      >
        Home
      </Link>
      <Link
        className={` ${
          location === "/experience"
            ? "font-bold cursor-default"
            : "hover:underline"
        }`}
        to="/experience"
      >
        Experience
      </Link>
      <Link
        className={` ${
          location === "/projects"
            ? "font-bold cursor-default"
            : "hover:underline"
        }`}
        to="/projects"
      >
        Projects
      </Link>
      <Link
        className={`  ${
          location === "/contact"
            ? "font-bold cursor-default"
            : "hover:underline"
        }`}
        to="/contact"
      >
        Contact
      </Link>
    </nav>
  );
};
