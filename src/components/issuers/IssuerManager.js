// Get all issuers
// Get an issuer

import { fetchIt } from "../../utils/Fetch"
import { Settings } from "../../utils/Settings"

export const getIssuerList = () => {
    return fetchIt(`${Settings.API}/issuers`)
}

export const getFavorites = () => {
    return fetchIt(`${Settings.API}/issuers/favoritelist`)
}

export const unFave = (issuerId) => {
    return fetchIt(`${Settings.API}/issuers/${issuerId}/favorite`, 'DELETE')
}
export const Fave = (issuerId) => {
    return fetchIt(`${Settings.API}/issuers/${issuerId}/favorite`, 'POST')
}