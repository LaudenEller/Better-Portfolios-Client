import { fetchIt } from "../../utils/Fetch";
import { Settings } from "../../utils/Settings";

// Add rec
export const createRecommendations = (recommendation) => {
    return fetchIt(`${Settings}/recommendations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
  },
  body: JSON.stringify(recommendation)
  })
      .then((res) => res.json())
  }

// Remove rec
export const deleteRecommendations = (recommendationsId) => {
    return fetchIt(`${Settings}/recommendations/${recommendationsId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
  }

// Get user's recs
export const getRecommendations = () => {
    return fetchIt(`${Settings.API}/recommendations`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
  }})
}