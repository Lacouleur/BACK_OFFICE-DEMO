/* eslint-disable prettier/prettier */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../client/authClient";

const PublicRoute = ({ 
  component: Component, location, restricted, ...otherProps 
}) => {
  
  return (
    <Route
      {...otherProps}
      render={(props) =>
        getToken() && restricted ? (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: location },
            }}
          />
          ) : (
            <Component {...props} />
            )}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  restricted: PropTypes.bool,
};

PublicRoute.defaultProps = {
  location: {},
  restricted: PropTypes.bool
};

export default PublicRoute;