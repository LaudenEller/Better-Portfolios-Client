import { fetchIt } from "../../utils/Fetch";
import { Settings } from "../../utils/Settings";

// Add rec
export const createRecommendation = (rec) => {
    return fetchIt(`${Settings.API}/funds/${rec.fundId}/recommend`, "POST", JSON.stringify(rec))
  }

// Remove rec
export const deleteRecommendation = (recId) => {
    return fetchIt(`${Settings.API}/funds/${recId}/recommend`, "Delete",)
  }

// Get user's recs
export const getRecommendations = () => {
    return fetchIt(`${Settings.API}/funds/reclist`)
}