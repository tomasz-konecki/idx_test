import React, { Component } from "react"
import { withRouter } from "react-router-dom"

class AuthenticatedComponent extends Component {
  state = {
    user: undefined
  }

  componentDidMount() {
    const jwt = localStorage.getItem("jwt-token")
    if (!jwt) {
      // this.props.history.push("auth/login")
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

export default withRouter(AuthenticatedComponent)
