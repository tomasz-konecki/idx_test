import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardActions from "@material-ui/core/CardActions"
import IconButton from "@material-ui/core/IconButton"
import { red } from "@material-ui/core/colors"
import Button from "@material-ui/core/Button"
import CloseIcon from "@material-ui/icons/Close"

import images from "../../utils/images"

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: `19.15rem`,
    height: `370px`,
    position: `relative`,
    marginRight: `1.6rem`,
    marginBottom: `1.6rem`,
    backgroundColor: `whitesmoke`
  },
  cardSelected: {
    maxWidth: `19.15rem`,
    height: `370px`,
    position: `relative`,
    marginRight: `1.6rem`,
    marginBottom: `1.6rem`,
    border: `4px solid #3CB371`,
    backgroundColor: `whitesmoke`
  },
  media: {
    height: 0,
    paddingTop: `61%`, // 16:9
    marginRight: `0.8rem`,
    marginLeft: `0.8rem`,
    borderRadius: `5px`
  },
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
    paddingTop: `1rem`
  }
}))

export default function Alert(props) {
  const classes = useStyles()

  const {
    alert,
    alertIndex,
    openAlertEditor,
    showAlert,
    currentlyShownAlert,
    alertsShown,
    handleRemoveAlert
  } = props

  const handleEdit = alert => openAlertEditor(alert, alertIndex)()
  const handleShow = alert => showAlert(alert, alertIndex)()
  const handleRemove = alert => handleRemoveAlert(alert)

  return (
    <Card
      className={
        alertsShown & (Number(currentlyShownAlert) === alertIndex)
          ? classes.cardSelected
          : classes.card
      }
    >
      <CardHeader
        action={
          <IconButton aria-label="close" onClick={() => handleRemove(alert)}>
            <CloseIcon />
          </IconButton>
        }
        subheader={alert.name}
      />
      <div style={{ marginLeft: 10, marginRight: 10, height: 210 }}>
        <img
          src={images.get("alerts/miniature-" + alert.image)}
          style={{ height: `100%`, width: `100%` }}
          alt="Fire drill"
        />
      </div>
      <div className="alertText">
        {alert.sampletext
          .split(/(<br>)/g)
          .map((e, i) => (e === "<br>" ? <br key={i} /> : e))}
      </div>
      <CardActions className={classes.buttonsContainer}>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={() => handleEdit(alert, alertIndex)}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => handleShow(alert.sampletext, alertIndex)}
        >
          Show
        </Button>
      </CardActions>
    </Card>
  )
}
