import React from "react"
import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import Menu from "../../components/layout/menu"
import CssBaseline from "@material-ui/core/CssBaseline"
import LogoIDX from "../../assets/img/logo-idx.png"
import { pageStyles } from "../../data/styles"

export default function Dashboard(props) {
  console.log("DASHBOARD PROPS:", props)
  return (
    <Layout>
      <SEO title="Dashboard" />
      <CssBaseline />
      <div style={styles.mainContainer}>
        <div style={styles.menuContainer}>
          <Menu path={props.path} />
        </div>
        <div style={styles.titleContainer}>
          {/* <h1 className="idx-title" style={styles.idxTitle}>
            IDX
          </h1> */}
          <img src={LogoIDX} alt="IDX Logo" />
        </div>
      </div>
    </Layout>
  )
}

const styles = {
  ...pageStyles,
  titleContainer: {
    // width: `76%`,
    marginTop: `100px`,
    marginLeft: `auto`,
    marginRight: `auto`
  },
  idxTitle: {
    fontSize: `200px`,
    margin: `120px`,
    textAlign: `center`,
    color: `#ddd`,
    textShadow: `2px 2px 5px #999`
  }
}
