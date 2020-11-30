import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/css/index.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { PageContainer } from "./styles/styledComponents/Global/PageContainer";

const rootComponent = (
  <PageContainer>
    <Router>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route exact path="/dashBoard" component={Home} />
      </Switch>
    </Router>
  </PageContainer>
);

ReactDOM.render(rootComponent, document.getElementById("root"));
