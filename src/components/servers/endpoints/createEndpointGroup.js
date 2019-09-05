import React from "react"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
// import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Close from "@material-ui/icons/Close"
// import { height } from "@material-ui/system"

const styles = {
  formContainer: {},
  form: {
    // border: `1px solid red`,
    // display: `flex`,
    // justifyContent: `space-between`
    // height: `2rem`
  },
  btnContainer: {
    textAlign: `right`,
    marginTop: `0.5rem`
  },
  addButton: {
    width: `5rem`
  }
}

export default function CreateEndpointGroup(props) {
  const handleClose = () => props.toggleCreateGroupForm()
  const handleChange = e => props.setNewGroupName(e.target.value)
  const handleAdd = () => props.addGroup()

  return (
    <div style={styles.formContainer}>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogActions style={{ paddingBottom: 0 }}>
          <IconButton aria-label="close" onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogActions>
        <DialogTitle
          id="alert-dialog-title"
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          Create a new endpoint group
        </DialogTitle>
        <DialogContent>
          <form style={styles.form}>
            <TextField
              id="standard-multiline-flexible"
              label="Group name"
              name="groupName"
              multiline
              rowsMax="4"
              value={props.newGroupName}
              onChange={e => handleChange(e)}
              // style={styles.textField}
              margin="normal"
              fullWidth
            />
            <div style={styles.btnContainer}>
              <Button
                variant="outlined"
                color="primary"
                style={styles.addButton}
                disabled={props.newGroupName.length < 3}
                onClick={handleAdd}
              >
                Add
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
