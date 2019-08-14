import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import ComputerIcon from "@material-ui/icons/Computer"
import Button from "@material-ui/core/Button"

import Endpoints from "./endpoints/endpoints"
import Channels from "./channels/channels"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper
    backgroundColor: `#EFEFEF`
  },
  listItem: {
    height: `40px`
  },
  button: {
    margin: theme.spacing(2)
    // color: `orange`
  },
  buttonDark: {
    margin: theme.spacing(0),
    color: `#0D7BC0`
  },
  buttonLight: {
    margin: theme.spacing(0),
    color: `#1CB3E9`
  },
  input: {
    display: "none"
  }
}))

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />
// }

export default function ServersList(props) {
  const [currentServer, setCurrentServer] = useState("")
  const classes = useStyles()

  const handleSelect = server => props.selectServer(server)()
  const handleShowEndpoints = server => {
    setCurrentServer(server)
    props.showEndpoints(server)()
  }
  const handleShowChannels = server => {
    setCurrentServer(server)
    props.showChannels(server)()
  }

  const createList = () =>
    props.servers.map(server => {
      const endpointsFlag =
        props.endpointsShown && server.productkey === currentServer

      const channelsFlag =
        props.channelsShown && server.productkey === currentServer

      return (
        <div key={server.id}>
          <ListItem className={classes.listItem} key={server.id}>
            <ListItemIcon>
              <ComputerIcon />
            </ListItemIcon>
            <ListItemText primary={server.name.toUpperCase()} />
            {props.loadingEndpoints && server.productkey === currentServer ? (
              <p>Loading...</p>
            ) : null}
            <Button
              className={classes.buttonDark}
              onClick={() => handleShowEndpoints(server.productkey)}
            >
              {!endpointsFlag ? `Show Endpoints` : `Hide Endpoints`}
            </Button>
            {props.loadingChannels && server.productkey === currentServer ? (
              <p>Loading...</p>
            ) : null}
            <Button
              className={classes.buttonDark}
              onClick={() => handleShowChannels(server.productkey)}
            >
              Show Channels
            </Button>
            <Button
              className={classes.buttonLight}
              onClick={() => handleSelect(server.productkey)}
            >
              Select
            </Button>
          </ListItem>
          {endpointsFlag ? <Endpoints endpoints={props.endpoints} /> : null}
          {channelsFlag ? <Channels channels={props.channels} /> : null}
        </div>
      )
    })

  return (
    <div className={classes.root}>
      <List aria-label="servers">{createList()}</List>
    </div>
  )
}
