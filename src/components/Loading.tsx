import React, { useState, useEffect } from "react";

export default () => {
  const [dots, setDots] = useState("");
  const incrementDot = () => {
    if (dots === "...") setDots("");
    else setDots(dots + ".");
  };

  useEffect(() => {
    setTimeout(incrementDot, 200);
  }, [incrementDot]);

  return (
    <div className="w-full h-full flex justify-center text-4xl font-bold items-center">
      LOADING<span style={{ minWidth: "3ch" }}>{dots}</span>
    </div>
  );
};
