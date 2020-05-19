import React, { Suspense } from "react";
import "./App.css";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const WhotabPage = React.lazy(() => import("./pages/Whotab"));

function App() {
  return (
    <Router>
      <nav className="flex flex-row justify-start">
        <Link className="pr-5" to="/">
          home {"  "}
        </Link>
        <Link to="/whotab">whotab</Link>
      </nav>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/whotab">
          <Suspense fallback={<div>Loading...</div>}>
            <WhotabPage />
          </Suspense>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
