import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Chip from "@material-ui/core/Chip"
import { makeStyles } from "@material-ui/core/styles"
import logo from "../../images/intevi-logo.png"
import { Cookies } from "react-cookie"
const cookies = new Cookies()

const useStyles = makeStyles(theme => ({
  chip: {
    position: `absolute`,
    left: `15.5rem`,
    bottom: `2.1rem`,
    color: `#eee`,
    background: `#0078c1`,
    fontSize: `0.7rem`
  }
}))

const Header = ({ siteTitle }) => {
  const classes = useStyles()
  const selectedServer =
    typeof window !== `undefined`
      ? localStorage.getItem("selectedServer")
      : null
  return (
    <div style={{ width: `100%`, position: `fixed`, zIndex: `10` }}>
      <header style={{ background: `#000`, position: `relative` }}>
        {selectedServer ? (
          <Chip
            label={`SELECTED SERVER: ${selectedServer}`}
            className={classes.chip}
          />
        ) : null}

        <div
          style={{
            margin: `0`,
            maxWidth: `99%`,
            height: `80px`,
            padding: `1.45rem 1.0875rem 0.8rem`,
            display: `flex`,
            justifyContent: `space-between`,
            boxSizing: `border-box`
          }}
        >
          <div style={{ width: `6.4rem`, height: `2.1rem` }}>
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

          <div style={{ transform: `translateY(-5px)` }}>
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
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
