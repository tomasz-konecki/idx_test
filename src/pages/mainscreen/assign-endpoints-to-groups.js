import React from "react"
import { navigate } from "gatsby"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import Menu from "../../components/layout/menu"
import endpoints from "../../utils/endpoints"

import { pageStyles } from "../../data/styles"
// import Endpoints from "../../components/servers/endpoints/endpoints"

export default class AssignEndpointsToGroups extends React.Component {
  state = {
    endpoints: [],
    loadingEndpoints: false
  }

  componentDidMount() {
    this.toggleLoadingEndpoints()
    this.loadEndpoints()
  }

  toggleLoadingEndpoints = () => {
    this.setState(prevState => ({
      loadingEndpoints: !prevState.loadingEndpoints
    }))
  }

  loadEndpoints = () => {
    endpoints
      .get()
      .then(endpoints =>
        this.setState({ endpoints }, () => this.toggleLoadingEndpoints())
      )
      .catch(err => alert(err))
  }

  assignEndpoint = (endpointAddress, groupId) => () => {
    this.toggleLoadingEndpoints()
    endpoints
      .assignEndpointToGroup(endpointAddress, groupId)
      .then(endpoints =>
        this.setState({ endpoints }, () => this.toggleLoadingEndpoints())
      )
      .catch(error => alert(error))
  }

  renderTableCell = (endpoint, group) => (
    <TableCell
      key={`${endpoint.address}x${group.id}`}
      onClick={this.assignEndpoint(endpoint.address, group.id)}
      align="center"
    >
      {endpoint.groupid === group.id ? "✓" : "."}
    </TableCell>
  )

  renderEndpointsTable = () => {
    const { endpoints } = this.state
    return (
      <Paper style={styles.paper}>
        <Table style={styles.table} size="small">
          <TableHead>
            <TableCell></TableCell>
            {endpoints[0].group.map(group => (
              <TableCell key={group.id} align="center">
                {group.name.toUpperCase()}
              </TableCell>
            ))}
          </TableHead>
          <TableBody>
            {endpoints.map(endpoint => (
              <TableRow key={endpoint.address}>
                <TableCell style={{ paddingLeft: 20 }}>
                  {endpoint.name}
                </TableCell>
                {endpoint.group.map(group =>
                  this.renderTableCell(endpoint, group)
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }

  render() {
    const active = localStorage.getItem("selectedServer")
      ? localStorage.getItem("selectedServer") === ""
        ? false
        : true
      : false

    const { endpoints } = this.state

    return (
      <Layout>
        <SEO title="Assign Templates To Groups" />
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
            <div style={styles.buttonContainer}>
              <Button
                variant="outlined"
                onClick={() => navigate(`mainscreen/endpoints`)}
              >
                &#60;&nbsp;Back to endpoints
              </Button>
            </div>
            {endpoints.length > 0 ? this.renderEndpointsTable() : null}
          </div>
        </div>
      </Layout>
    )
  }
}

const styles = {
  ...pageStyles,
  buttonContainer: {
    marginBottom: `1rem`,
    // marginLeft: `0.4rem`,
    marginTop: `0.5rem`
  },
  paper: {
    marginTop: 0,
    width: "100%",
    overflowX: "auto",
    marginBottom: 0
  },
  table: {
    minWidth: 650
  }
}
