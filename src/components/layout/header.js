import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import logo from "../../images/intevi-logo.png"
import { Cookies } from "react-cookie"
const cookies = new Cookies()

const Header = ({ siteTitle }) => {
  const selectedServer = localStorage.getItem("selectedServer")
  return (
    <header
      className="idx-gradient"
      style={{ background: `#000`, position: `relative` }}
    >
      <div
        style={{
          position: `absolute`,
          left: `15.5rem`,
          bottom: `2.1rem`,
          color: `#ddd`,
          background: `#494949`,
          paddingLeft: `0.5rem`,
          paddingRight: `0.5rem`,
          borderRadius: `3px`
        }}
      >
        {selectedServer ? (
          <span>
            <span style={{ fontSize: `13px` }}>SELECTED SERVER:&nbsp;</span>
            <span style={{ fontSize: `1rem` }}>{selectedServer}</span>
          </span>
        ) : (
          ""
        )}
      </div>
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
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
