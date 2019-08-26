import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import Button from "@material-ui/core/Button"
import Menu from "../../components/layout/menu"
import Alert from "../../components/alerts/alert"
import AlertEditor from "../../components/alerts/alertEditor"
import LinearProgress from "@material-ui/core/LinearProgress"
import SnackbarSuccess from "../../components/snackbars/snackbarSuccess"

import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

import alerts from "../../utils/alerts"
import idtservers from "../../utils/idtservers"
import images from "../../utils/images"

import { pageStyles } from "../../data/styles"

export default class Alerts extends React.Component {
  state = {
    loadingAlerts: false,
    openedAlertId: "",
    openedAlertText: "",
    alertsList: [],
    alertsShown: false,
    currentlyShownAlert: "",
    alertIndex: undefined,
    openEditor: false,
    alertToBeRemoved: {},
    showSnackbar: false,
    snackMssg: "",
    imagesLoaded: false
  }

  componentDidMount() {
    this.setState({ loadingAlerts: true }, () => this.loadAlerts())
  }

  componentWillUnmount() {
    images.clearCache()
  }

  loadImages = async () => {
    for (let alert of this.state.alertsList) {
      if (!images.get("alerts/miniature-" + alert.image)) {
        await images.load("alerts/miniature-" + alert.image)
        this.forceUpdate()
      }
    }
    this.getCurrentlyShownAlert()
  }

  loadAlerts = () =>
    alerts
      .get()
      .then(alertsList => {
        this.setState(
          {
            alertsList,
            loadingAlerts: false
          },
          () => this.loadImages()
        )
      })
      .catch(error => {
        this.setState({ alertsList: [] })
      })

  getCurrentlyShownAlert = async () => {
    const currentlyShownAlert = await idtservers.getCurrentAlert()
    this.setState({
      alertsShown: currentlyShownAlert ? true : false,
      currentlyShownAlert
    })
  }

  openAlertEditor = (alert, alertIndex) => () =>
    this.setState({
      openedAlertId: alert.id,
      openedAlertText: alert.sampletext,
      alertIndex
    })

  handleInputChange = e => this.setState({ openedAlertText: e.target.value })

  saveEdits = index => {
    this.setState({ loadingAlerts: true })

    const { openedAlertText, openedAlertId, currentlyShownAlert } = this.state
    let id = openedAlertId
    let text = openedAlertText

    alerts
      .saveEdits(text, id)
      .then(response => {
        this.setState({ alertsList: response, loadingAlerts: false })

        if (index === Number(currentlyShownAlert)) {
          this.showAlert(text, index)()
          this.closeEditor()
          this.toggleSnackBar("Alert has been edited")
        } else {
          this.closeEditor()
          this.toggleSnackBar("Alert has been edited")
        }
      })
      .catch(() => {})
  }

  saveAsNew = () => {
    const { openedAlertText, openedAlertId } = this.state
    alerts.saveAsNew(openedAlertText, openedAlertId).then(_ => {
      this.closeEditor()
      this.toggleSnackBar("A new alert has been added")
      this.loadAlerts()
    })
  }

  closeEditor = () =>
    this.setState({
      openedAlertText: "",
      openedAlertId: ""
    })

  renderAlertEditor = () => {
    const { openedAlertId, openedAlertText, alertIndex } = this.state
    return openedAlertId || !openedAlertId === "" ? (
      <AlertEditor
        openedAlertText={openedAlertText.replace(/<br>/g, "\n")}
        handleInputChange={this.handleInputChange}
        saveEdits={this.saveEdits}
        saveAsNew={this.saveAsNew}
        alertIndex={alertIndex}
        closeEditor={this.closeEditor}
        alert={this.state.alertsList[alertIndex]}
      />
    ) : null
  }

  clearAlerts = () =>
    this.setState({ alertsShown: false }, () =>
      alerts.clear().then(res => {
        res === "OK"
          ? idtservers.setCurrentAlert("").then(res => {
              res.status === 200
                ? this.setState({ currentlyShownAlert: "" }, () => {
                    this.toggleSnackBar("Alert is off")
                  })
                : alert(`Something's not right with setting current alert...`)
            })
          : alert(`Something's not right with clearing alerts...`)
      })
    )

  toggleSnackBar = snackMssg =>
    this.setState(prevState => ({
      showSnackbar: !prevState.showSnackbar,
      snackMssg
    }))

