import React, { useState } from "react"
import './BetterPortfolios.css'
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Footer } from "./footer/Footer"
import { SideDrawer } from "./nav/SideDrawer"
import { Backdrop } from "./nav/backdrop/Backdrop"

export const BetterPortfolios = () => {
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false)

    const DrawerTogglerHandler = () => {
        setSideDrawerOpen(!sideDrawerOpen)
      }
    
      const BackdropClickHandler = () => {
        setSideDrawerOpen(false)
      }
      
      let backdrop = null
  
  if (sideDrawerOpen === true) {
    backdrop = <Backdrop click={BackdropClickHandler} />
  }

    return (<>
    <div className="page-container">
    <div className="content-wrap">

        <Route render={() => {
            if (localStorage.getItem("auth_token")) {
                return <>
                 <Route>
                 {/* passing a reference to the toggle function with props to navbar */}
                <NavBar drawerClickHandler={DrawerTogglerHandler} />
                <SideDrawer show={sideDrawerOpen} setSideDrawerOpen={setSideDrawerOpen} sideDrawerOpen={sideDrawerOpen}/>
                {backdrop}
                <ApplicationViews />
                <Footer/>
                </Route>    
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login">
            <Login />
        </Route>

        <Route path="/register">
            <Register />
        </Route>
        </div>
        </div>
    </>
)}