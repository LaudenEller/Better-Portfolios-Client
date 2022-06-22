import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { getUsers } from '../users/UserManager';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


// const ChildModal1 = () => {
//     const [open, setOpen] = useState(false);
//     const handleOpen = () => {
//         setOpen(true);
//     };
//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <>
//             <Button onClick={handleOpen}>Open Child Modal</Button>
//             <Modal
//                 hideBackdrop
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="child-modal-title"
//                 aria-describedby="child-modal-description"
//             >
//                 <Box sx={{ ...style, width: 200 }}>
//                     <h2 id="child-modal-title">Text in a child modal</h2>
//                     <p id="child-modal-description">
//                         Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                     </p>
//                     <Button onClick={handleClose}>Close Child Modal</Button>
//                 </Box>
//             </Modal>
//         </>
//     );
// }


// TODO: Write individual modals for each use case

// This modal will accept openRec state, fundId, and return rec form

// This modal will accept openIssuer state, issuerId, and return issuer details page and associated buttons

// This modal will accept openFund state and return the fund details page and associated action buttons
    // Rec button resets the openFund state, saves fundId to state, and flips openRec state
    // Watch button resets the openFund state, and makes a watch fetch call
    // See issuer button resets the openFund state, saves issuerId to state, and flips openIssuer state

export const FundModal = ({ open, handleOpenRec, handleOpenIssuer, handleClose, content }) => {

    return (<>
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                    <Box sx={{ ...style, display: "flex", flexDirection: "column", width: 400 }}>
                        <h2 style={{ alignSelf: "center" }} id="parent-modal-title">{content?.name}</h2>
                        <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <Box style={{ alignSelf: "flex-start" }} >
                                <img style={{ width: "150px", height: "250px" }} src={content.image_url} alt="boohoo" className="img-responsive" />
                            </Box>
                            <Box>
                                <p>Issuer: {content.issuer.name}</p>
                                <p>Asset Class: {content.asset_class.asset_class}</p>
                                <p>Industry: {content.industry.industry}</p>
                                <p>Domicile: {content.country.country}</p>
                                <p id="parent-modal-description">Fund Rating: {content?.asset_rating}</p>
                                <p>ESG Rating: {content.esg_rating}</p>
                            </Box>
                        </Box>
                        <Box className="buttons_box" style={{ display: "flex", justifyContent: "space-evenly" }}>
                            {/* <ChildModal2 content={content} /> */}
                            <Button>Watch Fund</Button>
                            {/* passes fund id to the handleOpen function */}
                            <Button onClick={() => handleOpenRec(content.id)}>Recommend Fund</Button>
                            <Button onClick={() => handleOpenIssuer(content.issuer)}>See Issuer</Button>
                        </Box>
                    </Box>
            </Modal>
        </div>
    </>);
}


// export a function that accepts modal and setModal, then opens a popup