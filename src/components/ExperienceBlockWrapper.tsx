import * as React from "react";
const ExperienceBlockWrapper: React.FC<{}> = ({ children }) => (
    <div className=" flex flex-col lg:flex-row justify-evenly h-full justify-center mt-12 md:p-5">
        {children}
    </div>
);
export default ExperienceBlockWrapper;
