import { Box } from "@mui/system"
import React from "react"
import { useHistory } from "react-router-dom"
import { DrawerToggleButton } from "./DrawerToggler"
import "./NavBar.css"

export const NavBar = props => {
  const history = useHistory()
  return (
    <nav>
      <div>
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <h1 style={{ fontSize: "xx-large" }} onClick={() => {
          history.push({ pathname: "/" })
        }}>Better Portfolios</h1>
      </Box >
      <hr className="page_separator" />
    </nav >
  )
}
