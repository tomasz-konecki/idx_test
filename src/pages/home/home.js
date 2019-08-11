import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import "./home.css"

export default function Home() {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="home-container">
        <div className="idx-title-container">
          <div className="parallelogram" />
          <h1 className="idx-title">IDX</h1>
        </div>
      </div>
    </Layout>
  )
}
