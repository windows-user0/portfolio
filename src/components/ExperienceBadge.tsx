import * as React from "react";
type BadgeProps = { color: string; text: string };
export default ({ color, text }: BadgeProps) => (
    <span className={`bg-${color}-500 rounded-full px-2 py-1 ml-1 text-xs`}>
        {text}
    </span>
);
