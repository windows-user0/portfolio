import * as React from "react";
import ExperienceTitle from "../components/ExperienceTitle";
import ExperienceBadge from "../components/ExperienceBadge";
import PasswordEntropyCalculator from "../components/PasswordEntropyCalculator";
import ExperienceBlockWrapper from "../components/ExperienceBlockWrapper";

export default () => {
    return (
        <>
            <ExperienceBlockWrapper>
                <div className="max-w-sm m-10">
                    <ExperienceTitle text="Algorithm Visualizer">
                        <ExperienceBadge text="react" color="blue" />
                        <ExperienceBadge text="Typescript" color="orange" />
                        <ExperienceBadge text="Javascript" color="yellow" />
                    </ExperienceTitle>
                    <p className="pt-10">
                        An intuitive educational tool designed to help visual
                        learners understand algorithms foundational to computer
                        science. Maze generation with shortest spanning trees,
                        shortest path with Dijkstras algorithm.
                    </p>
                    <a className="underline pt-10" href="/visualizer">
                        Available here
                    </a>
                </div>
                <a
                    href="/visualizer"
                    className=" w-full max-w-lg  md:w-1/4 p-5 mt-5 border-gray-400 hover:border-gray-600   bg-gray-100 border rounded flex flex-shrink flex-col"
                >
                    <span className=" underlined font-bold underline pb-2 ">
                        Check on windows-user0.com/visualizer
                    </span>
                    <img
                        src="Visualizer.png"
                        className=" w-full h-full"
                        alt="Screenshot of visualizer"
                    />
                </a>
            </ExperienceBlockWrapper>
            <ExperienceBlockWrapper>
                <div className="max-w-sm  m-10">
                    <ExperienceTitle text="PassQuack">
                        <ExperienceBadge text="npm" color="purple" />
                        <ExperienceBadge text="Javascript" color="yellow" />
                    </ExperienceTitle>
                    <p className="pt-10">
                        A npm package that returns password strength in entropy
                        bits or user friendly string.
                    </p>
                </div>
                <div className="w-full max-w-lg  md:w-1/4 p-5 mt-5 border-gray-400 hover:border-gray-600    bg-gray-100 border rounded flex flex-shrink flex-col">
                    <PasswordEntropyCalculator />
                    <a href="/passquack" className="underline pt-5">
                        Check it out
                    </a>
                </div>
            </ExperienceBlockWrapper>
            <ExperienceBlockWrapper>
                <div className="max-w-sm  m-10">
                    <ExperienceTitle text="Virus Signal">
                        <ExperienceBadge text="react" color="blue" />
                        <ExperienceBadge text="nextjs" color="purple" />
                        <ExperienceBadge text="Javascript" color="yellow" />
                    </ExperienceTitle>
                    <p className="pt-10">
                        A set of open source symbols and guidelines to help in
                        social distancing during outbreaks and pandemics.
                        Written in nextjs.
                    </p>
                </div>
                <a
                    href="https://virussignal.com"
                    className=" w-full max-w-lg  md:w-1/4 p-5 mt-5 border-gray-400 hover:border-gray-600    bg-gray-100 border rounded flex flex-shrink flex-col"
                >
                    <span className=" underlined font-bold underline pb-2 text-lg">
                        Check on virussignal.com
                    </span>
                    <img
                        className="rounded w-full h-full"
                        src="https://virussignal.com/OGImage.png"
                        alt="Screenshot of virussignal page"
                    />
                    Created to help the fight with outbreaks and pandemics.
                    Open-source universal signs for immunocompromised, possibly
                    contagious and recovered.
                </a>
            </ExperienceBlockWrapper>
        </>
    );
};
