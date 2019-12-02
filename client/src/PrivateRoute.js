import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context";

// HOC will wrap private route in context to compare auth user.
// If auth, will render private route, otherwise redirect to sign-in.
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props =>
            context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                // from points to previous location before being redirected to /signin.
                // The state object can be accessed via this.props.location.state in the redirected-to component. 
                state: { from: props.location }   
              }} />
            )
          }
        />
      )}
    </Consumer>
  );
};
