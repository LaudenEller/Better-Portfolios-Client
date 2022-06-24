import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

export const IssuerModal = ({ openIssuer, handleClose, faveButton, handleFavorite, handleUnFavorite, content }) => {
    
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

    return (<>
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={openIssuer}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                    
                    <Box sx={{ ...style, display: "flex", flexDirection: "column", width: 400 }}>
                        <h2 onTou style={{ alignSelf: "center" }} id="parent-modal-title">{content?.name}</h2>
                        <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <Box style={{ alignSelf: "flex-start" }} >
                                <img style={{ width: "150px", height: "250px" }} src={content?.image_url} alt="boohoo" className="img-responsive" />
                            </Box>
                            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                            <Box>
                                <p id="parent-modal-description">Domicile: {content?.country?.country}</p>
                            </Box>
                            <Box>
                                {content?.funds?.map((fund) => {
                                    return <img style={{ width: "25px", height: "25px" }} src={fund.image_url} alt="boohoo" className="img-responsive" />
                                })}
                            </Box>
                        </Box>
                    </Box>
                    <Box className="buttons_box" style={{ display: "flex", justifyContent: "space-evenly" }}>
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