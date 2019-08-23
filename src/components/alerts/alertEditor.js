import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import CloseIcon from "@material-ui/icons/Close"

import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"

import images from "../../utils/images"

const useStyles = makeStyles(theme => ({
  editorContainer: {
    marginLeft: `auto`,
    marginRight: `auto`
  },
  contentsContainer: {
    position: `relative`,
    width: `90%`,
    overflow: `hidden`,
    marginLeft: `auto`,
    marginRight: `auto`
  },
  imageContainer: {
    width: `600px`,
    height: ``
  },
  editorImage: {
    width: `82%`,
    height: `100%`
  },
  textArea: {
    position: `absolute`,
    left: 0,
    top: -35,
    width: `100%`,
    height: 320,
    textAlign: `center`,
    color: `#fff`,
    backgroundColor: `transparent`,
    fontSize: 17,
    padding: 0,
    margin: 0,
    resize: `none`,
    border: `none`,
    outline: `none`,
    overflow: `auto`
  },
  button: {
    margin: theme.spacing(1),
    width: `11rem`
  },
  buttonsContainer: {
    display: `flex`,
    justifyContent: `space-between`,
    paddingTop: `1.5rem`,
    paddingBottom: `1.5rem`,
    width: `87%`,
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

  return (
    <div>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.editorContainer}
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: `right` }}>
          <IconButton aria-label="close" onClick={handleCloseEditor}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.contentsContainer}>
          <div className={classes.imageContainer}>
            <img
              src={images.get("alerts/miniature-" + props.alert.image)}
              alt="alert"
              className={classes.editorImage}
            />
          </div>
          <textarea
            className={classes.textArea}
            value={props.openedAlertText.replace(/<br>/g, "\n")}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions className={classes.buttonsContainer}>
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
        </DialogActions>
      </Dialog>
    </div>
  )
}
