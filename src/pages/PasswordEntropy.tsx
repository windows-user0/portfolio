import * as React from "react";
import PasswordEntropyCalculator from "../components/PasswordEntropyCalculator";

export default () => {


    return (
        <div className="flex justify-center px-5 pb-20">
            <div className="flex flex-col items-center max-w-xl  pt-20 ">
                <div className="text-4xl ">Password Entropy Calculator</div>
                <a
                    href="https://www.npmjs.com/package/passquack"
                    className="underline mb-1"
                >
                    https://www.npmjs.com/package/passquack
                </a>
                <a
                    href="                https://github.com/windows-user0/passquack
"
                    className="underline mb-10"
                >
                    https://github.com/windows-user0/passquack
                </a>
                <PasswordEntropyCalculator />
                <div className="flex flex-col justify-start self-start pt-10">
                    <div className="text-5xl pb-5">How to use</div>
                    <div className="text-3xl pb-3">Install</div>
                    <pre className="pb-3">npm i passquack </pre>
                    <div className="text-3xl pb-3">Usage</div>
                    <pre className="pb-3">{`const passQuack = require('passquack')`}</pre>
                    <div className="text-3xl pb-3">For user friendly text </div>
                    <pre className="pb-3">passQuack("password").text</pre>{" "}
                    <div className="text-3xl pb-3">For entropy bits </div>
                    <pre className="pb-3">passQuack("password").entropy </pre>
                </div>
            </div>
        </div>
    );
};
