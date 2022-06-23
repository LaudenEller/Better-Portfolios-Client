import { Box, Button, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../users/User";
import { updateUser } from "../users/UserManager";
import "./SideDrawer.css"

export const SideDrawer = props => {
    const [isOpen, setIsOpen] = useState(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState(false)
    const [user, setUser] = useState()
    const [editForm, setEditForm] = useState(false)
    const [refreshUser, setRefreshUser] = useState(false)

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
                    <Box>
                    {/* // Render the user's profile */}
                    {/* Pass refresh state, user, setRefresh, to User */}
                    <User ChangeUserState={ChangeUserState} UpdateUser={UpdateUser} user={user} editForm={editForm} setEditForm={setEditForm} />
                </Box>

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