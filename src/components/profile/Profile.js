import { useEffect, useState } from "react"
import { User } from "../users/User" 
import { useParams } from "react-router-dom"
import { RecList } from "../recommendations/RecommendationList"

export const Profile = () => {
    // Add a state for refreshing the jsx

    // Add a useEffect that observes refresh state and reloads the jsx


    // Fetch the current user's profile
    const userId = useParams()
    
    // Render the user's profile
    // Render the RecList
    return (
        <>
        <User userId={userId} />
        
        {/* Pass refresh state to RecList */}
        <RecList />
        </>
    )
}


// When a user click on the "watch" button
    // The associated fund should get added to the user's watch list and the rec should disappear from the list
// When the user clicks on the "decline" button
    // The rec should get removed from the db and list