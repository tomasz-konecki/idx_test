import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import PrivateRoute from "../../components/authenticated/PrivateRoute"

import LoginPage from "../auth/login"
import Home from "../home/home"
// import AuthenticatedComponent from "../AuthenticatedComponent"
import Dashborad from "../mainscreen/dashboard"
import Servers from "../mainscreen/servers"
import RegisterServer from "../mainscreen/register-server"
import Endpoints from "../mainscreen/endpoints"
import Tuners from "../mainscreen/tuners"
import AssignChannelsToGroups from "../mainscreen/assign-channels-to-groups"
import ChannelSelection from "../mainscreen/channel-selection"
import Alerts from "../mainscreen/alerts"
import AssignTemplatesToGroups from "../mainscreen/assign-templates-to-groups"
import { Cookies } from "react-cookie"
const cookies = new Cookies()

class App extends Component {
  state = {
    loggedIn: false
  }

  componentDidMount() {
    console.log(
      "APP COMPONENT CHECKING TOKEN IN COOKIES...",
      cookies.get("token")
    )
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/auth/login"
            render={props => <LoginPage {...props} />}
          />
          <PrivateRoute
            exact
            path="/mainscreen/dashboard"
            component={Dashborad}
          />
          <PrivateRoute exact path="/mainscreen/servers" component={Servers} />
          <PrivateRoute
            exact
            path="/mainscreen/register-server"
            component={RegisterServer}
          />
          <PrivateRoute
            exact
            path="/mainscreen/endpoints"
            component={Endpoints}
          />
          <PrivateRoute exact path="/mainscreen/tuners" component={Tuners} />
          <PrivateRoute
            exact
            path="/mainscreen/assign-channels-to-groups"
            component={AssignChannelsToGroups}
          />
          <PrivateRoute
            exact
            path="/mainscreen/channel-selection"
            component={ChannelSelection}
          />
          <PrivateRoute path="/mainscreen/alerts" component={Alerts} />
          <PrivateRoute
            exact
            path="/mainscreen/assign-templates-to-groups"
            component={AssignTemplatesToGroups}
          />
        </Switch>
      </Router>
    )
  }
}

export default App
