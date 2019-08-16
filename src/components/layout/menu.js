import React from "react"
import { MenuList, MenuItem } from "@material-ui/core"
import { Link } from "gatsby"

export default function Menu({ path, active }) {
  return (
    <MenuList style={{ background: "#ddd" }}>
      <MenuItem
        component={Link}
        to="/mainscreen/servers"
        selected={"/mainscreen/servers/" === path}
      >
        My Servers
      </MenuItem>
      <MenuItem
        component={Link}
        to="/mainscreen/register-server"
        selected={"/mainscreen/register-server/" === path}
        // disabled={!active}
      >
        Register New IDT Server
      </MenuItem>
      <MenuItem
        component={Link}
        to="/mainscreen/endpoints"
        selected={"/mainscreen/endpoints/" === path}
        disabled={!active}
      >
        Endpoints
      </MenuItem>
      <MenuItem
        component={Link}
        to="/mainscreen/tuners"
        selected={"/mainscreen/tuners/" === path}
        disabled={!active}
      >
        Tuners
      </MenuItem>
      <MenuItem
        component={Link}
        to="/mainscreen/assign-channels-to-groups"
        selected={"/mainscreen/assign-channels-to-groups/" === path}
        disabled={!active}
      >
        Assign Channels To Groups
      </MenuItem>
      <MenuItem
        component={Link}
        to="/mainscreen/channel-selection"
        selected={"/mainscreen/channel-selection/" === path}
        disabled={!active}
      >
        Channel Selection
      </MenuItem>
      <MenuItem
        component={Link}
        to="/mainscreen/alerts"
        selected={"/mainscreen/alerts/" === path}
        disabled={!active}
      >
        Alerts
      </MenuItem>
      <MenuItem
        component={Link}
        to="/mainscreen/assign-templates-to-groups"
        selected={"/mainscreen/assign-templates-to-groups/" === path}
        disabled={!active}
      >
        Assign Templates To Groups
      </MenuItem>
    </MenuList>
  )
}
