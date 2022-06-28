import { useEffect, useState } from "react"
import { RecList } from "../recommendations/RecommendationList"
import { getUser, getUsers } from "../users/UserManager"
import { getRecommendations } from "../recommendations/RecommendationManager"
import { getWatchList } from "../funds/FundManager"
import { Box } from "@mui/material"
import { FundModal } from "../modal/FundModal"
import { RecModal } from "../modal/RecModal"
import { IssuerModal } from "../modal/IssuerModal"
import { getFavorites } from "../issuers/IssuerManager"
import { WatchList } from "../watchlist/WatchList"
import { FavoritesList } from "../favorites/Favorites"

export const Profile = () => {
    // DB Resources
    const [recs, setRecs] = useState()
    const [funds, setFunds] = useState()
    const [users, setUsers] = useState([])
    const [favorites, setFavorites] = useState()

    // Refreshes resources
    const [refreshRecs, setRefreshRecs] = useState(false)
    const [refreshFunds, setRefreshFunds] = useState(false)
    const [refreshFaves, setRefreshFaves] = useState(false)

    // Modals and buttons
    const [open, setOpen] = useState(false);
    const [openRec, setOpenRec] = useState(false);
    const [openIssuer, setOpenIssuer] = useState(false);
    const [faveButton, setFaveButton] = useState(true)
    
    // Passes fund id to rec modal
    const [recId, setRecId] = useState(0)
    
    // Passes content to modals
    const [content, setContent] = useState({})

    // Add ternary operator that loads "loading div" until resources arrive from db
        // Add animation to initial and subsequent renders
    // const [load, finishLoad] = useState(false)

    // Initial render
    useEffect(() => {
        getFavorites()
            .then(setFavorites)
    },
        [])
    useEffect(() => {
        getRecommendations()
            .then((d => setRecs(d)))
    },
        [])

    useEffect(() => {
        getWatchList()
            .then((d) => setFunds(d))
    },
        [])
    useEffect(() => {
        getUsers()
            .then(setUsers)
    },
        [])

    // Refreshing resources from db
    useEffect(() => {
        getFavorites()
            .then(setFavorites)
    },
        [refreshFaves])
    useEffect(() => {
        getRecommendations()
            .then((d => setRecs(d)))
    },
        [refreshRecs])
    useEffect(() => {
        getWatchList()
            .then((d) => setFunds(d))
    },
        [refreshFunds])


    return (
        <>
            {/* Modals */}
            {
                open != 0 ? <FundModal open={open} setOpen={setOpen} openRec={openRec} setOpenRec={setOpenRec} setRecId={setRecId} refreshFunds={refreshFunds} setRefreshFunds={setRefreshFunds} refreshRecs={refreshRecs} setRefreshRecs={setRefreshRecs} openIssuer={openIssuer} setOpenIssuer={setOpenIssuer} content={content} setContent={setContent} users={users} /> : ""
            }
            {
                openRec != 0 ? <RecModal openRec={openRec} setOpenRec={setOpenRec} recId={recId} content={content} /> : ""
            }
            {
                openIssuer != 0 ? <IssuerModal faveButton={faveButton} setFaveButton={setFaveButton} openIssuer={openIssuer} setOpenIssuer={setOpenIssuer} content={content} /> : ""
            }
            {/* JSX */}
            <Box className="all_content_box" >
                <Box className="sub_content_box" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", border: "solid 1px black", height: "600px", overflow: "hidden", backgroundColor: "#f3f6f3" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", overflow: "scroll", backgroundColor: "#f8ffff", border: "solid 1px black", marginTop: "25px", marginBottom: "25px" }}>
                        {/* Rec List Column */}
                        <RecList recs={recs} refreshRecs={refreshRecs} setRefreshRecs={setRefreshRecs} refreshFunds={refreshFunds} setRefreshFunds={setRefreshFunds} />
                    </Box>
                    {/* Watch List Column */}
                    <Box sx={{ display: "flex", flexDirection: "column", overflow: "scroll", backgroundColor: "#f8ffff", border: "solid 1px black", marginTop: "25px", marginBottom: "25px" }} className="funds_Box">
                        <WatchList funds={funds} open={open} openIssuer={openIssuer} refreshFunds={refreshFunds} setContent={setContent} setOpen={setOpen} setOpenIssuer={setOpenIssuer} setRefreshFunds={setRefreshFunds} />
                    </Box>
                    {/* Favorites List Column */}
                    <Box sx={{ display: "flex", flexDirection: "column", overflow: "scroll", backgroundColor: "#f8ffff", border: "solid 1px black", marginTop: "25px", marginBottom: "25px" }} className="favorites_container">
                        <FavoritesList favorites={favorites} setRefreshFaves={setRefreshFaves} refreshFaves={refreshFaves} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}