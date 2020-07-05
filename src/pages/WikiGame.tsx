import * as React from "react";

export default () => {
    const [wikipedia, setWikipedia] = React.useState("");
    React.useEffect(() => {
        (async () => {
            const response = await fetch(
                "https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&pageid=41284488",
                {
                    method: "GET",
                }
            );
            const json = await response.json();
            const text = json.parse.text;
            console.log(text);
            Object.entries(text).forEach(
                (text) => typeof text[1] === "string" && setWikipedia(text[1])
            );
        })();
    }, []);

    return (
        <>
            <button>Heoll</button>
            <link
                rel="stylesheet"
                href={`https://en.m.wikipedia.org/w/load.php?lang=en&amp;modules=ext.cite.styles%7Cext.wikimediaBadges%7Cmediawiki.hlist%7Cmediawiki.ui.button%2Cicon%7Cmobile.init.styles%7Cskins.minerva.base.styles%7Cskins.minerva.content.styles%7Cskins.minerva.content.styles.images%7Cskins.minerva.icons.wikimedia%7Cskins.minerva.mainMenu.icons%2Cstyles&amp;only=styles&amp;skin=minerva`}
            />
            <section className=" body-font flex flex-col h-full flex-grow relative">
                <div
                    className="h-full  w-full"
                    dangerouslySetInnerHTML={{ __html: wikipedia }}
                />
            </section>
        </>
    );
};
