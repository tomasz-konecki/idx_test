import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardActions from "@material-ui/core/CardActions"
import IconButton from "@material-ui/core/IconButton"
import { red } from "@material-ui/core/colors"
import Button from "@material-ui/core/Button"
import CLoseIcon from "@material-ui/icons/Close"

import fireDrillPic from "../../assets/img/firedrill.png"

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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

export default function TestCard() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton aria-label="close">
            <CLoseIcon />
          </IconButton>
        }
        subheader="Fire dirll"
      />
      <CardMedia
        className={classes.media}
        image={fireDrillPic}
        title="Fire drill"
      />

      <CardActions className={classes.buttonsContainer}>
        <Button variant="contained" className={classes.button}>
          Edit
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          Show
        </Button>
      </CardActions>
    </Card>
  )
}
