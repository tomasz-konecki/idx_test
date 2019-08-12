import React from "react"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import Menu from "../../components/layout/menu"

import { pageStyles } from "../../data/styles"

export default class AssignTemplatesToGroups extends React.Component {
  state = {}

  render() {
    return (
      <Layout>
        <SEO title="Assign Templates To Groups" />
        <div style={styles.mainContainer}>
          <div style={styles.menuContainer}>
            <Menu path={this.props.path} />
          </div>
          <div style={styles.pageContents}>
            <h1>Assign Templates To Groups</h1>
          </div>
        </div>
      </Layout>
    )
  }
}

const styles = {
  ...pageStyles
}
