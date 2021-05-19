import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const privateroute = ({ component: Component, auth, ...rest }) => {
  
  return (
    <Route
      {...rest}
      render={(props) => {
        
        return !auth.isAuthendicated && !auth.loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        );
      }}
    />
    
  );
};

const mapStateToProp = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProp)(privateroute);
