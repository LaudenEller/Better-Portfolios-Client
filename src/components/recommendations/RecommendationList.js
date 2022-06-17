// Export a function that prints the rec list for the current user
import { useState, useEffect } from "react"
import { getRecommendations } from "./RecommendationManager"

export const RecList = ({refresh, setRefresh}) => {
    const [recs, setRecs] = useState()

    useEffect(() => {
        getRecommendations()
            .then((d => setRecs(d)))
    },
        [])

    const HandleReject = (RecId) => {
        // Delete Rec
        // Invoke Refresh (or maybe update state directly)
    }

    const HandleWatch = (fundId) => {
        // Send request to watch url
        // Invoke Refresh (or maybe update state directly)
    }

    const Refresh = () => {
        // Update refresh state
        setRefresh(!refresh)
    }

    return (
        <>
            <div className="rec_section">
            <div>Funds Recommended by You</div>
            <fieldset className="form-group">
                {recs?.map((r) => {
                    return (<>
                        <div>{r.recommender}</div>
                        <button onClick={HandleReject(r.id)}>Reject</button>
                        <button onClick={HandleWatch(r.fund.id)}>Watch Fund</button>
                        </>)
                })}
            </fieldset>
            <div>Funds Recommended to You</div>
            <fieldset className="form-group">
                {recs?.map((r) => {
                    return (<>
                        <div>{r.recommendee}</div>
                        <button onClick={HandleReject(r.id)}>Reject</button>
                        <button onClick={HandleWatch(r.fund.id)}>Watch Fund</button>
                        </>)
                })}
            </fieldset>
            </div>
        </>
    )
}
