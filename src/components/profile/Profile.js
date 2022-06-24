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
    const [user, setUser] = useState([])
    const [favorites, setFavorites] = useState()
    const [refreshFaves, setRefreshFaves] = useState()
    const [faveButton, setFaveButton] = useState(true)
    const [load, finishLoad] = useState(false)


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
                <Box className="sub_content_box" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", border: "solid 1px black", height: "600px", overflow: "hidden", backgroundColor: "#f3f6f3" }}>
                    <Box sx={{ overflow: "scroll", backgroundColor: "#f8ffff", border: "solid 1px black", marginTop: "25px", marginBottom: "25px" }}>
                        {/* Rec List Column */}
                        <RecList recs={recs} refreshRecs={refreshRecs} setRefreshRecs={setRefreshRecs} HandleWatch={HandleWatch} HandleReject={HandleReject} />
                    </Box>
                    {/* Watch List Column */}
                    <Box style={{ display: "flex", flexDirection: "column", overflow: "scroll", backgroundColor: "#f8ffff", border: "solid 1px black", marginTop: "25px", marginBottom: "25px" }} className="funds_Box">
                        <h3 style={{ alignSelf: "center" }}>Watched Funds</h3>
                        {funds?.map((f) => {
                            return (
                                <Box className="fund_box" sx={{
                                    border: "1px solid black",
                                    margin: "1em",
                                    padding: "1em",
                                    width: "300px",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    <Box className="content_box" sx={{  display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                        {/* first column box */}
                                        <Box className="column_box" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography onClick={() => handleFundOpen(f)} sx={{ fontWeight: "bold" }}>Fund:</Typography>
                                            </Box>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography onClick={() => handleFundOpen(f)} sx={{ fontWeight: "bold" }}>Issuer:</Typography>
                                            </Box>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography sx={{ fontWeight: "bold" }}>ESG Rating:</Typography>
                                            </Box>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography sx={{ fontWeight: "bold" }}>ESG Concerns:</Typography>
                                            </Box>
                                        </Box>
                                        {/* second column box */}
                                        <Box className="column_box" sx={{ display: "flex", flexDirection: "column" }}>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography sx={{ overflow: "scroll", height: "35px", maxWidth: "100px" }}>{f.name}</Typography>
                                            </Box>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography onClick={() => handleOpenIssuer2(f.issuer.id)}>{f.issuer.name}</Typography>
                                            </Box>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography>{f.esg_rating}</Typography>
                                            </Box>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography sx={{ overflow: "scroll", height: "35px", maxWidth: "100px" }}>{f.esg_concern.map((ec) => {
                                                    return (
                                                        <Typography>{ec.concern}</Typography>
                                                    )
                                                })}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    {/* Unwatch Button Box */}
                                    <Box className="button_box" key={`fav--${f.id}`}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center"
                                        }}>
                                        <Button variant="contained" sx={{ margin: "1em" }} onClick={() => handleUnWatch(f.id)}>Remove Fund</Button>
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>
                    {/* Favorites List Column */}
                    <Box style={{ display: "flex", flexDirection: "column", overflow: "scroll", backgroundColor: "#f8ffff", border: "solid 1px black", marginTop: "25px", marginBottom: "25px" }} className="favorites_container">
                        <h3 style={{ alignSelf: "center" }}>Favorites Cos</h3>
                        {favorites?.map((f) => {
                            return (<>
                                <Box
                                    sx={{
                                        border: "1px solid black",
                                        margin: "1em",
                                        padding: "1em",
                                        width: "300px",
                                        display: 'flex',
                                        flexDirection: "column",
                                        justifyContent: "space-evenly",
                                        backgroundColor: "#ffffff"
                                    }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-evenly" }} >
                                        <Typography sx={{fontWeight: "bold", fontSize: "large"}}>{f.name}</Typography>
                                        <img style={{ width: "50px", height: "50px" }} src={f.image_url} alt="boohoo" className="img-responsive" />
                                    </Box>
                                    <Box>
                                        <ul className="issuer_funds_box" sx={{ display: "flex", justifyContent: "space-evenly", padding: "5px" }}>{f?.funds?.map((fund) => {
                                            return <li>{fund.name}</li>
                                        })}</ul>
                                    </Box>
                                    <Box key={`fav--${f.id}`}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-evenly"
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