import { fetchIt } from "../../utils/Fetch"
import { Settings } from "../../utils/Settings"

// Get asset classes
// Get countries
// Get ESG Concerns
// Get industries
// Get issuers
export const getIssuers = () => {
    return fetchIt(`${Settings.API}/issuers`)
}
export const getAssetClases = () => {
    return fetchIt(`${Settings.API}/assetclasses`)
}