import React, { Suspense } from "react";
import "./App.css";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Visualizer from "./pages/Visualizer";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PasswordEntropy from "./pages/PasswordEntropy";
// import WikiGame from "./pages/WikiGame";
const Experience = React.lazy(() => import("./pages/Experience"));

function App() {
    return (
        <div className="flex flex-col  " style={{ minHeight: "100vh" }}>
            <Router>
                <Navbar />
                <main className=" flex flex-col flex-grow ">
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/contact" exact>
                            <Contact />
                        </Route>
                        {/* <Route path="/wiki-game" exact>
                            <WikiGame />
                        </Route> */}
                        <Route path="/visualizer">
                            <Visualizer />
                        </Route>
                        <Route path="/projects">
                            <Projects />
                        </Route>
                        <Route path="/passquack">
                            <PasswordEntropy />
                        </Route>
                        <Route path="/experience">
                            <Suspense fallback={<Loading />}>
                                <Experience />
                            </Suspense>
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </main>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
