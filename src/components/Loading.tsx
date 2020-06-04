import React, { useState, useEffect } from "react";

export default () => {
  const [dots, setDots] = useState("");

  // renders up to 3 dots and then resets for a loading animation
  const incrementDot = () => {
    if (dots === "...") setDots("");
    else setDots(dots + ".");
  };

  useEffect(() => {
    setTimeout(incrementDot, 200);
  });

  // Note : will conform to div size
  return (
    <div className="w-full h-full flex justify-center text-4xl font-bold items-center">
      LOADING<span style={{ minWidth: "3ch" }}>{dots}</span>
    </div>
  );
};
