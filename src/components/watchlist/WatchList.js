
import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getWatchList } from "../funds/FundManager"
import { getIssuer} from "../issuers/IssuerManager"
import { FundModal} from "../modal/FundModal"
import { IssuerModal } from "../modal/IssuerModal"
import { RecModal } from "../modal/RecModal"
import { createRecommendation } from "../recommendations/RecommendationManager"
import { getUsers } from "../users/UserManager"

export const WatchList = () => {
    const [funds, setFunds] = useState()
    const [open, setOpen] = useState(false);
    const [openRec, setOpenRec] = useState(false);
    const [recId, setRecId] = useState(0)
    const [openIssuer, setOpenIssuer] = useState(false);
    const [content, setContent] = useState({})
    const [users, setUsers] = useState([])
    const [issuer, setIssuer] = useState({})


    // Fetch the current user's watch list
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
            .then((i) => setIssuer(i))
            .then(() => setContent(issuer))
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

    // Render that list to the DOM
    return (
        <>
            {
                open != 0 ? <FundModal open={open} content={content} handleClose={handleClose} handleOpenRec={handleOpenRec} handleOpenIssuer={handleOpenIssuer} /> : ""
            }
            {
                openRec != 0 ? <RecModal openRec={openRec} recId={recId} content={content} handleRecFund={handleRecFund} /> : ""
            }
            {
                openIssuer != 0 ? <IssuerModal openIssuer={openIssuer} content={content} /> : ""
            }
            <Box className="page_content_box">
                <Box className="page_title_box">
                    <h1>Watched Funds</h1>
                </Box>
                <Box className="page_separator_box">
                    <hr className="page_separator" />
                </Box>
                <Box className="list_container">
                    {funds?.map((f) => {
                        return (<>
                            <Typography onClick={() => handleFundOpen(f)}>{f.name}</Typography>
                            <Typography>{f.country.country}</Typography>
                        </>)
                    })}
                </Box>
            </Box>
        </>
    )
}

// When a fund is clicked on
    // a popup should appear with the fund details and a rec button
        // When the rec button is clicked
            // a popup should appear with the rec form
                // When the rec form is submitted
                    // the rec popup should disappear
// When a fund issuer's name is clicked on
    // a popup should appear with that issuer's details and funds
        // When one of their funds are clicked on
            // a popup should appear with the fund details and a rec button
                // When the rec button is clicked
                    // a popup should appear with the rec form
                        // When the rec form is submitted
                            // the rec popup should disappear
// When a "remove" button is clicked
    // That fund should be removed from the favorites list