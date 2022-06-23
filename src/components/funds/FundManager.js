import { fetchIt } from "../../utils/Fetch"
import { Settings } from "../../utils/Settings"

// Export a function that fetches the user's watched funds
export const getWatchList = () => {
    return fetchIt(`${Settings.API}/funds/watchlist`)
}
export const watchFund = (fundId) => {
    return fetchIt(`${Settings.API}/funds/${fundId}/watch`, 'POST')
}
export const unWatchFund = (fundId) => {
    return fetchIt(`${Settings.API}/funds/${fundId}/unwatch`, 'DELETE')
}
export const getFundList = () => {
    return fetchIt(`${Settings.API}/funds`)
}
// Export a function that fetches funds matching the query params
export const filterFunds = (filterString) => {
    return fetchIt(`${Settings.API}${filterString}`)
}