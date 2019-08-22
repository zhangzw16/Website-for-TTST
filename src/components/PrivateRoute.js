import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      render={(props) => authenticated === true
        ? <Component {...props} {...rest}/>
        : <Redirect to={{ pathname: '/signIn', state: { from: props.location } }} />}
    />
  )
}