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
              <Redirect to="/signin" />
            )
          }
        />
      )}
    </Consumer>
  );
};
