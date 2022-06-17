
import { useEffect, useState } from "react"
import { getWatchList } from "../funds/FundManager"

export const WatchList = () => {
    const [funds, setFunds] = useState()
    
    // Fetch the current user's watch list
    useEffect(() => {
        getWatchList()
        .then((d) => setFunds(d))
    },
    [])
    
    // Render that list to the DOM
    return (
        <>
        <article className="list_container">
            {funds?.map((f) => {
                return <div key={`fund--${f.id}`}> {f.name}</div>
            })}
            </article>
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