import React from "react"
import './BetterPortfolios.css'
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Footer } from "./footer/Footer"

export const Investiguide = () => (
    <>
    <div className="page-container">
    <div className="content-wrap">

        <Route render={() => {
            if (localStorage.getItem("auth_token")) {
                return <>
                    <Route>
                        <NavBar />
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
)
