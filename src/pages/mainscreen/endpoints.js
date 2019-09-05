import React from "react"
import { navigate } from "gatsby"
import CssBaseline from "@material-ui/core/CssBaseline"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import Menu from "../../components/layout/menu"
import endpoints from "../../utils/endpoints"
import LinearProgress from "@material-ui/core/LinearProgress"
import Button from "@material-ui/core/Button"
import EndpointsComponent from "../../components/servers/endpoints/endpoints"
import CreateEndpointGroup from "../../components/servers/endpoints/createEndpointGroup"
import SnackbarSuccess from "../../components/snackbars/snackbarSuccess"

import { pageStyles } from "../../data/styles"

export default class Endpoints extends React.Component {
  state = {
    groupsWithEndpoints: [],
    loadingEndpoints: false,
    createGroupOpen: false,
    newGroupName: "",
    showSnackbar: false,
    snackMssg: ""
  }

  componentDidMount() {
    this.toggleLoading()
    this.loadEndpoints()
  }

  toggleLoading = () => {
    this.setState(prevState => ({
      loadingEndpoints: !prevState.loadingEndpoints
    }))
  }

  toggleSnackBar = snackMssg =>
    this.setState(prevState => ({
      showSnackbar: !prevState.showSnackbar,
      snackMssg
    }))

  resetSnackBar = () =>
    this.setState({
      showSnackbar: false
    })

  loadEndpoints = () => {
    endpoints
      .getGroupsWithEndpoints()
      .then(response => {
        this.setState({
          groupsWithEndpoints: response,
          loadingEndpoints: false
        })
      })
      .catch(error => {
        this.setState({
          groupsWithEndpoints: [],
          loadingEndpoints: false
        })
      })
  }

  toggleCreateGroupForm = () => {
    this.setState(prevState => ({
      createGroupOpen: !prevState.createGroupOpen
    }))
  }

  setNewGroupName = newGroupName => {
    this.setState({
      newGroupName
    })
  }

  addGroup = () => {
    endpoints
      .addGroup(this.state.newGroupName)
      .then(res => {
        console.log("ADDED NEW GROUP:", res)
        if (res.status === 200) {
          this.toggleCreateGroupForm()
          this.toggleSnackBar("Group added successfully!")
          this.setNewGroupName("")
        }
        this.loadEndpoints()
      })
      .catch(err => alert(err))
  }

  render() {
    const { groupsWithEndpoints, showSnackbar, snackMssg } = this.state

    const active =
      typeof window !== `undefined`
        ? localStorage.getItem("selectedServer")
          ? localStorage.getItem("selectedServer") === ""
            ? false
            : true
          : false
        : null

    return (
      <Layout>
        <SEO title="Endpoints" />
        <CssBaseline />
        <div style={styles.mainContainer}>
          <div style={styles.menuContainer}>
            <Menu path={this.props.path} active={active} />
          </div>
          <div style={styles.pageContents}>
            {this.state.loadingEndpoints ? (
              <div style={{ flexGrow: 1 }}>
                <LinearProgress />
              </div>
            ) : null}
            <div style={styles.buttonsContainer}>
              <Button
                variant="outlined"
                color="primary"
                style={styles.addBtn}
                onClick={this.toggleCreateGroupForm}
              >
                Create endpoint group
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  navigate(`/mainscreen/assign-endpoints-to-groups`)
                }
              >
                Assign endpoints to groups
              </Button>
            </div>
            <EndpointsComponent endpoints={groupsWithEndpoints} />
            {this.state.createGroupOpen ? (
              <CreateEndpointGroup
                toggleCreateGroupForm={this.toggleCreateGroupForm}
                newGroupName={this.state.newGroupName}
                setNewGroupName={this.setNewGroupName}
                addGroup={this.addGroup}
              />
            ) : null}
          </div>
        </div>
        {showSnackbar && (
          <SnackbarSuccess
            resetSnackBar={this.resetSnackBar}
            snackMssg={snackMssg}
          />
        )}
      </Layout>
    )
  }
}

const styles = {
  ...pageStyles,
  buttonsContainer: {
    marginBottom: `1rem`,
    marginLeft: `0.4rem`,
    marginTop: `0.5rem`
  },
  addBtn: {
    marginRight: `1rem`
  }
}
