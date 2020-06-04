import * as React from "react";
import Post from "../components/Post";

export default () => {
  const [chatCounter, setChatCounter] = React.useState(0);
  setTimeout(() => {
    if (chatCounter < 5) setChatCounter(chatCounter + 1);
  }, 1000);

  return (
    <div className="flex flex-col pt-5 lg:pt-20 content-center items-center justify-center">
      <div className="flex  w-3/4  ">
        <div className="flex flex-col  justify-center w-full  md:text-left text-center md:w-1/2">
          <div className="text-5xl font-black pt-16">I'm Alex</div>
          <div className="text-4xl font-bold  ">a fullstack developer</div>

          <div className="flex flex-row pt-10 text-lg font-semibold items-center justify-center md:justify-start">
            <a
              href="/experience"
              className="bg-gray-100 rounded hover:bg-gray-400 text-gray-900 px-2 py-2 mr-5"
            >
              My experience
            </a>
            <a
              href="/projects"
              className="border border-gray-100 rounded hover:bg-gray-600 px-2 py-2 "
            >
              My projects
            </a>
          </div>
        </div>
        <div
          className=" hidden w-1/2 justify-center md:block"
          style={{ height: "40ch" }}
        >
          {chatCounter >= 0 && (
            <div className="speech-bubble">
              {chatCounter === 0 ? (
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "Hi !👋"
              )}
            </div>
          )}
          <br />
          {chatCounter >= 1 && (
            <div className=" speech-bubble">
              {chatCounter === 1 ? (
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "Welcome!"
              )}
            </div>
          )}
          <br />
          {chatCounter >= 2 && (
            <div className=" speech-bubble">
              {chatCounter === 2 ? (
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "  I'm Alex and learning everything about programming is my passion"
              )}
            </div>
          )}{" "}
          <br />
          {chatCounter >= 3 && (
            <div className="speech-bubble">
              {chatCounter === 3 ? (
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <>
                  You can checkout and play with my latest project -{" "}
                  <a href="/visualizer" className="underline">
                    a algorithm visualizer
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="w-3/4 pt-20 flex flex-col">
        <div className="font-extrabold text-3xl md:text-3xl ">
          <span className="border-b">My articles</span>
        </div>
        <div className="flex flex-col md:flex-row justify-start mt-5 md:mt-10 ">
          <div className="md:w-1/2 max-w-xl">
            <Post
              imageUrl="https://crunchskills.com/content/images/size/w1200/2020/05/denovNode-1.png"
              text=" Whats different between Deno and Node?Both Node and Deno were designed by
      the same person - Ryan Dahl. Ryan created node in 2009, a long time ago,
      before several"
              title="Deno vs Node - just the differences."
              link="https://crunchskills.com/deno-vs-node/"
            />
          </div>
          <div className="md:w-1/2 max-w-xl">
            <Post
              imageUrl="https://crunchskills.com/content/images/size/w1200/2020/05/preview.png"
              text=" They come up in most if not all coding interviews, because they are essential to any performant software. You might know them by other higher level siblings names like dictionaries, maps or vectors."
              title="The most important data structure for tech interviews."
              link="https://crunchskills.com/understand-the-most-important-data-structure-for-tech-interviews/"
            />
          </div>
          <div className="md:w-1/2 max-w-xl">
            <Post
              imageUrl="https://crunchskills.com/content/images/size/w1200/2020/04/merge-sort-3.png"
              text=" Merge sort is one of the most beautiful and simplest algorithms. Its very short and at the same time very powerful because of its O(n * log n) speed."
              title="Merge sort explained in 3 minutes. "
              link="https://crunchskills.com/merge-sort-explained-in-3-minutes-get-ready-for-any-interview/"
            />
          </div>
        </div>
        <a
          className="pt-2 underline pb-10"
          href="https://crunchskills.com/author/alex/"
        >
          See others...
        </a>
      </div>
    </div>
  );
};
