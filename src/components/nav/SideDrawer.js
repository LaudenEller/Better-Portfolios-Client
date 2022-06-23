import { Box, Button, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SideDrawer.css"

export const SideDrawer = props => {
    const [isOpen, setIsOpen] = useState(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState(false)

const history = useHistory()

    const TogglePopup = () => {
        setIsOpen(!isOpen)
    }

    const ToggleDeletePopup = () => {
        setDeleteIsOpen(!deleteIsOpen)
    }

    let drawerClasses = 'sidedrawer'
    if (props.show) {
        drawerClasses = 'sidedrawer open'
    }

    return (
            <nav className={drawerClasses}>
                <Box>
                {/* <div onClick={() => {
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
                    </Typography></div> */}

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
            </nav >
    )
}