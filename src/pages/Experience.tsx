import React, { useState } from "react";
import Loading from "../components/Loading";
import ExperienceTitle from "../components/ExperienceTitle";
import ExperienceBadge from "../components/ExperienceBadge";
import Post from "../components/Post";
import ExperienceBlockWrapper from "../components/ExperienceBlockWrapper";

export default () => {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    return (
        <div className="lg:pt-16">
            <ExperienceBlockWrapper>
                <div className="flex flex-col max-w-lg items-start w-full flex-grow px-5 md:px-20 justify-start  ">
                    <ExperienceTitle text="Whotab">
                        <ExperienceBadge text="html5" color="blue" />
                        <ExperienceBadge text="next-js" color="purple" />
                        <ExperienceBadge text="React" color="yellow" />
                        <ExperienceBadge text="React Native" color="orange" />
                    </ExperienceTitle>

                    <span className="text-2xl lg:text-3xl font-semibold pb-5">
                        What I did
                    </span>

                    <span className="pb-3">
                        Created the front end of a podcast player. Web based, as
                        well as iOS and Android versions with react-native.
                    </span>
                    <span className="text-2xl lg:text-3xl font-semibold pb-5">
                        What I learned
                    </span>
                    <span>
                        I learned a lot about how to maximize application
                        performance. Any inefficiencies peek their head out, in
                        a animated widget.
                    </span>
                </div>
                <div
                    style={{ height: "80vh" }}
                    className="resp-container lg:w-full max-w-2xl  lg:ml-0 md:ml-10 mt-10 lg:mt-0 "
                >
                    {/* Display loading until the iframe loads component loads */}
                    {iframeLoaded ? null : <Loading />}
                    <iframe
                        title="Whotab clip"
                        data-hj-allow-iframe
                        src="https://whotab.com/clip/bill-burr-reads-a-sharis-berries-ad/player"
                        className="resp-iframe "
                        onLoad={() => setIframeLoaded(true)}
                    ></iframe>
                </div>
            </ExperienceBlockWrapper>

            <ExperienceBlockWrapper>
                <div className="flex max-w-lg flex-col items-start w-full flex-grow  px-5 md:px-20 justify-start py-12 ">
                    <ExperienceTitle text="Cruchskills">
                        <ExperienceBadge text="Ghostjs" color="blue" />
                        <ExperienceBadge text="React" color="yellow" />
                        <ExperienceBadge text="Deno" color="orange" />
                        <ExperienceBadge text="Javascript" color="yellow" />
                    </ExperienceTitle>
                    <span className="text-2xl lg:text-3xl font-semibold pb-5">
                        What I did
                    </span>
                    <span className="pb-3">
                        Authored educational content and planned features and
                        aided in the platform development.
                    </span>
                    <span className="text-2xl lg:text-3xl font-semibold pb-5">
                        What I learned
                    </span>
                    <span>
                        I learned how to teach computer science to help people
                        succeed in technical interviews and jobs. I also learned
                        a lot of the challenges of feature planning,
                        wire-frames, user stories, prioritization that come with
                        a co-founder/managerial position.
                    </span>
                </div>
                <div className="flex md:flex-col justify-center md:mt-10 max-w-2xl  lg:ml-0 md:ml-10">
                    <div className="md:mt-5 ">
                        <Post
                            imageUrl="https://crunchskills.com/content/images/size/w1200/2020/05/denovNode-1.png"
                            text=" Whats different between Deno and Node?Both Node and Deno were designed by
      the same person - Ryan Dahl. Ryan created node in 2009, a long time ago,
      before several"
                            title="Deno vs Node - just the differences."
                            link="https://crunchskills.com/deno-vs-node/"
                        />
                    </div>
                    <div className="mt-5 hidden md:block ">
                        <Post
                            imageUrl="https://crunchskills.com/content/images/size/w1200/2020/05/preview.png"
                            text=" They come up in most if not all coding interviews, because they are essential to any performant software. You might know them by other higher level siblings names like dictionaries, maps or vectors."
                            title="The most important data structure for tech interviews."
                            link="https://crunchskills.com/understand-the-most-important-data-structure-for-tech-interviews/"
                        />
                    </div>
                    <div className="mt-5 hidden md:block ">
                        <Post
                            imageUrl="https://crunchskills.com/content/images/size/w1200/2020/04/merge-sort-3.png"
                            text=" Merge sort is one of the most beautiful and simplest algorithms. Its very short and at the same time very powerful because of its O(n * log n) speed."
                            title="Merge sort explained in 3 minutes. "
                            link="https://crunchskills.com/merge-sort-explained-in-3-minutes-get-ready-for-any-interview//"
                        />
                    </div>
                </div>
            </ExperienceBlockWrapper>

            <ExperienceBlockWrapper>
                <div className="flex flex-col max-w-lg items-start w-full flex-grow  px-5 md:px-20 justify-start py-12 ">
                    <ExperienceTitle text="Cryptocurrencies ">
                        <ExperienceBadge text="Nodejs" color="blue" />
                        <ExperienceBadge text="Javascript" color="yellow" />
                    </ExperienceTitle>

                    <span className="text-2xl lg:text-3xl font-semibold pb-5">
                        What I did
                    </span>
                    <span className="pb-3">
                        I was a technical advisor on several cryptocurrency
                        projects including a major one (top 100 by market-cap).
                        My job description morphed into a developer as i fell in
                        love with coding. My development achievements include
                        creating a bot and giveaway management software.
                    </span>
                    <span className="text-2xl lg:text-3xl font-semibold pb-5">
                        What I learned
                    </span>
                    <span>
                        I learned tons of soft skills- community management,
                        teamwork, project management, working in teams inside
                        big development projects thanks to mentor-ship from a
                        tech lead developer.
                    </span>
                </div>
                <div className="w-full max-w-3xl"></div>
            </ExperienceBlockWrapper>
        </div>
    );
};
