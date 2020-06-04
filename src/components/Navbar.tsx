import * as React from "react";
import { Link, useLocation } from "react-router-dom";
export default () => {
  // Get current location to switch classes in JSX.
  const location = useLocation().pathname;

  return (
    <nav className="flex flex-row  mt-10 mb-5 justify-center">
      <Link
        className={`px-5  ${
          location === "/" ? "font-bold cursor-default" : "hover:underline"
        }`}
        to="/"
      >
        Home
      </Link>
      <Link
        className={`px-5  ${
          location === "/experience"
            ? "font-bold cursor-default"
            : "hover:underline"
        }`}
        to="/experience"
      >
        Experience
      </Link>
      <Link
        className={`px-5  ${
          location === "/projects"
            ? "font-bold cursor-default"
            : "hover:underline"
        }`}
        to="/projects"
      >
        Projects
      </Link>
      <Link
        className={`px-5  ${
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
