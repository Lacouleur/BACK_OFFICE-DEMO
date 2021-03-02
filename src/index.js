/* eslint-disable no-underscore-dangle */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/css/index.css";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import error404 from "./pages/404";
import PrivateRoute from "./services/routes/PrivatesRoutes";
import PublicRoute from "./services/routes/PublicRoutes";
import Editor from "./pages/Editor";
import combineReducers from "./store/combineReducers";
import logMiddleware from "./store/logMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(logMiddleware, thunk));

const store = createStore(combineReducers, enhancers);

const rootComponent = (
  <Provider store={store}>
    <Router>
      <Switch>
        <PublicRoute restricted path="/" exact component={Auth} />
        <PrivateRoute path="/dashboard" exact component={Home} />
        <PrivateRoute path="/editor" exact component={Editor} />
        <Route path="/" component={error404} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(rootComponent, document.getElementById("root"));
