import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

const rootComponent = (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashBoard" component={Home} />
    </Switch>
  </Router>
);

ReactDOM.render(rootComponent, document.getElementById("root"));
