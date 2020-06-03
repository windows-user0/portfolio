import React, { Suspense } from "react";
import "./App.css";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Visualizer from "./pages/Visualizer";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Experience = React.lazy(() => import("./pages/Experience"));

function App() {
  return (
    <div className="flex flex-col  " style={{ minHeight: "100vh" }}>
      <Router>
        <nav className="flex flex-row  mt-10 mb-5 font-bold justify-center">
          <Link className="px-5 hover:underline" to="/">
            Home
          </Link>
          <Link className="px-5 hover:underline" to="/experience">
            Experience
          </Link>
          <Link className="px-5 hover:underline" to="/projects">
            Projects
          </Link>
          <Link className="px-5  hover:underline" to="/contact">
            Contact
          </Link>
        </nav>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/contact" exact>
            <Contact />
          </Route>
          <Route path="/visualizer">
            <Visualizer />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/experience">
            <Suspense fallback={<div>Loading...</div>}>
              <Experience />
            </Suspense>
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>

      <footer className="flex-grow  flex justify-end">
        <div className="bg-gray-800 w-full self-end flex flex-row justify-between py-5 px-2">
          <div className="text-gray-600 text-sm">© 2020 windows-user0</div>
          <div className="text-gray-600 text-sm">
            You're great
            <span aria-label="heart emoji" role="img">
              ❤️
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
