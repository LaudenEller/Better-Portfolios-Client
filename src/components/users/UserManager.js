import { fetchIt } from "../../utils/Fetch";
import { Settings } from "../../utils/Settings";

// Export a function that fetches the current user
export const getUser = (id) => {
    return fetchIt(`${Settings}/users/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then((res)=> res.json())
}

// Export a function that fetches a list of all users
export const getUsers = () => {
    return fetchIt(`${Settings}/users`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        } 
    })
    .then((res)=> res.json())
}
// Export a function that updates a user's profile
export const updateUser = (updatedUser) => {
    return fetchIt(`${Settings}/users/${updatedUser.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(updatedUser)
    })
  }