import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import PrivateRoute from "../../components/authenticated/PrivateRoute"

import LoginPage from "../auth/login"
import Home from "../home/home"
import Dashborad from "../mainscreen/dashboard"
import Servers from "../mainscreen/servers"
import RegisterServer from "../mainscreen/register-server"
import Endpoints from "../mainscreen/endpoints"
import Tuners from "../mainscreen/tuners"
import AssignChannelsToGroups from "../mainscreen/assign-channels-to-groups"
import ChannelSelection from "../mainscreen/channel-selection"
import Alerts from "../mainscreen/alerts"
import AssignTemplatesToGroups from "../mainscreen/assign-templates-to-groups"
// import { borderColor } from "@material-ui/system"
// import { Cookies } from "react-cookie"
// const cookies = new Cookies()

class App extends Component {
  state = {
    loggedIn: false
  }

  componentDidMount() {
    localStorage.clear()
    // console.log("APP >>>", Boolean(localStorage.getItem("selectedServer")))
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
          <PrivateRoute path="/mainscreen/dashboard" component={Dashborad} />
          <PrivateRoute path="/mainscreen/servers" component={Servers} />
          <PrivateRoute
            path="/mainscreen/register-server"
            component={RegisterServer}
          />
          <PrivateRoute
            path="/mainscreen/endpoints"
            render={props => <Endpoints {...this.state} />}
          />
          <PrivateRoute path="/mainscreen/tuners" component={Tuners} />
          <PrivateRoute
            path="/mainscreen/assign-channels-to-groups"
            component={AssignChannelsToGroups}
          />
          <PrivateRoute
            path="/mainscreen/channel-selection"
            component={ChannelSelection}
          />
          <PrivateRoute path="/mainscreen/alerts" component={Alerts} />
          <PrivateRoute
            path="/mainscreen/assign-templates-to-groups"
            component={AssignTemplatesToGroups}
          />
        </Switch>
      </Router>
    )
  }
}

export default App
