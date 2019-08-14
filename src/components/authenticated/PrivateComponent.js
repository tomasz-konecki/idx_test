import React from "react"
import auth from "../../utils/auth"
import { Redirect } from "react-router-dom"

class PrivateComponent extends React.Component {
  state = { loading: true }

  componentDidMount() {
    auth
      .tryToLoginWithCookies()
      .then(() => {
        this.setState({ loading: false })
      })
      .catch(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    const Component = this.props.component
    if (this.state.loading) {
      return <h1>Loading</h1>
    }
    if (auth.isLoggedIn) {
      return <Component {...this.props} />
    }
    return <Redirect to="/" />
  }
}

export default PrivateComponent
