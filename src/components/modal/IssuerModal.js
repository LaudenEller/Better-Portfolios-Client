import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


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

export const IssuerModal = ({ openIssuer, handleClose, handleFavorite, content }) => {

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
                        <h2 style={{ alignSelf: "center" }} id="parent-modal-title">{content.name}</h2>
                        <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <Box style={{ alignSelf: "flex-start" }} >
                                <img style={{ width: "150px", height: "250px" }} src={content.image_url} alt="boohoo" className="img-responsive" />
                            </Box>
                            <Box>
                                <p id="parent-modal-description">Domicile: {content?.country?.country}</p>
                            </Box>
                            <Box>
                            {content?.funds?.map((fund) => {
                                return <img style={{ width: "150px", height: "250px" }} src={fund.image_url} alt="boohoo" className="img-responsive" />
                            })}
                            </Box>
                        </Box>
                        <Box className="buttons_box" style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <Button onClick={() => handleFavorite(content.id)}>Favorite</Button>
                        </Box>
                    </Box>
            </Modal>
        </div>
    </>);
}