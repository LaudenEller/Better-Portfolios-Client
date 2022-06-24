import React from "react"
import { useHistory } from "react-router-dom"
import { DrawerToggleButton } from "./DrawerToggler"
import "./NavBar.css"

export const NavBar = props => {
  const history = useHistory()
  return (
    <nav className="nav">
        <DrawerToggleButton click={props.drawerClickHandler} />
      <hr className="page_separator" />
    </nav >
  )
}
