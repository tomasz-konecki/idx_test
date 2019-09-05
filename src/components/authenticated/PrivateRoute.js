import React, { Component } from "react"
import { navigate } from "gatsby"
import auth from "../../utils/auth"

export default class PrivateRoute extends Component {
  componentDidMount() {
    console.log(">>> PrivateRoute, CDM")
    const { location } = this.props
    let noOnLoginPage = location.pathname !== `/auth/login`
    if (!auth.isLoggedIn() && noOnLoginPage) {
      navigate("/auth/login")
      return null
    }
  }

  render() {
    console.log(">>> PrivateRoute, Render")
    const { component: Component, ...rest } = this.props
    return <Component {...rest} />
  }
}
