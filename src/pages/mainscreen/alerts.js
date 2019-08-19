import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import Button from "@material-ui/core/Button"
import Menu from "../../components/layout/menu"
import Alert from "../../components/alerts/alert"
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
    currentlyShownAlert: ""
  }

  componentDidMount() {
    this.setState({ loadingAlerts: true }, () => this.loadAlerts())
  }

  loadAlerts = () => {
    alerts
      .get()
      .then(response => {
        this.setState({
          alertsList: response,
          loadingAlerts: false,
          alertsShown: true
        })
      })
      .catch(error => {
        this.setState({ alertsList: [] })
      })
  }

  openAlertEditor = alert => () =>
    this.setState({
      openedAlertId: alert.id,
      openedAlertText: alert.sampletext
    })

  handleInputChange = e => this.setState({ openedAlertText: e.target.value })

  saveEdits = () => {
    this.setState({ loadingAlerts: true })
    let id = this.state.openedAlertId
    let text = this.state.openedAlertText
    text = text.replace(/\n/g, "<br>")
    alerts
      .saveEdits(text, id)
      .then(response => {
        this.setState({ alertsList: response, loadingAlerts: false })
      })
      .catch(() => {})
  }

  saveAsNew = () =>
    this.setState({
      openedAlertId: "",
      openedAlertText: ""
    })

  renderAlertEditor = () =>
    this.state.openedAlertId || !this.state.openedAlertId === "" ? (
      <div className="alertEditor">
        <div style={{ position: "relative" }}>
          <img src={fireDrillPic} alt="alert" className="alertsImageInEditor" />
          <textarea
            className="alertEditorText"
            value={this.state.openedAlertText.replace(/<br>/g, "\n")}
            onChange={this.handleInputChange}
          />
          <button className="saveEditsButton" onClick={this.saveEdits}>
            Save Edits
          </button>
          <button className="saveAsNewButton" onClick={this.saveAsNew}>
            Save As New Alert / Close
          </button>
        </div>
      </div>
    ) : null

  clearAlerts = () =>
    this.setState({ alertsShown: false }, () => alerts.clear())

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
                })
              }
            )
          : null
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
                  onClick={
                    alertsShown
                      ? this.clearAlerts
                      : () =>
                          this.setState({ loadingAlerts: true }, () =>
                            this.loadAlerts()
                          )
                  }
                >
                  Stop displaying alerts
                </Button>
              ) : (
                <Button
                  style={styles.button}
                  variant="outlined"
                  color="default"
                  disabled
                >
                  No alerts are displayed
                </Button>
              )}
            </div>
            {this.state.loadingAlerts ? "Loading..." : this.renderAlerts()}
            {this.state.loadingAlerts ? "Loading..." : this.renderAlertEditor()}
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
