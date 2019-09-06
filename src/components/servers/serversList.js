import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import ComputerIcon from "@material-ui/icons/Computer"
import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"
import "../../../node_modules/text-spinners/spinners.css"

import CircularLoader from "../../components/loaders/circular-progress"

import Endpoints from "./endpoints/endpoints"
import Channels from "./channels/channels"

const useStyles = makeStyles(theme => ({
  root: {
    width: `100%`,
    backgroundColor: `#E5E5E5`
  },
  listItem: {
    height: `2rem`,
    paddingTop: `1.3rem`
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
  },
  divider: {
    borderBottom: `1px solid #ccc`
  },
  chip: {
    fontSize: `12px`,
    textTransform: `uppercase`,
    background: `#b7e5cb`,
    paddingTop: 2,
    color: `#444`
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
        props.endpointsShown && server.productKey === currentServer

      const channelsFlag =
        props.channelsShown &&
        server.productKey === currentServer &&
        !props.loadingChannels

      return (
        <div key={server.id}>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <ComputerIcon
                style={{
                  color:
                    server.productKey === localStorage.getItem("selectedServer")
                      ? `#3CB371`
                      : `#999`
                }}
              />
            </ListItemIcon>
            <ListItemText
              secondary={
                <span style={{ color: `#333` }}>
                  {server.name.toUpperCase()}
                </span>
              }
            />

            {server.currentAlert ? (
              <Chip label="- Displaying alert -" className={classes.chip} />
            ) : null}

            <div style={{ transform: `translate(12px, -6px)` }}>
              <CircularLoader
                size={15}
                opacity={
                  props.loadingEndpoints &&
                  server.productKey === currentServer &&
                  props.endpointsShown
                    ? 1
                    : 0
                }
              />
            </div>
            <Button
              className={classes.buttonDark}
              onClick={() => handleShowEndpoints(server.productKey)}
              style={{
                textDecoration:
                  !props.loadingEndpoints &&
                  server.productKey === currentServer &&
                  props.endpointsShown
                    ? `underline`
                    : `none`
              }}
            >
              Endpoints
            </Button>
            <Button
              className={classes.buttonDark}
              onClick={() => handleShowChannels(server.productKey)}
              style={{
                textDecoration:
                  !props.loadingChannels &&
                  server.productKey === currentServer &&
                  props.channelsShown
                    ? `underline`
                    : `none`
              }}
            >
              Channels
            </Button>
            <div style={{ transform: `translate(0px, -6px)` }}>
              <CircularLoader
                size={15}
                opacity={
                  props.loadingChannels &&
                  server.productKey === currentServer &&
                  props.channelsShown
                    ? 1
                    : 0
                }
              />
            </div>
            <Button
              className={classes.buttonLight}
              onClick={() =>
                handleSelect(
                  server.productKey === localStorage.getItem("selectedServer")
                    ? ""
                    : server.productKey
                )
              }
            >
              {server.productKey === localStorage.getItem("selectedServer") ? (
                <span style={{ color: "#777" }}>Deselect</span>
              ) : (
                "Select"
              )}
            </Button>
          </ListItem>
          <div className={classes.divider} />
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
