import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { withRouter } from "react-router"

import LoginPage from "../auth/login"
import Home from "../home/home"
import AuthenticatedComponent from "../AuthenticatedComponent"
import Protected from "../mainscreen/interface"

class App extends Component {
  componentWillMount() {
    localStorage.getItem("jwt-token")
      ? localStorage.removeItem("jwt-token")
      : console.log("NO TOKEN")
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/auth/login"
            render={props => <LoginPage {...props} />}
          />
          <Route path="/mainscreen/interface" component={Protected} />
        </Switch>
      </BrowserRouter>
    )
  }
}

// export default withRouter(App)
export default App
