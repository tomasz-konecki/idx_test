import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import LoginPage from "../auth/login"
import Home from "../home/home"

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth/login" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}
