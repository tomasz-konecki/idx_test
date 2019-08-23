import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import Menu from "../../components/layout/menu"
import endpoints from "../../utils/endpoints"
import LinearProgress from "@material-ui/core/LinearProgress"
import EndpointsComponent from "../../components/servers/endpoints/endpoints"

import { pageStyles } from "../../data/styles"

export default class Endpoints extends React.Component {
  state = {
    groupsWithEndpoints: [],
    loadingEndpoints: false
  }

  toggleLoading = () => {
    this.setState(prevState => ({
      loadingEndpoints: !prevState.loadingEndpoints
    }))
  }

  loadEndpoints = () => {
    endpoints
      .getGroupsWithEndpoints()
      .then(response => {
        this.setState({
          groupsWithEndpoints: response,
          loadingEndpoints: false
        })
      })
      .catch(error => {
        this.setState({
          groupsWithEndpoints: [],
          loadingEndpoints: false
        })
      })
  }

  componentDidMount() {
    this.toggleLoading()
    this.loadEndpoints()
  }

  render() {
    const active = localStorage.getItem("selectedServer")
      ? localStorage.getItem("selectedServer") === ""
        ? false
        : true
      : false

    return (
      <Layout>
        <SEO title="Endpoints" />
        <CssBaseline />
        <div style={styles.mainContainer}>
          <div style={styles.menuContainer}>
            <Menu path={this.props.path} active={active} />
          </div>
          <div style={styles.pageContents}>
            {this.state.loadingEndpoints ? (
              <div style={{ flexGrow: 1 }}>
                <LinearProgress />
              </div>
            ) : null}
            <EndpointsComponent endpoints={this.state.groupsWithEndpoints} />
          </div>
        </div>
      </Layout>
    )
  }
}

const styles = {
  ...pageStyles
}
