import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import Button from "@material-ui/core/Button"
import Menu from "../../components/layout/menu"
import Alert from "../../components/alerts/alert"
import AlertEditor from "../../components/alerts/alertEditor"
import alerts from "../../utils/alerts"
import idtservers from "../../utils/idtservers"

import fireDrillPic from "../../assets/img/firedrill.png"
import { pageStyles } from "../../data/styles"
import "./alerts.css"

export default class Alerts extends React.Component {
  state = {
    loadingAlerts: false,
    openedAlertId: "",
    openedAlertText: "",
    alertsList: [],
    alertsShown: false,
    currentlyShownAlert: "",
    alertIndex: undefined
  }

  componentDidMount() {
    this.setState({ loadingAlerts: true }, () => this.loadAlerts())
  }

  loadAlerts = () => {
    alerts
      .get()
      .then(response => {
        this.setState(
          {
            alertsList: response,
            loadingAlerts: false
          },
          () => this.getCurrentlyShownAlert()
        )
      })
      .catch(error => {
        this.setState({ alertsList: [] })
      })
  }

  getCurrentlyShownAlert = async () => {
    console.log(">>> getCurrentlyShownAlert")
    const currentlyShownAlert = await idtservers.getCurrentAlert()
    console.log(currentlyShownAlert)

    this.setState({
      alertsShown: currentlyShownAlert ? true : false,
      currentlyShownAlert
    })
  }

  openAlertEditor = (alert, alertIndex) => () =>
    console.log(alert) ||
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
    let text = openedAlertText.replace(/\n/g, "<br>")

    alerts
      .saveEdits(text, id)
      .then(response => {
        this.setState({ alertsList: response, loadingAlerts: false })

        if (index === Number(currentlyShownAlert)) {
          this.showAlert(text, index)()
          this.closeEditor()
        } else {
          this.closeEditor()
        }
      })
      .catch(() => {})
  }

  saveAsNew = () =>
    this.setState({
      openedAlertId: "",
      openedAlertText: ""
    })

  closeEditor = () => {
    this.setState({
      openedAlertText: "",
      openedAlertId: ""
    })
  }

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
      />
    ) : null
  }

  clearAlerts = () =>
    this.setState({ alertsShown: false }, () =>
      alerts.clear().then(res => {
        console.log("clearAlerts", res)
        res === "OK"
          ? idtservers.setCurrentAlert("").then(res => {
              res.status === 200
                ? this.setState({ currentlyShownAlert: "" })
                : alert(`Something's not right with setting current alert...`)
            })
          : alert(`Something's not right with clearing alerts...`)
      })
    )

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
                  console.log("showAlert ==>", res)
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
          />
        ))}
      </div>
    )
  }

  render() {
    const { alertsShown } = this.state

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
            <div style={styles.btnContainer}>
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
            {this.state.loadingAlerts ? "Loading..." : this.renderAlerts()}
            {this.state.loadingAlerts ? " " : this.renderAlertEditor()}
          </div>
        </div>
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
    paddingRight: `7rem`,
    marginTop: `0.5rem`,
    textAlign: `right`
  },
  button: {
    width: `14rem`
  }
}
