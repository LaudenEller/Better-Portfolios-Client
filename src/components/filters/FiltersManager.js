import { fetchIt } from "../../utils/Fetch"
import { Settings } from "../../utils/Settings"

// Get asset classes
// Get countries
// Get ESG Concerns
// Get ESG Ratings
export const getCountries = () => {
    return fetchIt(`${Settings.API}/countries`)
}
export const getEsgConcerns = () => {
    return fetchIt(`${Settings.API}/esgconcerns`)
}
// Get industries
export const getIndustries = () => {
    return fetchIt(`${Settings.API}/industries`)
}
// Get issuers
export const getIssuers = () => {
    return fetchIt(`${Settings.API}/issuers`)
}
export const getAssetClases = () => {
    return fetchIt(`${Settings.API}/assetclasses`)
}
export const searchName = (searchText) => {
    return fetchIt(`${Settings.API}/funds?name=${searchText}`)
}