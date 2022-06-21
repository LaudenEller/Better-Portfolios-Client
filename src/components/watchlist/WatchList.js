
import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getWatchList } from "../funds/FundManager"
import { NestedModal } from "../modal/Modal"

export const WatchList = () => {
    const [funds, setFunds] = useState()
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState({})
    
    // Fetch the current user's watch list
    useEffect(() => {
        getWatchList()
        .then((d) => setFunds(d))
    },
    [])

    const handleOpen = (issuer) => {
        setContent(issuer)
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false); 
    };
    
    // Render that list to the DOM
    return (
        <>
         {
            open != 0 ? <NestedModal open={open} content={content} handleClose={handleClose} handleOpen={handleOpen} />: ""
        }
        <Box className="page_content_box">
            <Box className="page_title_box">
                <h1>Watch List</h1>
                </Box>
                <Box className="page_separator_box">
                    <hr className="page_separator"/>
                </Box>
        <Box className="list_container">
            {funds?.map((f) => {
                return (<> 
                <Typography onClick={() => handleOpen(f)}>{f.name}</Typography>
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