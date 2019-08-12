import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

import "./interface.css"

export default function Dashboard() {
  return (
    <Layout>
      <SEO title="Dashboard" />
      <div className="dashboard-container">
        <h1>DASHBOARD</h1>
      </div>
    </Layout>
  )
}
