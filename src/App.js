import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BookList from "./components/Library/BookList";
import BookIO from "./components/Monitoring/BookIO";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/library" className="navbar-brand">
          PERPUS
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/library"}  className="nav-link">
              Library
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/monitoring"} className="nav-link">
              Monitoring
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/library"]} component={BookList} />
          <Route exact path="/monitoring" component={BookIO} />
          <Redirect to="/library"/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
