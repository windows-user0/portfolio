import * as React from "react";
import { Link, useLocation } from "react-router-dom";
export default () => {
    // Get current location to switch classes in JSX.
    const location = useLocation().pathname;
    const isMobile = window.innerWidth > 910
    return (
        <nav className="flex bg-gray-100 justify-center text-sm lg:text-lg px-5">
            <div className="flex flex-row mt-4 md:mt-10 mb-5 justify-around max-w-xl w-full">
                <Link
                    className={`  ${
                        location === "/"
                            ? "font-bold cursor-default"
                            : "hover:underline"
                    }`}
                    to="/"
                >
                    Home 
                </Link>
                |
                <Link
                    className={` ${
                        location === "/experience"
                            ? "font-bold cursor-default"
                            : "hover:underline"
                    }`}
                    to="/experience"
                >
                    {isMobile ? "Industry Experience" : "Experience"}
                </Link>
                |
                <Link
                    className={` ${
                        location === "/projects"
                            ? "font-bold cursor-default"
                            : "hover:underline"
                    }`}
                    to="/projects"
                >
                    {isMobile ? "Solo Projects" : "Projects"}
                </Link>
                |
                <Link
                    className={`  ${
                        location === "/contact"
                            ? "font-bold cursor-default"
                            : "hover:underline"
                    }`}
                    to="/contact"
                >
                    Contact Me
                </Link>
            </div>
        </nav>
    );
};
