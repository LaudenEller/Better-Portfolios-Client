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

export const FundModal = ({ open, handleOpenRec, handleOpenIssuer, handleClose, content, handleWatch, handleUnWatch, watchButton }) => {

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
                            {/* <Button onClick={() => handleWatch(content.id)}>Watch Fund</Button> */}
                            {watchButton ?
                            <Button onClick={() => handleWatch(content.id)}>Watch</Button>
                            :
                            <Button onClick={() => handleUnWatch(content.id)}>Unwatch</Button>
                        }
                            {/* passes fund id to the handleOpen function */}
                            <Button onClick={() => handleOpenRec(content.id)}>Recommend Fund</Button>
                            <Button onClick={() => handleOpenIssuer(content.issuer.id)}>See Issuer</Button>
                        </Box>
                    </Box>
            </Modal>
        </div>
    </>);
}


// export a function that accepts modal and setModal, then opens a popup