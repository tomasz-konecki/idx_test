import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import Menu from "../../components/layout/menu"

import { pageStyles } from "../../data/styles"

export default class Tuners extends React.Component {
  state = {}

  render() {
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
        <SEO title="Tuners" />
        <CssBaseline />
        <div style={styles.mainContainer}>
          <div style={styles.menuContainer}>
            <Menu path={this.props.path} active={active} />
          </div>
          <div style={styles.pageContents}>
            <h1>Tuners</h1>
          </div>
        </div>
      </Layout>
    )
  }
}

const styles = {
  ...pageStyles
}
