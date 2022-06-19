// Export a function that accepts a user object, refresh state and edit state, then prints an update user form



export const UpdateUserForm = ({ user, ChangeUserState, updatedUser, setUpdatedUser, UpdateUser, refresh, setRefresh, editForm, setEditForm }) => {
    // handle updating a user
    // add state to save updated user data
    

   
    // return an update form
    return (
        <>
            <div>
                <div>User: {user?.first_name} {user?.last_name}</div>
                <div>Username: {user?.username}</div>
                {/* Add form pre-populated with user's email */}
                {/* <div>
                    <textarea id="email" name="email"
                    value={user.email}>
                            <textarea/> */}
                {/* </div> */}
                <div className="form-group">
                    <fieldset>
                        <input
                            required autoFocus
                            type="text" id="email"
                            className="form-control"
                            // placeholder={user.email}
                            name="email"
                            value={user?.email}
                            onChange={
                               
                                ChangeUserState
                                
                            }
                        />


                    </fieldset>
                </div>
                <button onClick={(e) => UpdateUser(e)
                }>Update User</button>
                </div>

            </>
            )
}