import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Divider from "@material-ui/core/Divider"
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
  }
}))

export default function EndpointsTable({ endpoint }) {
  const classes = useStyles()

  function createData(name, orientation, online, status) {
    return { name, orientation, online, status }
  }

  // const rows = [
  //   createData(endpoint.name, "Landscape", endpoint.online, endpoint.status)
  // ]

  console.log("ENDPOINTS TABLE:", endpoint)

  return (
    <div>
      {/* {rows.map(row => ( */}
      <TableRow key={endpoint.name}>
        <TableCell component="th" scope="row">
          {endpoint.name}
        </TableCell>
        <TableCell align="right">Portrait</TableCell>
        <TableCell align="right">{endpoint.online ? "Yes" : "No"}</TableCell>
        <TableCell align="right">{endpoint.status}</TableCell>
      </TableRow>
      {/* ))} */}
    </div>
  )
}
