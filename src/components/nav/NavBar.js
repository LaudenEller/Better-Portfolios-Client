// TODO: Add a link for each page of the app
// Watch List, Profile, Favorites, Home

import { Button, Link, Typography } from "@mui/material"
import { Box } from "@mui/system"
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import React from "react"
import { useHistory } from "react-router-dom"
import "./NavBar.css"
// import "./investment.png"

export const NavBar = () => {
  const history = useHistory()
  return (
    <nav>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
        <img className="bp-logo" style={{height: "50px", width: "50px"}} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU0ZCiZvoNgLcVvfmHHK7ImQ3SpVGeB4TILg&usqp=CAU"}
          onClick={() => {
            history.push("/")
          }
          } />
        <div onClick={() => {
          history.push("/watch")
        }} style={{ textDecoration: "none", margin: "0.5em" }}>
          <Typography variant="body1" sx={{ fontSize: "1.4em" }}>
            Watch List
          </Typography></div>
        <div onClick={() => {
          history.push("/favorites")
        }} style={{ textDecoration: "none", margin: "0.5em" }}>
          <Typography variant="body1" sx={{ fontSize: "1.4em" }}>
            Favorites
          </Typography></div>
        <div onClick={() => {
          history.push("/profile")
        }} style={{ textDecoration: "none", margin: "0.5em" }}>
          <Typography variant="body1" sx={{ fontSize: "1.4em" }}>
            Profile
          </Typography></div>
        {
          localStorage.getItem("auth_token") !== null ?
            <Button variant="contained"
              sx={{
                background: "grey",
                ":hover": {
                  background: "grey"
                },
                margin: "0.5em"
              }}
              onClick={() => {
                localStorage.removeItem("auth_token")
                history.push({ pathname: "/login" })
              }}>
              Logout
            </Button>
            :
            <>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="contained"
                  sx={{
                    background: "grey",
                    ":hover": {
                      background: "grey"
                    },
                    margin: "0.1em",
                    height: "1px"
                  }}>
                  Login/Register
                </Button>
              </Link>
            </>
        }
      </Box >
      <hr/>
    </nav >
  )
}
