import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
// import { withRouter } from "react-router"

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
          <Route path="/mainscreen/dashboard" component={Dashborad} />
          <Route path="/mainscreen/servers" component={Servers} />
          <Route
            path="/mainscreen/register-server"
            component={RegisterServer}
          />
          <Route path="/mainscreen/endpoints" component={Endpoints} />
          <Route path="/mainscreen/tuners" component={Tuners} />
          <Route
            path="/mainscreen/assign-channels-to-groups"
            component={AssignChannelsToGroups}
          />
          <Route
            path="/mainscreen/channel-selection"
            component={ChannelSelection}
          />
          <Route path="/mainscreen/alerts" component={Alerts} />
          <Route
            path="/mainscreen/assign-templates-to-groups"
            component={AssignTemplatesToGroups}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

// export default withRouter(App)
export default App
