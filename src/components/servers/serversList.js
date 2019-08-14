import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import ComputerIcon from "@material-ui/icons/Computer"
import Button from "@material-ui/core/Button"
import "../../../node_modules/text-spinners/spinners.css"

import Endpoints from "./endpoints/endpoints"
import Channels from "./channels/channels"

const useStyles = makeStyles(theme => ({
  root: {
    width: `100%`,
    backgroundColor: `#E5E5E5`
  },
  listItem: {
    height: `2rem`
  },
  serverName: {
    color: `#555`
  },
  buttonDark: {
    margin: theme.spacing(0),
    color: `#0D7BC0`,
    fontSize: `0.8rem`,
    width: `93px`
  },
  buttonLight: {
    margin: theme.spacing(0),
    color: `#1CB3E9`,
    fontSize: `0.8rem`,
    width: `93px`
  }
}))

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
        props.channelsShown &&
        server.productkey === currentServer &&
        !props.loadingChannels

      return (
        <div key={server._id}>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <ComputerIcon
                style={{
                  color:
                    server.productkey === props.selectedServer
                      ? `#3CB371`
                      : `#999`
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={server.name.toUpperCase()}
              className={classes.serverName}
            />
            <span
              className="loading dots3"
              style={{
                color: `#0D7BC0`,
                opacity:
                  props.loadingEndpoints &&
                  server.productkey === currentServer &&
                  props.endpointsShown
                    ? 1
                    : 0
              }}
            ></span>
            <Button
              className={classes.buttonDark}
              onClick={() => handleShowEndpoints(server.productkey)}
            >
              Endpoints
            </Button>

            <span
              className="loading dots3"
              style={{
                color: `#0D7BC0`,
                opacity:
                  props.loadingChannels &&
                  server.productkey === currentServer &&
                  props.channelsShown
                    ? 1
                    : 0
              }}
            ></span>

            <Button
              className={classes.buttonDark}
              onClick={() => handleShowChannels(server.productkey)}
            >
              Channels
            </Button>
            <Button
              className={classes.buttonLight}
              onClick={() =>
                handleSelect(
                  server.productkey === localStorage.getItem("selectedServer")
                    ? ""
                    : server.productkey
                )
              }
            >
              {server.productkey === localStorage.getItem("selectedServer") ? (
                <span style={{ color: "#777" }}>Deselect</span>
              ) : (
                "Select"
              )}
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
