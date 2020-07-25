import * as React from "react";
type PostProps = {
    text: string;
    title: string;
    imageUrl: string;
    link: string;
};

export default ({ text, title, imageUrl, link }: PostProps) => (
    <a
        href={link}
        className="flex flex-col border  border-gray-400 hover:border-gray-600 rounded p-5 h-full  md:mr-5 mt-5 md:mt-0 "
    >
        <div
            className="bg-cover bg-center "
            style={{
                backgroundImage: `url(${imageUrl})`,
                minWidth: "160px",
                minHeight: "120px",
            }}
        />
        <div className="font-bold text-xl pt-2   ">{title}</div>
        <div
            className="pt-2  overflow-hidden hidden lg:block"
            style={{
                textOverflow: "ellipsis",
                maxHeight: "10ch",
            }}
        >
            {text}
        </div>
        <div className="text-xs underline pt-3 flex flex-grow ">
            <span className="self-end">Posted on Crunchskills.com </span>
        </div>
    </a>
);
