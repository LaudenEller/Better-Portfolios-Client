import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getFavorites, unFave } from "../issuers/IssuerManager"


export const FavoritesList = () => {
    const [favorites, setFavorites] = useState()
    const [refreshFaves, setRefreshFaves] = useState()
    
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

    return (
        <>
       
        <Box className="page_content_box">
            <Box className="page_title_box">
                <h1>Favorite Issuers</h1>
            </Box>
            <Box className="page_separator_box">
                    <hr className="page_separator"/>
                </Box>
            <Box className="list_container">
                {favorites?.map((f) => {
                    return (<div key={`fav--${f.id}`}>
                    <Typography>{f.name}</Typography>
                    <Button variant="contained" onClick={() => HandleUnfave(f.id)}>Unfavorite.</Button>
                    </div>)
                })}
            </Box>
        </Box>
        </>
    )
}

// Fetch the current user's favorite issuers
// Render a list of those issuers to the DOM with a "remove" button
// When an issuer is clicked on
    // a popup should appear with that issuer's details and funds
        // When one of their funds are clicked on
            // a popup should appear with the fund details and a rec button
                // When the rec button is clicked
                    // a popup should appear with the rec form
                        // When the rec form is submitted
                            // the rec popup should disappear
// When the "remove" button is clicked
    // The issuer should be removed from the favorites list

// add refresh state

// add modal state

// add function that opens modal

// print the modal, and the fave list