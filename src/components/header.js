import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import logo from "../images/intevi-logo.png"

const Header = ({ siteTitle }) => (
  <header className="idx-gradient" style={{ background: `#000` }}>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: "92%",
        padding: `1.45rem 1.0875rem 0.8rem`,
        display: "flex",
        justifyContent: `space-between`
      }}
    >
      <div style={{ width: `9.4rem`, height: `3.1rem` }}>
        <img src={logo} style={{ width: `100%`, height: `100%` }} alt="logo" />
      </div>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
        ></Link>
      </h1>
      <div>
        {localStorage.getItem("jwt-token") ? (
          <Link to="/">
            <button
              className="login-btn"
              onCLick={() => localStorage.removeItem("jwt-token")}
            >
              Log out
            </button>
          </Link>
        ) : (
          <Link to="/auth/login">
            <button className="login-btn">Log in</button>
          </Link>
        )}
      </div>
    </div>
    <div className="idx-gradient" style={{ height: `10px` }}></div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
