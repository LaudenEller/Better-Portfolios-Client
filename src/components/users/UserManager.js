import { fetchIt } from "../../utils/Fetch";
import { Settings } from "../../utils/Settings";

// Export a function that fetches the current user
export const getUser = (id) => {
    // const API = "http://localhost:8000"
    return fetchIt(`${Settings.API}/users/${id}`)
}

// Export a function that fetches a list of all users
export const getUsers = () => {
    return fetchIt(`${Settings.API}/users`)
}
// Export a function that updates a user's profile
export const updateUser = (updatedUser) => {
    return fetchIt(`${Settings.API}/users/${updatedUser.id}`, "PUT", JSON.stringify(updatedUser))
  }