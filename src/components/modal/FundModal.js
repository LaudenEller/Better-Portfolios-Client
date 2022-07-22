import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { getIssuer } from '../issuers/IssuerManager';
import { unWatchFund, watchFund } from '../funds/FundManager';


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

export const FundModal = ({ open, setOpen, openRec, setOpenRec, setRecId, openIssuer, setOpenIssuer, users, setContent, content, watchButton, setWatchButton }) => {

    const HandleOpenIssuer = (x) => {
        setOpen(!open)
        getIssuer(x)
            .then((i) => setContent(i))
            .then(() => setOpenIssuer(!openIssuer))
    };

    const HandleOpenRec = (fundId) => {
        setOpen(!open);
        setRecId(fundId)
        setContent(users)
        setOpenRec(!openRec)
    }

    const HandleClose = () => {
        setOpen(!open);
    };

    const HandleWatch = (fundId) => {
        watchFund(fundId)
        setOpen(false)
    }

    const HandleUnWatch = (fundId) => {
        unWatchFund(fundId)
        setWatchButton(!watchButton)
        setOpen(false)
    }

    return (<>
        <div>
            <Modal
                open={open}
                onClose={HandleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                    <Box sx={{ ...style }}>
                        <h2 style={{ alignSelf: "center" }} id="parent-modal-title">{content?.name}</h2>
                        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                            <Box sx={{ alignSelf: "flex-start" }} >
                                <img style={{ width: "150px", height: "250px" }} src={content.image_url} alt="boohoo" className="img-responsive" />
                            </Box>
                            <Box>
                                <p>Issuer: {content.issuer.name}</p>
                                <p>Asset Class: {content.aclass.aclass}</p>
                                <p>Industry: {content.industry.industry}</p>
                                <p>Domicile: {content.country.country}</p>
                                <p id="parent-modal-description">Fund Rating: {content?.asset_rating}</p>
                                <p>ESG Rating: {content.esg_rating}</p>
                            </Box>
                        </Box>
                        <Box className="buttons_box" sx={{ display: "flex", justifyContent: "space-evenly" }}>
                            {/* TODO: Check to see if this fund is on the current user's watch list,
                                    Then set watchButton to the appropriate value */}
                            {watchButton ?
                            <Button onClick={() => HandleWatch(content.id)}>Watch</Button>
                            :
                            <Button onClick={() => HandleUnWatch(content.id)}>Unwatch</Button>
                        }
                            <Button onClick={() => HandleOpenRec(content.id)}>Recommend Fund</Button>
                            <Button onClick={() => HandleOpenIssuer(content.issuer.id)}>See Issuer</Button>
                        </Box>
                    </Box>
            </Modal>
        </div>
    </>);
}