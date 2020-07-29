import * as React from "react";
import Post from "../components/Post";
import articles from "../data/articles";
import ChatBubbles from "../components/ChatBubbles";
import { PopupText } from "react-calendly";
export default () => {
    return (
        <>
            <div className="flex flex-col pt-5 lg:pt-20 content-center items-center justify-center">
                <div className="flex  flex-col xl:flex-row w-full xl:w-3/4 xl:justify-center  items-end md:items-end">
                    <div className="flex flex-col   w-full lg:pr-5 justify-center w-full items-center   md:text-left text-center ">
                        <div className="text-5xl font-black pt-16">
                            I'm <span className="text-blue-500">Alex</span>
                        </div>
                        <div className="text-4xl font-bold  text-center">
                            And I wan't to be your best hire yet.
                        </div>

                        <div className="flex flex-row pt-10 text-base whitespace-no-wrap lg:text-lg font-semibold items-center justify-center md:justify-start">
                            <div
                                onClick={() =>
                                    window.Calendly.initPopupWidget({
                                        url:
                                            "https://calendly.com/lets-talk-/30min",
                                    })
                                }
                                className="cursor-pointer rounded transition hover:text-blue-500 hover:bg-gray-200 bg-white ease-out duration-200 rounded-full shadow-xl active:shadow-sm hover:shadow-md text-gray-900 px-5 py-2 mr-5"
                            >
                                Schedule a call with me
                            </div>
                            <a
                                href="/projects"
                                className=" rounded transition   hover:text-blue-500   ease-out duration-200    text-gray-700 px-5 py-2 mr-5"
                            >
                                My Experience
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
        </>
    );
};
