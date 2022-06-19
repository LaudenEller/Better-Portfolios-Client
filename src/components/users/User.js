// Export a function that prints the current user's profile
import { UpdateUserForm } from "./UpdateUserForm";
import "./User.css"

// When a user clicks on the edit button
// The user's data should become editable and the button should read, "save"
// When the user clicks on the save button
//  The user's data should become uneditable and updated

export const User = ({ user, ChangeUserState, updatedUser, setUpdatedUser, UpdateUser, refreshUser, setRefreshUser, editForm, setEditForm }) => {
    // Create state to change jsx
    // Create state that opens and closes the update form
   
    
    return (<>
        {/* Create check of state that conditionally renders the update form */}
        {editForm ?
            <UpdateUserForm ChangeUserState={ChangeUserState} updatedUser={updatedUser} setUpdatedUser={setUpdatedUser} UpdateUser={UpdateUser} editForm={editForm} setEditForm={setEditForm} user={user} refresh={refreshUser} setRefresh={setRefreshUser} />
            :
            <>
                {/* When user clicks edit, render the user update form and pass it the user object*/}
                <div>
                    <div>User: {user?.first_name} {user?.last_name}</div>
                    <div>Username: {user?.username}</div>
                    <div>Email: {user?.email}</div>
                </div>
        <button onClick={
            () => {
                setEditForm(!editForm)
            }
        }>Update Email</button>
        </>
    }
    </>
    )
}