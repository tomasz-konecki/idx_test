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

export default function Endpoints(props) {
  const classes = useStyles()
  let groups = props.endpoints

  return (
    <div className={classes.root}>
      <CssBaseline />
      {groups.map(group =>
        group.name !== "unassigned" ? (
          <div key={group.id}>
            <h5>{group.name.toUpperCase()}</h5>
            <Paper className={classes.paper}>
              <Table className={classes.table} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.cell}>
                      Device name
                    </TableCell>
                    <TableCell align="center" className={classes.cell}>
                      Orientation
                    </TableCell>
                    <TableCell align="center" className={classes.cell}>
                      Online
                    </TableCell>
                    <TableCell align="center" className={classes.cell}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {group.endpoints.map(endpoint => (
                    <TableRow key={endpoint.name}>
                      <TableCell align="center" className={classes.cell}>
                        {endpoint.name}
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        Portrait
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        {endpoint.online ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        {endpoint.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
        ) : null
      )}
    </div>
  )
}
