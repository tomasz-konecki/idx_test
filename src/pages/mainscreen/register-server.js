import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import Menu from "../../components/layout/menu"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import { pageStyles } from "../../data/styles"
import idtservers from "../../utils/idtservers"
import CheckCircle from "@material-ui/icons/CheckCircle"
import Close from "@material-ui/icons/Close"

export default class RegisterServer extends React.Component {
  state = {
    productKey: "",
    serverName: "",
    successFlag: false,
    failureFlag: false
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    const { productKey, serverName } = this.state

    idtservers
      .add(productKey, serverName)
      .then(res => {
        console.log(res)
        res.status === 200
          ? this.displaySuccess()
          : alert("Something went wrong...")
      })
      .catch(err => this.displayFailure())
  }

  displaySuccess = () => {
    this.setState(
      {
        productKey: "",
        serverName: "",
        successFlag: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            successFlag: false
          })
        }, 3000)
      }
    )
  }

  displayFailure = () => {
    this.setState(
      {
        failureFlag: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            failureFlag: false
          })
        }, 3000)
      }
    )
  }

  componentDidMount() {
    this.setState({
      productKey: "",
      serverName: ""
    })
  }

  render() {
    const active = localStorage.getItem("selectedServer")
      ? localStorage.getItem("selectedServer") === ""
        ? false
        : true
      : false

    const { successFlag, failureFlag } = this.state

    return (
      <Layout>
        <SEO title="Register New IDT Server" />
        <CssBaseline />
        <div style={styles.mainContainer}>
          <div style={styles.menuContainer}>
            <Menu path={this.props.path} active={active} />
          </div>
          <div style={styles.pageContents}>
            <Paper style={styles.contentsContainer}>
              <div style={styles.titleContainer}>
                <span style={styles.title}>
                  Register a new IDT server by typing in its product key and
                  name:
                </span>
              </div>
              <form style={styles.formContainer} autoComplete="off">
                <TextField
                  id="standard-multiline-flexible"
                  label="PRODUCT KEY"
                  name="productKey"
                  multiline
                  rowsMax="4"
                  value={this.state.productKey}
                  onChange={e => this.handleChange(e)}
                  style={styles.textField}
                  margin="normal"
                />
                <TextField
                  id="standard-multiline-flexible"
                  label="SERVER NAME"
                  name="serverName"
                  multiline
                  rowsMax="4"
                  value={this.state.serverName}
                  onChange={e => this.handleChange(e)}
                  style={styles.textField}
                  margin="normal"
                />
              </form>
              <div style={styles.btnContainer}>
                <div
                  style={{
                    ...styles.messageContainer,
                    opacity: successFlag || failureFlag ? 1 : 0
                  }}
                >
                  {successFlag ? (
                    <span style={{ color: `#00a805` }}>
                      <CheckCircle style={{ fontSize: `16px` }} />{" "}
                      <span
                        style={{
                          display: `inline-block`,
                          transform: `translateY(-3px)`,
                          letterSpacing: `1px`
                        }}
                      >
                        Server registered successfully!
                      </span>
                    </span>
                  ) : failureFlag ? (
                    <span style={{ color: `crimson` }}>
                      <Close
                        style={{
                          fontSize: `13px`,
                          background: `crimson`,
                          borderRadius: `50%`,
                          color: `whitesmoke`
                        }}
                      />
                      <span
                        style={{
                          display: `inline-block`,
                          transform: `translateY(-2px)`,
                          letterSpacing: `1px`
                        }}
                      >
                        &nbsp;Server with this product key already exists.
                      </span>
                    </span>
                  ) : null}
                </div>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleSubmit}
                  disabled={
                    this.state.productKey === "" || this.state.serverName === ""
                  }
                >
                  Register
                </Button>
              </div>
            </Paper>
          </div>
        </div>
      </Layout>
    )
  }
}

const styles = {
  ...pageStyles,
  contentsContainer: {
    width: `40rem`,
    marginTop: `1rem`,
    marginLeft: `1.3rem`,
    paddingBottom: `2rem`,
    background: `smokewhite`
  },
  titleContainer: {
    paddingTop: `0.7rem`,
    paddingBottom: `0.8rem`,
    paddingLeft: `2rem`,
    background: `#ccc`,
    borderBottom: `1px solid #acacac`
  },
  title: {
    color: `#444`,
    textTransform: `uppercase`,
    fontSize: `0.73rem`
  },
  formContainer: {
    display: `flex`,
    justifyContent: `space-between`,
    paddingTop: `0.8rem`,
    paddingLeft: `2rem`,
    paddingRight: `2rem`
  },
  textField: {
    marginRight: 20,
    width: 280
  },
  btnContainer: {
    display: `flex`,
    justifyContent: `space-between`,
    paddingRight: `3rem`,
    paddingTop: `2rem`
  },
  messageContainer: {
    paddingLeft: `2rem`,
    paddingTop: 10,
    fontSize: `0.7rem`,
    textTransform: `uppercase`
  }
}
