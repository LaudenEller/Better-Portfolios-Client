// Export a function that prints the current user's profile
import { useEffect, useState } from "react";
import { UpdateUserForm } from "./UpdateUserForm";
import "./User.css"
import { getUser } from "./UserManager";

// When a user clicks on the edit button
// The user's data should become editable and the button should read, "save"
// When the user clicks on the save button
//  The user's data should become uneditable and updated

export const User = ({ userId }, { refresh }, { setRefresh }) => {
    const { user, setUser } = useState()
    // Create state to change jsx
    // Create state that opens and closes the update form
    const [editForm, setEditForm] = useState(false)

    useEffect(
        () => {
            getUser(userId)
                .then(d => setUser(d))
        },
        []
    )

    const HandleEdit = () => {
        // Update state that controls jsx render
    }

    const HandleUpdate = () => {
        // Send PUT to /users
        // Update state that controls jsx render

    }

    return (<>
        {/* Create check of state that conditionally renders the update form */}
        {editForm ?
            <UpdateUserForm editForm={editForm} setEditForm={setEditForm} user={user} />
            :
            <>
                {/* When user clicks edit, render the user update form and pass it the user object*/}
                <div>
                    <div>User: {user.first_name} {user.last_name}</div>
                    <div>Username: {user.username}</div>
                    <div>Email: {user.email}</div>
                </div>
        <button onClick={
            () => {
                setEditForm(!editForm)
            }
        }>Edit</button>
        </>
    }
    </>
    )
}