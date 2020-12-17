import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./styles/css/index.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PrivateRoute from "./services/routes/PrivatesRoutes";
import PublicRoute from "./services/routes/PublicRoutes";

const rootComponent = (
  <Router>
    <Switch>
      <PublicRoute restricted path="/" exact component={Auth} />
      <PrivateRoute path="/dashBoard" exact component={Home} />
    </Switch>
  </Router>
);

ReactDOM.render(rootComponent, document.getElementById("root"));
