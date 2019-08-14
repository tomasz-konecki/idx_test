import React from "react"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import Menu from "../../components/layout/menu"
import idtservers from "../../utils/idtservers"
import channels from "../../utils/channels"
import endpoints from "../../utils/endpoints"

import ServersList from "../../components/servers/serversList"

import { pageStyles } from "../../data/styles"

export default class Servers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingServers: true,
      loadingEndpoints: false,
      loadingChannels: false,
      idtservers: [],
      selectedServer: "",
      endpointsShown: false
    }

    this.groupsWithEndpoints = []
    // this.idtservers = []
    this.channels = []
    this.showEndpoints = this.showEndpoints.bind(this)
    this.showChannels = this.showChannels.bind(this)
    this.selectServer = this.selectServer.bind(this)
  }

  showEndpoints = productkey => () => {
    this.setState(prevState => ({
      loadingEndpoints: true,
      endpointsShown: !prevState.endpointsShown
    }))
    endpoints
      .getGroupsWithEndpoints(productkey)
      .then(response => {
        this.groupsWithEndpoints = response
      })
      .catch(error => {
        this.groupsWithEndpoints = []
      })
      .finally(() => this.setState({ loadingEndpoints: false }))
  }

  showChannels = productkey => () => {
    this.setState({ loadingChannels: true })
    channels
      .get(productkey)
      .then(response => {
        this.channels = response
      })
      .catch(error => {
        this.channels = []
      })
      .finally(() => this.setState({ loadingChannels: false }))
  }

  selectServer = productkey => () => {
    console.log("SELECTING SERVER....", productkey)
    idtservers.select(productkey)
    this.setState({ selectedServer: productkey })
  }

  componentDidMount() {
    // this.setState({ selectedServer: idtservers.getSelected() })
    this.setState({ loadingServers: true })

    idtservers
      .get()
      .then(response => {
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

    return (
      <Layout>
        <SEO title="Servers" />
        <div style={styles.mainContainer}>
          <div style={styles.menuContainer}>
            <Menu path={this.props.path} />
          </div>
          <div style={styles.pageContents}>
            <h1 style={styles.pageTitle}>Your Servers</h1>
            {this.state.loadingServers ? (
              <p>Loading...</p>
            ) : (
              this.state.idtservers.map(server => (
                <p key={server.productkey}>
                  name: {server.name}, productkey: {server.productkey}
                  <button
                    key={server.productkey}
                    onClick={this.showEndpoints(server.productkey)}
                  >
                    Show endpoints
                  </button>
                  <button onClick={this.showChannels(server.productkey)}>
                    Show channels
                  </button>
                  {this.state.selectedServer === server.productkey ? (
                    "selected"
                  ) : (
                    <button onClick={this.selectServer(server.productkey)}>
                      select
                    </button>
                  )}
                </p>
              ))
            )}

            <h2>enpoints:</h2>
            {this.state.loadingEndpoints ? (
              <p>Loading...</p>
            ) : (
              this.groupsWithEndpoints.map(group => (
                <div key={group.id}>
                  <h4>{group.name}:</h4>
                  {group.endpoints.map(endpoint => (
                    <p key={endpoint.mac}>
                      &emsp;{endpoint.name} -{" "}
                      {endpoint.online ? "online" : "offline"}
                    </p>
                  ))}
                </div>
              ))
            )}

            <h2>channels:</h2>
            {this.state.loadingChannels ? (
              <p>Loading...</p>
            ) : (
              this.channels.map(channel => (
                <p key={channel.id}>
                  {channel.name} -{" "}
                  {channel.address === "" ? "Not Transmiting" : channel.address}
                </p>
              ))
            )}
            <ServersList
              servers={idtservers}
              endpointsShown={this.state.endpointsShown}
              selectedServer={this.state.selectedServer}
              selectServer={this.selectServer}
              showEndpoints={this.showEndpoints}
              endpoints={this.groupsWithEndpoints}
              showChannels={this.showChannels}
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
