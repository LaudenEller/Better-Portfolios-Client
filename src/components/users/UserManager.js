import { fetchIt } from "../../utils/Fetch";

const API = 'http://localhost:8088'

// Export a function that fetches the current user
export const getUser = (id) => {
    return fetchIt(`${API}/users/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then((res)=> res.json())
}

// Export a function that fetches a list of all users
export const getUsers = () => {
    return fetchIt(`${API}/users`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        } 
    })
    .then((res)=> res.json())
}
// Export a function that updates a user's profile
export const updateUser = (updatedUser) => {
    return fetchIt(`${API}/users/${updatedUser.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(updatedUser)
    })
  }