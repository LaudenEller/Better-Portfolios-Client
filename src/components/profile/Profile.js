import { useEffect, useState } from "react"
import { User } from "../users/User"
import { useParams } from "react-router-dom"
import { RecList } from "../recommendations/RecommendationList"
import { getUser } from "../users/UserManager"
import { deleteRecommendation, deleteRecommendations, getRecommendations } from "../recommendations/RecommendationManager"
import { updateUser } from "../users/UserManager"
import { getWatchList, watchFund } from "../funds/FundManager"
import { Box, DialogTitle, Typography } from "@mui/material"

export const Profile = () => {

    // const { userId } = useParams() # HELP: Currently using the backend to 
    // return the current user's profile regardless of the PK, 
    // can I use useParams to replace that system while the url is /profile? 
    // Should I change the url to /users?

    const [user, setUser] = useState()
    const [recs, setRecs] = useState()
    // Handles rendering of the update user form
    const [editForm, setEditForm] = useState(false)
    // Handles rendering of the user's recommendations
    const [refreshRecs, setRefreshRecs] = useState(false)
    // Handles rendering of the user's profile
    const [refreshUser, setRefreshUser] = useState(false)


    useEffect(
        () => {
            getUser(1)
                .then(d => setUser(d))
        },
        []
    )


    useEffect(() => {
        getRecommendations()
            .then((d => setRecs(d)))
    },
        [])

    useEffect(
        () => {
            getUser(1) // Backend returns current user regardless of pk, so 1 = foo
                .then(d => setUser(d))
        },
        [refreshUser]
    )

    useEffect(() => {
        getRecommendations()
            .then((d => setRecs(d)))
    },

        // Observe refresh state to rerender jsx with the updated recs from db # HELP: 
        // Is it true that when refreshRecs goes from false to true, 
        // this useEffect will invoke just the same as true to false?

        [refreshRecs])

    const HandleReject = (recId) => {
        // Delete Rec
        deleteRecommendation(recId)
            // Invoke Refresh
            .then(setRefreshRecs(!refreshRecs))
    }

    const HandleWatch = (rec) => {
        watchFund(rec.fund.id)
            .then(deleteRecommendation(rec.id))
            .then(setRefreshRecs(!refreshRecs))
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
        <>
            <Box className="page_content_box">
                <Box className="page_title_box">
                    <h1>Portfolio</h1>
                </Box>
                <Box className="page_separator_box">
                    <hr className="page_separator" />
                </Box>
                <Box>
                    {/* // Render the user's profile */}
                    {/* Pass refresh state, user, setRefresh, to User */}
                    <User ChangeUserState={ChangeUserState} UpdateUser={UpdateUser} user={user} editForm={editForm} setEditForm={setEditForm} />
                </Box>
                <Box>
                    {/* // Render the RecList */}
                    {/* Pass refresh state, setRefresh,  to RecList */}
                    <RecList recs={recs} refreshRecs={refreshRecs} setRefreshRecs={setRefreshRecs} HandleWatch={HandleWatch} HandleReject={HandleReject} />
                </Box>
            </Box>
        </>
    )
}


// When a user click on the "watch" button
    // The associated fund should get added to the user's watch list and the rec should disappear from the list
// When the user clicks on the "decline" button
    // The rec should get removed from the db and list