import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
// import { Link } from "gatsby"

import LoginPage from "../auth/login"
import Home from "../home/home"
// import MainScreen from "..

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
