/* eslint-disable no-underscore-dangle */
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/css/index.css";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Error404 from "./pages/404";
import PrivateRoute from "./services/routes/PrivatesRoutes";
import EditorCreate from "./pages/Editor/EditorCreate";
import EditorEdit from "./pages/Editor/EditorEdit";
import EditorManifesto from "./pages/Editor/EditorManifesto";
import EditorCreateManifesto from "./pages/Editor/EditorCreateManifesto";
import combineReducers from "./store/combineReducers";
import logMiddleware from "./store/logMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(logMiddleware, thunk));

const store = createStore(combineReducers, enhancers);

const rootComponent = (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <PrivateRoute path="/dashboard" exact component={Home} />
        <PrivateRoute path="/editor" exact component={EditorCreate} />
        <PrivateRoute
          path="/create-manifesto/:lang"
          exact
          component={EditorCreateManifesto}
        />
        <PrivateRoute
          path="/manifesto/:lang"
          exact
          component={EditorManifesto}
        />
        <PrivateRoute path="/editor/:articleId" exact component={EditorEdit} />
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(rootComponent, document.getElementById("root"));
