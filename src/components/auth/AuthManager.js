import { fetchIt } from "../../utils/Fetch"
import { Settings } from "../../utils/Settings"

export const registerUser = (user) => {
  return fetchIt(`${Settings.API}/register_user`, "POST", JSON.stringify(user))
}

export const loginUser = (user) => {
  return fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
}
