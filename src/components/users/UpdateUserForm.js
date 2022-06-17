// Export a function that accepts a user object, refresh state and edit state, then prints an update user form



export const UpdateUserForm = ({ user }, { refresh }, { setRefresh }, { editForm }, { setEditForm }) => {
    // handle updating a user
// add state to save updated user data

const UpdateUser = (e) => {
    // Handle updating a user
    // refresh jsx
    // close edit form
}
    // return an update form
    return (
        <>
            <div>
                <div>User: {user.first_name} {user.last_name}</div>
                <div>Username: {user.username}</div>
                {/* Add form pre-populated with user's email */}
                {/* <textarea id="email" name="email"
                    value={user.email}>
                            <textarea/> */}
                 {/* <fieldset>
                     <div className="form-group">
                         <input
                            required autoFocus
                            type="text" id="email"
                            className="form-control"
                            placeholder="add text"
                            value={form.label}
                            onChange={
                                (e) => {
                                    const copy = {...form}
                                    copy.label = e.target.value
                                    updateForm(copy)
                                }
                            }
                        />
                         */}
                            
                        </div>
                    <button onClick={UpdateUser()
                    }>Update User</button>
                
                {/* </fieldset> */}
            </>
            )
}