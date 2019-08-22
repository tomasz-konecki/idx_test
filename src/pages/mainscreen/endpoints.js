import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import Menu from "../../components/layout/menu"
import endpoints from "../../utils/endpoints"

import { pageStyles } from "../../data/styles"

export default class Endpoints extends React.Component {
  state = { endpoints: [] }

  render() {
    const active = localStorage.getItem("selectedServer")
      ? localStorage.getItem("selectedServer") === ""
        ? false
        : true
      : false

    return (
      <Layout>
        <SEO title="Endpoints" />
        <CssBaseline />
        <div style={styles.mainContainer}>
          <div style={styles.menuContainer}>
            <Menu path={this.props.path} active={active} />
          </div>
          <div style={styles.pageContents}>
            <h1>Endpoints</h1>
          </div>
        </div>
      </Layout>
    )
  }
}

const styles = {
  ...pageStyles
}
