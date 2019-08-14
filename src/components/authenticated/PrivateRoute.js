import React from "react"
import { Route } from "react-router-dom"
import PrivateComponent from "./PrivateComponent"

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return <PrivateComponent {...props} component={Component} />
      }}
    />
  )
}

export default PrivateRoute
