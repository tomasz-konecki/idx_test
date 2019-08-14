import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import CssBaseline from "@material-ui/core/CssBaseline"

const useStyles = makeStyles(theme => ({
  root: {
    width: "99%",
    margin: "auto"
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 650
  },
  cell: {
    width: `100px`
  }
}))

export default function Channels({ channels }) {
  const classes = useStyles()

  console.log("CHANNELS >>>", channels)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.cell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.cell}>
                Type
              </TableCell>
              <TableCell align="center" className={classes.cell}>
                Playlist
              </TableCell>
              <TableCell align="center" className={classes.cell}>
                Assigned to group
              </TableCell>
              <TableCell align="center" className={classes.cell}>
                Address
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {channels.map(channel => (
              <TableRow key={channel.id}>
                <TableCell align="center" className={classes.cell}>
                  {channel.name}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {channel.type}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {channel.currentPlaylistName}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {channel.assignedtogroup ? "Yes" : "No"}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {channel.address ? channel.address : "Not Transmiting"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}
