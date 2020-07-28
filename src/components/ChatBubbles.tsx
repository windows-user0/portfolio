import * as React from "react";
export default () => {
    const [chatCounter, setChatCounter] = React.useState(0);
    setTimeout(() => {
        if (chatCounter < 5) setChatCounter(chatCounter + 1);
    }, 1000);

    return (
        <div
            className="flex flex-col lg:w-1/2 max-w-2xl w-3/4 lg:w-full lg:justify-center  pt-16 lg:pt-10 items-end"
            style={{ minHeight: "40vh" }}
        >
            {chatCounter >= 0 && (
                <div className="speech-bubble ">
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
                                an algorithm visualizer
                            </a>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
