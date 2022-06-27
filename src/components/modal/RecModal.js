import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { createRecommendation } from '../recommendations/RecommendationManager';

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

export const RecModal = ({ content, recId, openRec, setOpenRec, }) => {
    
    // Holds rec to send to database
    const [rec, updateRec] = useState(
        {
            fundId: parseInt(`${recId}`),
            user: 0,
            note: ""
        }
    )

    const HandleClose = () => {
        setOpenRec(false);;
    };

    const HandleRecFund = (rec) => {
        setOpenRec(false)
        createRecommendation(rec)
    }

    return (
        <>
            <Modal
                open={openRec}
                onClose={HandleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box className='modal-box' sx={{ ...style }}>
                    <h2 id="modal-title">Recommend</h2>
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
                    <Button onClick={() => HandleRecFund(rec)}>Done</Button>
                </Box>
            </Modal>
        </>
    );
}