import * as React from "react";
type ExperienceTitleProps = { children: React.ReactNode; text: string };
export default ({ children, text }: ExperienceTitleProps) => (
  <span className="text-4xl lg:text-6xl font-bold pb-10  ">
    {text}
    <div className="text-xs">{children}</div>
  </span>
);
