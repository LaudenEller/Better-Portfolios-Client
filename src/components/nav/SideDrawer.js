import { Box, Button, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../users/User";
import { getUser, updateUser } from "../users/UserManager";
import "./SideDrawer.css"

export const SideDrawer = ({show, setSideDrawerOpen, sideDrawerOpen}) => {
    const [user, setUser] = useState()
    const [editForm, setEditForm] = useState(false)
    const [refreshUser, setRefreshUser] = useState(false)

    useEffect(
        () => {
            getUser(1)
                .then(d => setUser(d))
        },
        []
    )

    const history = useHistory()

    let drawerClasses = 'sidedrawer'
    if (show) {
        drawerClasses = 'sidedrawer open'
    }

    // Updates state with input from the update user form
    const ChangeUserState = (domEvent) => {
        const copy = { ...user }
        copy[domEvent.target.name] = domEvent.target.value
        setUser(copy)
    }

    // Sends updated user profile to db, refreshes the profile on the DOM and closes the edit form
    const UpdateUser = (e) => {
        e.preventDefault()
        const updatedUser = {
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            id: user.id
        }
        return updateUser(updatedUser)
            .then(() => {
                setRefreshUser(!refreshUser)
                setEditForm(!editForm)
            })
    }

    return (
        <nav style={{ display: "flex" }} className={drawerClasses}>
            <Box className="content_box" sx={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", height: "100%" }}>
                        <h1 style={{ alignSelf: "center", marginTop: "35px", marginBottom: "400px" }}
                            onClick={() => {
                                setSideDrawerOpen(!sideDrawerOpen)
                                history.push({ pathname: "/profile" })
                            }}>
                            Profile
                        </h1>
                        <Box>
                            {/* // Render the user's profile */}
                            {/* Pass refresh state, user, setRefresh, to User */}
                            <User ChangeUserState={ChangeUserState} UpdateUser={UpdateUser} user={user} editForm={editForm} setEditForm={setEditForm} />
                        </Box>
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
            </Box >
        </nav >
    )
}