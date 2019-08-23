import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import Menu from "../../components/layout/menu"
import LinearProgress from "@material-ui/core/LinearProgress"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import CloseIcon from "@material-ui/icons/Close"
import CheckIcon from "@material-ui/icons/Check"

import { pageStyles } from "../../data/styles"
import channels from "../../utils/channels"

export default class AssignChannelsToGroups extends React.Component {
  state = {
    channelsList: [],
    loadingChannels: false,
    changingChannelAssignment: false
  }

  toggleLoading = () => {
    this.setState(prevState => ({
      loadingChannels: !prevState.loadingChannels
    }))
  }

  loadChannels = () => {
    channels
      .getAllEnabled()
      .then(channelsList =>
        this.setState({
          channelsList
        })
      )
      .catch(err => {
        this.setState({
          channelsList: []
        })
      })
      .finally(() => {
        this.toggleLoading()
      })
  }

  componentDidMount() {
    this.toggleLoading()
    this.loadChannels()
  }

  assignToGroup = (channelId, groupId) => () => {
    if (this.state.changingChannelAssignment) return
    this.setState({ changingChannelAssignment: true })
    channels
      .assignToGroup(channelId, groupId)
      .then(response => {
        let channelIndex = this.state.channelsList.findIndex(
          c => c.id === channelId
        )
        let groupIndex = this.state.channelsList[channelIndex].group.findIndex(
          g => g.id === groupId
        )
        this.state.channelsList[channelIndex].group[groupIndex].available = true
      })
      .catch(error => {})
      .finally(() => this.setState({ changingChannelAssignment: false }))
  }

  removeFromGroup = (channelId, groupId) => () => {
    if (this.state.changingChannelAssignment) return
    this.setState({ changingChannelAssignment: true })
    channels
      .removeFromGroup(channelId, groupId)
      .then(response => {
        let channelIndex = this.state.channelsList.findIndex(
          c => c.id === channelId
        )
        let groupIndex = this.state.channelsList[channelIndex].group.findIndex(
          g => g.id === groupId
        )
        this.state.channelsList[channelIndex].group[
          groupIndex
        ].available = false
      })
      .catch(error => {
        alert(error)
      })
      .finally(() => this.setState({ changingChannelAssignment: false }))
  }

  renderTableCell(channel, group) {
    return (
      <TableCell
        key={`${channel.id}x${group.id}`}
        onClick={(group.available ? this.removeFromGroup : this.assignToGroup)(
          channel.id,
          group.id
        )}
        align="center"
      >
        {group.available ? (
          <span className="assign-channels-icon">
            <CheckIcon style={{ fontSize: 14, color: `green` }} />
          </span>
        ) : (
          <span className="assign-channels-icon">
            <CloseIcon style={{ fontSize: 11, color: `lightgrey` }} />
          </span>
        )}
      </TableCell>
    )
  }

  renderTable = () => {
    if (!this.state.channelsList || this.state.channelsList.length === 0)
      return <p>No channels found</p>
    return (
      <Paper style={{ width: `99%` }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {this.state.channelsList[0].group.map(group => (
                <TableCell key={group.id} align="center">
                  {group.name.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.channelsList.map(channel => (
              <TableRow key={channel.id}>
                <TableCell style={{ paddingLeft: 20 }}>
                  {channel.name}
                </TableCell>
                {channel.group.map(group =>
                  this.renderTableCell(channel, group)
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

    return (
      <Layout>
        <SEO title="Assign Channels To Groups" />
        <CssBaseline />
        <div style={styles.mainContainer}>
          <div style={styles.menuContainer}>
            <Menu path={this.props.path} active={active} />
          </div>
          <div style={styles.pageContents}>
            {this.state.loadingChannels ? (
              <div style={{ flexGrow: 1 }}>
                <LinearProgress />
              </div>
            ) : (
              this.renderTable()
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

const styles = {
  ...pageStyles
}
