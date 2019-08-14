import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import "./home.css"

export default function Home() {
  return (
    <Layout>
      <SEO title="Home" />
      <CssBaseline />
      <div className="home-container">
        <div className="idx-title-container">
          <div className="parallelogram" />
          <h1 className="idx-title">IDX</h1>
        </div>
      </div>
    </Layout>
  )
}
