import React from "react"
import { makeStyles } from "@material-ui/core/styles"
// import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
// import CardMedia from "@material-ui/core/CardMedia"
import CardActions from "@material-ui/core/CardActions"
import IconButton from "@material-ui/core/IconButton"
import { red } from "@material-ui/core/colors"
import Button from "@material-ui/core/Button"
import CloseIcon from "@material-ui/icons/Close"

import fireDrillPic from "../../assets/img/firedrill.png"

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: `11rem`
  },
  avatar: {
    backgroundColor: red[500]
  },
  buttonsContainer: {
    display: `flex`,
    justifyContent: `space-between`,
    paddingTop: `20.5rem`,
    width: `95%`,
    marginLeft: `auto`,
    marginRight: `auto`
  }
}))

export default function AlertEditor(props) {
  const classes = useStyles()

  const handleInputChange = e => props.handleInputChange(e)
  const handleSaveEdits = () => props.saveEdits(props.alertIndex)
  const handleSaveAsNew = () => props.saveAsNew()
  const handleCloseEditor = () => props.closeEditor()

  // console.log("ALERT EDITOR, ALERT INDEX:", props.alertIndex)

  return (
    <div className="alertEditor">
      <CardHeader
        style={{ paddingBottom: 0 }}
        action={
          <IconButton aria-label="close" onClick={handleCloseEditor}>
            <CloseIcon />
          </IconButton>
        }
      />
      <div style={{ position: "relative" }}>
        <img src={fireDrillPic} alt="alert" className="alertsImageInEditor" />
        <textarea
          className="alertEditorText"
          value={props.openedAlertText.replace(/<br>/g, "\n")}
          onChange={handleInputChange}
        />
        <CardActions className={classes.buttonsContainer}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSaveEdits}
          >
            Save Edits
          </Button>
          <Button variant="contained" color="primary" onClick={handleSaveAsNew}>
            Save As New Alert
          </Button>
        </CardActions>
      </div>
    </div>
  )
}
