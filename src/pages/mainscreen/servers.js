import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import Menu from "../../components/layout/menu"
import idtservers from "../../utils/idtservers"
import channels from "../../utils/channels"
import endpoints from "../../utils/endpoints"

import ServersList from "../../components/servers/serversList"

import { pageStyles } from "../../data/styles"

export default class Servers extends React.Component {
  state = {
    loadingServers: true,
    loadingEndpoints: false,
    loadingChannels: false,
    idtservers: [],
    selectedServer: "",
    endpointsShown: false,
    groupsWithEndpoints: [],
    channelsShown: false,
    channels: []
  }

  showEndpoints = productkey => () => {
    this.setState(prevState => ({
      loadingEndpoints: true,
      endpointsShown: !prevState.endpointsShown,
      channelsShown: false,
      groupsWithEndpoints: []
    }))

    endpoints
      .getGroupsWithEndpoints(productkey)
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

  showChannels = productkey => () => {
    this.setState(prevState => ({
      loadingChannels: true,
      channelsShown: !prevState.channelsShown,
      endpointsShown: false,
      channels: []
    }))

    channels
      .get(productkey)
      .then(response => {
        this.setState({
          loadingChannels: false,
          channels: response
        })
      })
      .catch(error => {
        this.setState({
          channels: [],
          loadingChannels: false
        })
      })
  }

  selectServer = productkey => () => {
    idtservers.select(productkey)
    localStorage.setItem("selectedServer", productkey)
    this.setState({ selectedServer: productkey })
  }

  componentDidMount() {
    // this.setState({ selectedServer: idtservers.getSelected() })
    this.setState({ loadingServers: true })

    idtservers
      .get()
      .then(response => {
        console.log(response)
        this.setState({
          idtservers: response,
          loadingServers: false
        })
      })
      .catch(error => {
        alert(error)
        this.setState({ idtservers: [] })
      })
  }

  render() {
    const { idtservers } = this.state

    const active = localStorage.getItem("selectedServer")
      ? localStorage.getItem("selectedServer") === ""
        ? false
        : true
      : false

    return (
      <Layout>
        <SEO title="Servers" />
        <CssBaseline />
        <div style={styles.mainContainer}>
          <div style={styles.menuContainer}>
            <Menu path={this.props.path} active={active} />
          </div>
          <div style={styles.pageContents}>
            <ServersList
              servers={idtservers}
              selectServer={this.selectServer}
              selectedServer={this.state.selectedServer}
              endpoints={this.state.groupsWithEndpoints}
              showEndpoints={this.showEndpoints}
              endpointsShown={this.state.endpointsShown}
              loadingEndpoints={this.state.loadingEndpoints}
              channels={this.state.channels}
              showChannels={this.showChannels}
              channelsShown={this.state.channelsShown}
              loadingChannels={this.state.loadingChannels}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

const styles = {
  ...pageStyles
}
