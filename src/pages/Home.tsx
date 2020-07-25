import * as React from "react";
import Post from "../components/Post";
import articles from "../data/articles";
import ChatBubbles from "../components/ChatBubbles";
export default () => {
    return (
        <div className="flex flex-col pt-5 lg:pt-20 content-center items-center justify-center">
            <div className="flex  flex-col lg:flex-row w-full lg:w-3/4  items-end lg:items-center">
                <div className="flex flex-col    lg:pr-5 justify-center w-full  md:text-left text-center md:w-1/3">
                    <div className="text-5xl font-black pt-16">
                        I'm <span className="text-blue-500">Alex</span>
                    </div>
                    <div className="text-4xl font-bold  ">
                        a fullstack developer
                    </div>

                    <div className="flex flex-row pt-10 text-base whitespace-no-wrap lg:text-lg font-semibold items-center justify-center md:justify-start">
                        <a
                            href="/experience"
                            className=" rounded transition hover:text-blue-500 hover:bg-gray-200 bg-white ease-out duration-200 rounded-full shadow-xl active:shadow-sm hover:shadow-md text-gray-900 px-5 py-2 mr-5"
                        >
                            My experience
                        </a>
                        <a
                            href="/projects"
                            className=" rounded transition   hover:text-blue-500 hover:bg-gray-200  bg-white ease-out duration-200 rounded-full shadow-xl  active:shadow-sm hover:shadow-md text-gray-900 px-5 py-2 mr-5"
                        >
                            My projects
                        </a>
                    </div>
                </div>
                <ChatBubbles />
            </div>
            <div className="lg:w-3/4 lg:pt-64 pt-20 flex flex-col px-4 lg:px-0">
                <div className="font-extrabold text-3xl md:text-3xl ">
                    <span className="border-b-8 border-blue-500 pr-5">
                        My articles
                    </span>
                </div>
                <div className="flex flex-col md:flex-row justify-between mt-5 md:mt-16 ">
                    {articles.map((article) => (
                        <div className="w-full lg:w-1/3 max-w-xl">
                            <Post {...article} />
                        </div>
                    ))}
                </div>
                <a
                    className="pt-2 underline pb-20"
                    target="_blank"
                    href="https://crunchskills.com/author/alex/"
                >
                    See others...
                </a>
            </div>
        </div>
    );
};
