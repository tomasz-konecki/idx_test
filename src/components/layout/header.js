import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import logo from "../../images/intevi-logo.png"
import { Cookies } from "react-cookie"
const cookies = new Cookies()

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
        {cookies.get("token") ? (
          <Link to="/mainscreen/dashboard">
            <img
              src={logo}
              style={{ width: `100%`, height: `100%` }}
              alt="logo"
            />
          </Link>
        ) : (
          <img
            src={logo}
            style={{ width: `100%`, height: `100%` }}
            alt="logo"
          />
        )}
      </div>

      <div>
        {cookies.get("token") ? (
          <Link to="/">
            <button
              className="login-btn"
              onClick={() => cookies.remove("token")}
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
