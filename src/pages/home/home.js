import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import { pageStyles } from "../../data/styles"
import "./home.css"

export default function Home() {
  return (
    <Layout>
      <SEO title="Home" />
      <CssBaseline />
      <div style={styles.mainContainer}>
        <div className="idx-title-container">
          <div className="parallelogram" />
          <h1 className="idx-title">IDX</h1>
        </div>
      </div>
    </Layout>
  )
}

const styles = {
  ...pageStyles,
  titleContainer: {
    width: `76%`
  },
  idxTitle: {
    fontSize: `200px`,
    margin: `120px`,
    textAlign: `center`,
    color: `#ddd`,
    textShadow: `2px 2px 5px #999`
  }
}
