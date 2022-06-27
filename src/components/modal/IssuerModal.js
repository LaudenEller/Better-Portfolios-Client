import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Fave, unFave } from '../issuers/IssuerManager';

export const IssuerModal = ({ openIssuer, setOpenIssuer, faveButton, setFaveButton, content }) => {
    
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
        display: "flex",
        flexDirection: "column"
    };

    const handleFavorite = (issuerId) => {
        setFaveButton(!faveButton)
        Fave(issuerId)
        setOpenIssuer(false)
    }
    const handleUnFavorite = (issuerId) => {
        setFaveButton(!faveButton)
        unFave(issuerId)
        setOpenIssuer(false)
    }

    const HandleClose = () => {
        setOpenIssuer(false);
    };


    return (<>
        <div>
            <Modal
                open={openIssuer}
                onClose={HandleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                    
                    <Box sx={{ ...style }}>
                        <h2 style={{ alignSelf: "center" }} id="modal-title">{content?.name}</h2>
                        <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <Box style={{ alignSelf: "flex-start" }} >
                                <img style={{ width: "150px", height: "250px" }} src={content?.image_url} alt="boohoo" className="img-responsive" />
                            </Box>
                            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                            <Box>
                                <p id="modal-description">Domicile: {content?.country?.country}</p>
                            </Box>
                            <Box>
                                        <ul className="issuer_funds_box" sx={{ display: "flex", justifyContent: "space-evenly", padding: "5px" }}>{content?.funds?.map((fund) => {
                                            return <li>{fund.name}</li>
                                        })}</ul>
                                    </Box>
                        </Box>
                    </Box>
                    <Box className="buttons_box" style={{ display: "flex", justifyContent: "space-evenly" }}>
                        {/* TODO: Check to see if this issuer is on the current user's favorites list,
                                Then set the faveButton to appropriate value */}
                        {faveButton ?
                            <Button onClick={() => handleFavorite(content.id)}>Favorite</Button>
                            :
                            <Button onClick={() => handleUnFavorite(content.id)}>Unfavorite</Button>
                        }
                    </Box>
                    </Box>
                    
            </Modal>
        </div>
    </>);
}