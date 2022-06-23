import { useEffect, useState } from "react"
import { RecList } from "../recommendations/RecommendationList"
import { getUser, getUsers } from "../users/UserManager"
import { createRecommendation, deleteRecommendation, getRecommendations } from "../recommendations/RecommendationManager"
import { getWatchList, unWatchFund, watchFund } from "../funds/FundManager"
import { Box, Button, Typography } from "@mui/material"
import { FundModal } from "../modal/FundModal"
import { RecModal } from "../modal/RecModal"
import { IssuerModal } from "../modal/IssuerModal"
import { Fave, getFavorites, getIssuer, unFave } from "../issuers/IssuerManager"

export const Profile = () => {
    const [recs, setRecs] = useState()
    const [refreshRecs, setRefreshRecs] = useState(false)
    const [refreshUser, setRefreshUser] = useState(false)
    const [refreshFunds, setRefreshFunds] = useState(false)
    const [funds, setFunds] = useState()
    const [open, setOpen] = useState(false);
    const [openRec, setOpenRec] = useState(false);
    const [recId, setRecId] = useState(0)
    const [openIssuer, setOpenIssuer] = useState(false);
    const [content, setContent] = useState({})
    const [users, setUsers] = useState([])
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


    useEffect(() => {
        getRecommendations()
            .then((d => setRecs(d)))
    },
        [])

    useEffect(
        () => {
            getUser(1)
                .then(d => setUser(d))
        },
        [refreshUser]
    )

    useEffect(() => {
        getRecommendations()
            .then((d => setRecs(d)))
    },
        [refreshRecs])

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

    const HandleUnfave = (IssuerId) => {
        unFave(IssuerId)
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
            .then(() => setOpenIssuer(!openIssuer))
    };
    const handleOpenIssuer2 = (x) => {
        getIssuer(x)
            .then(() => setContent(x))
            .then(() => setOpenIssuer(!openIssuer))
    };

    const handleRecFund = (rec) => {
        setOpenRec(!openRec)
        createRecommendation(rec)
    }

    const handleClose = () => {
        setOpen(!open);
    };

    const HandleReject = (recId) => {
        deleteRecommendation(recId)
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
                <Box className="sub_content_box" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                    <Box>
                        {/* // Render the RecList */}
                        {/* Pass refresh state, setRefresh,  to RecList */}
                        <RecList recs={recs} refreshRecs={refreshRecs} setRefreshRecs={setRefreshRecs} HandleWatch={HandleWatch} HandleReject={HandleReject} />
                    </Box>
                    <Box style={{ display: "flex", flexDirection: "column", }} className="funds_Box">
                        <h2 style={{ alignSelf: "center" }}>Watched Funds</h2>
                        {funds?.map((f) => {
                            return (
                                <Box className="fund_box" sx={{
                                    border: "1px solid black",
                                    margin: "1em",
                                    padding: "1em",
                                    width: "300px"
                                }}>
                                    <Typography onClick={() => handleFundOpen(f)} sx={{ fontWeight: "bold" }}>Fund:</Typography>
                                    <Typography>{f.name}</Typography>
                                    <Typography onClick={() => handleFundOpen(f)} sx={{ fontWeight: "bold" }}>Issuer:</Typography>
                                    <Typography onClick={() => handleOpenIssuer2(f.issuer.id)}>{f.issuer.name}</Typography>
                                    <Typography sx={{ fontWeight: "bold" }}>ESG Rating:</Typography>
                                    <Typography>{f.esg_rating}</Typography>
                                    <Typography sx={{ fontWeight: "bold" }}>ESG Concerns:</Typography>
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
                                        <Button variant="contained" sx={{ margin: "1em" }} onClick={() => handleUnWatch(f.id)}>Remove Fund</Button>
                                    </Box>
                                </Box>)
                        })}</Box>
                    <Box style={{ display: "flex", flexDirection: "column", }} className="favorites_container">
                        <h2 style={{ alignSelf: "center" }}>Favorites Cos</h2>
                        {favorites?.map((f) => {
                            return (<>
                                <Box
                                    sx={{
                                        border: "1px solid black",
                                        margin: "1em",
                                        padding: "1em",
                                        width: "300px"
                                    }}>
                                    <Typography>{f.name}</Typography>
                                    <Typography>{f.country.country}</Typography>
                                    <Box key={`fav--${f.id}`}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "flex-start"
                                        }}>
                                        <Button variant="contained" sx={{ margin: "1em" }} onClick={() => HandleUnfave(f.id)}>Unfavorite.</Button>
                                    </Box>
                                </Box>
                            </>
                            )
                        })}
                    </Box>
                </Box>
            </Box>
        </>
    )
}