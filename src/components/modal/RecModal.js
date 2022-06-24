// This modal will accept openRec state, fundId, and return rec form
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #7db343',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export const RecModal = ({ content, recId, handleOpen, handleRecFund, openRec, }) => {
    // const [open, setOpen] = useState(false);
    const [rec, updateRec] = useState(
        {
            fundId: parseInt(`${recId}`),
            user: 0,
            note: ""
        }
    )

    // get users === content (which is an array)
    // print form
    // select box of users
    // note
    // button
    // When button is clicked
    // send new rec to db
    // close modal

    return (
        <>
            {/* <Button onClick={handleOpen}>Recommend Fund</Button> */}
            <Modal
                hideBackdrop
                open={openRec}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Recommend</h2>
                    <form>
                        <fieldset>
                            <div>
                                <select
                                    id="user_select"
                                    name="select"
                                    placeholder="Users"
                                    required
                                    autoFocus
                                    className="form-control"
                                    value={rec.user}
                                    onChange={(evt) => {
                                        const copy = { ...rec }
                                        copy.user = parseInt(evt.target.value)
                                        updateRec(copy)
                                    }
                                    }
                                >
                            <option value={0}>Pick a user</option>
                            {content?.map((user) => {
                                return <option value={user.id}>{user.username}</option>
                            })}</select>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <input
                                    required
                                    type="text" id="note"
                                    className="form-control"
                                    placeholder="Note"
                                    value={rec.note}
                                    onChange={
                                        (e) => {
                                            const copy = { ...rec }
                                            copy.note = e.target.value
                                            updateRec(copy)
                                        }
                                    }
                                />
                            </div>
                        </fieldset>
                    </form>
                    <Button onClick={() => handleRecFund(rec)}>Done</Button>
                </Box>
            </Modal>
        </>
    );
}