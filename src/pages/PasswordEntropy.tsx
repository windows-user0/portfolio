import * as React from "react";
import passwordCalculator from "../helpers/passwordEntropyCalculator";
export default () => {
  const [entropy, setEntropy] = React.useState("0");
  const [entropyText, setEntropyText] = React.useState<string>("Very Weak");
  function calculateEntropy(evt: any) {
    const target = evt.target;

    // loop over password without first and last chars
    const strenght = passwordCalculator(target.value);

    setEntropy(strenght.entropy.toFixed(2));
    if (strenght.text) setEntropyText(strenght.text);
  }

  const additionalClass = () => {
    switch (entropyText) {
      case "Very Weak":
        return "bg-red-900";
      case "Weak":
        return "bg-yellow-900";
      case "Reasonable":
        return "bg-blue-900";
      case "Strong":
        return "bg-green-900";
      case "Very strong":
        return "bg-green-500";
    }
  };

  const passwordStrenghtMeterPercent = () => {
    switch (entropyText) {
      case "Very Weak":
        return 20;
      case "Weak":
        return 35;
      case "Reasonable":
        return 50;
      case "Strong":
        return 75;
      case "Very strong":
        return 100;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center max-w-xl  pt-20 ">
        <div className="self-start">
          <label htmlFor="password">Password</label> <br />
          <input
            onChange={calculateEntropy}
            className=" p-2 max-w-xs bg-gray-800 rounded"
            id="password"
            name="password"
            type="password"
          />
        </div>

        <div className="self-start pt-10 text-xl w-full">
          <div className={`w-36 h-8  rounded block relative`}>
            <div className={`bg-gray-800  w-full h-full rounded absolute`} />
            <div
              className={`${additionalClass()} w-full h-full rounded absolute`}
              style={{
                width: `${passwordStrenghtMeterPercent()}%`,
                transition: "all 200ms ease",
              }}
            />
          </div>
          <div>{entropyText} </div>
          <span>{entropy} bits of entropy</span>
        </div>
      </div>{" "}
    </div>
  );
};
