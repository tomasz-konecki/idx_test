import React from "react"
import "../../../node_modules/text-spinners/spinners.css"

export default function Loader() {
  return (
    <div
      style={{
        marginTop: `-3rem`,
        marginLeft: `1rem`,
        color: `#555`
      }}
    >
      <span style={{ fontStyle: `italic` }}>LOADING </span>
      <span className="loading" style={{ fontSize: `2rem` }}></span>
    </div>
  )
}
