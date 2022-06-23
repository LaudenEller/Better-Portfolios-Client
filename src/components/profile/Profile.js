import { useEffect, useState } from "react"
import { User } from "../users/User"
import { RecList } from "../recommendations/RecommendationList"
import { getUser, getUsers } from "../users/UserManager"
import { createRecommendation, deleteRecommendation, getRecommendations } from "../recommendations/RecommendationManager"
import { updateUser } from "../users/UserManager"
import { getWatchList, unWatchFund, watchFund } from "../funds/FundManager"
import { Box, Button, Typography } from "@mui/material"
import { FundModal } from "../modal/FundModal"
import { RecModal } from "../modal/RecModal"
import { IssuerModal } from "../modal/IssuerModal"
import { Fave, getFavorites, getIssuer, unFave } from "../issuers/IssuerManager"

export const Profile = () => {

    // const { userId } = useParams() # HELP: Currently using the backend to 
    // return the current user's profile regardless of the PK, 
    // can I use useParams to replace that system while the url is /profile? 
    // Should I change the url to /users?

    const [user, setUser] = useState()
    const [recs, setRecs] = useState()
    // Handles rendering of the update user form
    // const [editForm, setEditForm] = useState(false)
    // Handles rendering of the user's recommendations
    const [refreshRecs, setRefreshRecs] = useState(false)
    // Handles rendering of the user's profile
    const [refreshUser, setRefreshUser] = useState(false)
    const [refreshFunds, setRefreshFunds] = useState(false)
    const [funds, setFunds] = useState()
    const [open, setOpen] = useState(false);
    const [openRec, setOpenRec] = useState(false);
    const [recId, setRecId] = useState(0)
    const [openIssuer, setOpenIssuer] = useState(false);
    const [content, setContent] = useState({})
    const [users, setUsers] = useState([])
    const [issuer, setIssuer] = useState({})
    const [favorites, setFavorites] = useState()
    const [refreshFaves, setRefreshFaves] = useState()
    const [faveButton, setFaveButton] = useState(true)

    useEffect(() => {
        getFavorites()
            .then(setFavorites)
    },
        [])
    useEffect(() => {
        getFavorites()
            .then(setFavorites)
    },
        [refreshFaves])

    const HandleUnfave = (IssuerId) => {
        // Delete Rec
        unFave(IssuerId)
            // Invoke Refresh
            .then(() => setRefreshFaves(!refreshFaves))
    }

    const handleFavorite = (issuerId) => {
        setFaveButton(!faveButton)
        Fave(issuerId)
        setOpenIssuer(false)
    }
    const handleUnFavorite = (issuerId) => {
        setFaveButton(!faveButton)
        unFave(issuerId)
        setOpenIssuer(false)
    }

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

    // Fetch the current user's watch list
    useEffect(() => {
        getWatchList()
            .then((d) => setFunds(d))
    },
        [])
    useEffect(() => {
        getWatchList()
            .then((d) => setFunds(d))
    },
        [refreshFunds])

    useEffect(() => {
        getUsers()
            .then(setUsers)
    },
        [])

    const handleFundOpen = (f) => {
        setContent(f)
        setOpen(!open);
    }
    const handleOpenRec = (fundId) => {
        setOpen(!open);
        setRecId(fundId)
        setContent(users)
        setOpenRec(!openRec)
    }

    const handleOpenIssuer = (x) => {
        setOpen(!open)
        getIssuer(x)
            .then((i) => setContent(i))
            // .then((i) => setIssuer(i))
            // .then(() => setContent(issuer))
            .then(() => setOpenIssuer(!openIssuer))
    };
    const handleOpenIssuer2 = (x) => {
        getIssuer(x)
            .then(() => setContent(x))
            .then(() => setOpenIssuer(!openIssuer))
    };

    const handleRecFund = (rec) => {
        setOpenRec(!openRec)
        // HELP: How come this returns from the API as "not found"?
        createRecommendation(rec)
    }

    const handleClose = () => {
        setOpen(!open);
    };

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
            .then(setRefreshFunds(!refreshFunds))
    }

    const handleUnWatch = (fundId) => {
        unWatchFund(fundId)
        .then(setRefreshFunds(!refreshFunds))
        
    }

    // // Updates state with input from the update user form
    // const ChangeUserState = (domEvent) => {
    //     const copy = { ...user }
    //     copy[domEvent.target.name] = domEvent.target.value
    //     setUser(copy)
    // }

    // // Sends updated user profile to db, refreshes the profile on the DOM and closes the edit form
    // const UpdateUser = (e) => {
    //     e.preventDefault()
    //     const updatedUser = {
    //         username: user.username,
    //         first_name: user.first_name,
    //         last_name: user.last_name,
    //         email: user.email,
    //         id: user.id
    //     }
    //     return updateUser(updatedUser)
    //         .then(() => {
    //             setRefreshUser(!refreshUser)
    //             setEditForm(!editForm)
    //         })
    // }

    return (
        <>
            {
                open != 0 ? <FundModal open={open} content={content} handleClose={handleClose} handleOpenRec={handleOpenRec} handleOpenIssuer={handleOpenIssuer} /> : ""
            }
            {
                openRec != 0 ? <RecModal openRec={openRec} recId={recId} content={content} handleRecFund={handleRecFund} /> : ""
            }
            {
                openIssuer != 0 ? <IssuerModal faveButton={faveButton} openIssuer={openIssuer} content={content} handleUnFavorite={handleUnFavorite} handleFavorite={handleFavorite} /> : ""
            }
            <Box className="all_content_box" >
                <Box className="page_title_box">
                    <h1>Profile</h1>
                </Box>
                <Box className="page_separator_box">
                    <hr className="page_separator" />
                </Box>
                <Box className="sub_content_box" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                    {/* <Box>
                    // Render the user's profile
                    Pass refresh state, user, setRefresh, to User
                    <User ChangeUserState={ChangeUserState} UpdateUser={UpdateUser} user={user} editForm={editForm} setEditForm={setEditForm} />
                </Box> */}
                    <Box>
                        {/* // Render the RecList */}
                        {/* Pass refresh state, setRefresh,  to RecList */}
                        <RecList recs={recs} refreshRecs={refreshRecs} setRefreshRecs={setRefreshRecs} HandleWatch={HandleWatch} HandleReject={HandleReject} />
                    </Box>
                    <Box className="funds_Box">
                        <h2>Watched Funds</h2>
                        {funds?.map((f) => {
                            return (
                        <Box className="fund_box"  sx={{
                            border: "1px solid black",
                            margin: "1em",
                            padding: "1em"
                        }}>
                            <Typography onClick={() => handleFundOpen(f)} sx={{fontWeight: "bold"}}>Fund:</Typography>
                            <Typography>{f.name}</Typography>
                            <Typography onClick={() => handleFundOpen(f)} sx={{fontWeight: "bold"}}>Issuer:</Typography>
                            <Typography onClick={() => handleOpenIssuer2(f.issuer.id)}>{f.issuer.name}</Typography>
                            <Typography sx={{fontWeight: "bold"}}>ESG Rating:</Typography>
                            <Typography>{f.esg_rating}</Typography>
                            <Typography sx={{fontWeight: "bold"}}>ESG Concerns:</Typography>
                            <Typography>{f.esg_concern.map((ec) => {
                                return (
                                    <Typography>{ec.concern}</Typography>
                        )
                    })}</Typography>
                    <Box key={`fav--${f.id}`}
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start"
                                }}>
                                <Button variant="contained" sx={{margin: "1em"}} onClick={() => handleUnWatch(f.id)}>Remove Fund</Button>
                            </Box>
                </Box>)})}</Box>
                <Box className="favorites_container">
                    <h2>Favorites Cos</h2>
                    {favorites?.map((f) => {
                        return (<>
                        <Box
                        sx={{
                            border: "1px solid black",
                            margin: "1em",
                            padding: "1em"
                        }}>
                            <Typography>{f.name}</Typography>
                            <Typography>{f.country.country}</Typography>
                            <Box key={`fav--${f.id}`}
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start"
                                }}>
                                <Button variant="contained" sx={{margin: "1em"}} onClick={() => HandleUnfave(f.id)}>Unfavorite.</Button>
                            </Box>
                            </Box>
                            {/* <Typography>{f.image}</Typography> HELP: How can I get the image showing in the DOM? */}
                        </>
                        )
                    })}
                    </Box>
                </Box>
                </Box>
            </>
            )
}


// When a user click on the "watch" button
    // The associated fund should get added to the user's watch list and the rec should disappear from the list
// When the user clicks on the "decline" button
    // The rec should get removed from the db and list