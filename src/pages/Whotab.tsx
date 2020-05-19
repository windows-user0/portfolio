import React, { useState } from "react";
import Loading from "../components/Loading";
export default () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className=" flex flex-col lg:flex-row  overflow-hidden text-white bg-black">
      <div className="flex-grow flex flex-col items-start  pl-20 justify-center py-12">
        <span className="text-4xl lg:text-6xl font-bold pb-10">Whotab</span>
        <span className="text-2xl lg:text-3xl font-semibold pb-5">
          What I did
        </span>
        <span className="pb-3">Hello</span>
        <span className="text-2xl lg:text-3xl font-semibold pb-5">
          What I learned
        </span>
        <span>Hello</span>
      </div>
      <div className="resp-container lg:w-full max-w-5xl h-screen ">
        {loaded ? null : <Loading />}
        <iframe
          title="Whotab clip"
          data-hj-allow-iframe
          src="https://whotab.com/clip/bill-burr-reads-a-sharis-berries-ad/player"
          className="resp-iframe "
          onLoad={() => setLoaded(true)}
        ></iframe>
      </div>
    </div>
  );
};