  resetSnackBar = () =>
    this.setState({
      showSnackbar: false
    })

  showAlert = (text, alertIndex) => () => {
    alerts
      .show(text, alertIndex)
      .then(res =>
        res === `OK`
          ? this.setState(
              {
                alertsShown: true,
                currentlyShownAlert: alertIndex
              },
              () => {
                idtservers.setCurrentAlert(alertIndex).then(res => {
                  this.toggleSnackBar("Alert is now being displayed")
                  if (res.status !== 200) {
                    alert(
                      `showAlert method => Something's not right with setting current alert...`
                    )
                  }
                })
              }
            )
          : alert(`Something's not right in showAlert method...`)
      )
      .catch(err => alert(err))
  }

  handleRemoveAlert = alertToBeRemoved => {
    this.setState(
      {
        alertToBeRemoved
      },
      () => this.toggleAlertEditor()
    )
  }

  toggleAlertEditor = () =>
    this.setState(prevState => ({
      openEditor: !prevState.openEditor
    }))

  removeAlert = () => {
    alerts.remove(this.state.alertToBeRemoved.id).then(res => {
      this.setState({ alertToBeRemoved: {} }, () => {
        this.toggleAlertEditor()
        this.toggleSnackBar("Alert has been removed")
        this.loadAlerts()
      })
    })
  }

  renderAlerts = () => {
    const { alertsList, currentlyShownAlert, alertsShown } = this.state

    return !alertsList || alertsList.length === 0 ? (
      <div>No alerts found...</div>
    ) : (
      <div style={styles.alertsContainer}>
        {alertsList.map((alert, alertIndex) => (
          <Alert
            key={alert.id}
            alert={alert}
            alertIndex={alertIndex}
            openAlertEditor={this.openAlertEditor}
            showAlert={this.showAlert}
            currentlyShownAlert={currentlyShownAlert}
            alertsShown={alertsShown}
            handleRemoveAlert={this.handleRemoveAlert}
          />
        ))}
      </div>
    )
  }

  render() {
    const { alertsShown, showSnackbar, snackMssg } = this.state

    const active = localStorage.getItem("selectedServer")
      ? localStorage.getItem("selectedServer") === ""
        ? false
        : true
      : false

    return (
      <Layout>
        <SEO title="Alerts" />
        <CssBaseline />
        <div style={styles.mainContainer}>
          <div style={styles.menuContainer}>
            <Menu path={this.props.path} active={active} />
          </div>
          <div style={styles.pageContents}>
            {this.state.loadingAlerts ? (
              <div style={{ flexGrow: 1 }}>
                <LinearProgress />
              </div>
            ) : null}
            <div style={styles.btnContainer}>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.openAlertCreator}
              >
                Create new alert
              </Button>

              {alertsShown ? (
                <Button
                  style={styles.button}
                  variant="outlined"
                  color="secondary"
                  onClick={this.clearAlerts}
                >
                  Stop displaying alert
                </Button>
              ) : (
                <Button
                  style={styles.button}
                  variant="outlined"
                  color="default"
                  disabled
                >
                  <span
                    style={{
                      fontSize: `12px`,
                      display: `block`,
                      height: `1.3rem`,
                      paddingTop: `2px`
                    }}
                  >
                    No alert is being displayed
                  </span>
                </Button>
              )}
            </div>
            {this.state.loadingAlerts ? null : this.renderAlerts()}
            {this.state.loadingAlerts ? " " : this.renderAlertEditor()}
          </div>
        </div>
        {showSnackbar && (
          <SnackbarSuccess
            resetSnackBar={this.resetSnackBar}
            snackMssg={snackMssg}
          />
        )}
        <Dialog
          open={this.state.openEditor}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Removing alert</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove this alert?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleAlertEditor} color="primary">
              No
            </Button>
            <Button onClick={this.removeAlert} color="secondary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Layout>
    )
  }
}

const styles = {
  ...pageStyles,
  alertsContainer: {
    padding: `1rem`,
    display: `flex`,
    flexWrap: `wrap`,
    justifyContnet: `space-between`
  },
  btnContainer: {
    height: `2.2rem`,
    paddingRight: `4rem`,
    paddingLeft: `1rem`,
    marginTop: `0.5rem`,
    textAlign: `right`,
    display: `flex`,
    justifyContent: `space-between`
  },
  button: {
    width: `14rem`
  }
}
