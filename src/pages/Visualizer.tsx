import * as React from "react";
import { BoardProvider } from "../Contexts/boardContexts";
import Loading from "../components/Loading";
import BoardControls from "../components/BoardControls";
import TouchOverlay from "../components/TouchOverlay";
import BoardRenderer from "../components/BoardRenderer";

export default function App() {
    return (
        <BoardProvider>
            <BoardControls />
            <TouchOverlay>
                <React.Suspense fallback={<Loading />}>
                    <BoardRenderer />
                </React.Suspense>
            </TouchOverlay>
        </BoardProvider>
    );
}
