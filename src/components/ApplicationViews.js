import React from "react"
import { Route } from "react-router-dom"
import { FavoritesList } from "./favorites/Favorites"
import { Home } from "./home/Home"
import { Profile } from "./profile/Profile"
import { RecList } from "./recommendations/RecommendationList"
import { WatchList } from "./watchlist/WatchList"

export const ApplicationViews = () => {
    return (<>
    <Route exact path="/">
        <Home />
    </Route>
    <Route exact path="/profile">
        <Profile />
    </Route>
    <Route exact path="/watch">
        <WatchList />
    </Route>
    <Route exact path="/favorites">
        <FavoritesList />
    </Route>
    </>
)}
