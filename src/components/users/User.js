// Export a function that prints the current user's profile
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./User.css"
import { getUser } from "./UserManager";

export const User = (user) => {
    const { user, setUser } = useState()
    const { userId } = useParams()

    useEffect(
        () => {
            getUser(userId)
                .then(d => setUser(d))
        }
    )


    return <>
        <div>
            <div>User: {user.first_name} {user.last_name}</div>
            <div>Username: {user.username}</div>
            <div>Email: {user.email}</div>
        </div>
    </>
}