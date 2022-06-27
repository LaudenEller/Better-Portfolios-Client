
import { Box, Button, Typography } from "@mui/material"
import { unWatchFund } from "../funds/FundManager"
import { getIssuer} from "../issuers/IssuerManager"

export const WatchList = ({funds, open, openIssuer, refreshFunds, setRefreshFunds, setContent, setOpen, setOpenIssuer }) => {

    const handleFundOpen = (f) => {
        setContent(f)
        setOpen(!open);
    }
    const handleOpenIssuer2 = (x) => {
        getIssuer(x)
            .then(() => setContent(x))
            .then(() => setOpenIssuer(!openIssuer))
    };
    const handleUnWatch = (fundId) => {
        unWatchFund(fundId)
            .then(setRefreshFunds(!refreshFunds))
    }

    return (
    <>
             {/* Watch List Column */}
                        <h3 style={{ alignSelf: "center", marginTop: "20px" }}>Watched Funds</h3>
                        {funds?.map((f) => {
                            return (
                                <Box className="fund_box" sx={{
                                    border: "1px solid black",
                                    margin: "1em",
                                    padding: "1em",
                                    width: "300px",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    <Box className="content_box" sx={{  display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                        {/* first column box */}
                                        <Box className="column_box" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography onClick={() => handleFundOpen(f)} sx={{ fontWeight: "bold" }}>Fund:</Typography>
                                            </Box>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography onClick={() => handleFundOpen(f)} sx={{ fontWeight: "bold" }}>Issuer:</Typography>
                                            </Box>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography sx={{ fontWeight: "bold" }}>ESG Rating:</Typography>
                                            </Box>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography sx={{ fontWeight: "bold" }}>ESG Concerns:</Typography>
                                            </Box>
                                        </Box>
                                        {/* second column box */}
                                        <Box className="column_box" sx={{ display: "flex", flexDirection: "column" }}>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography sx={{ overflow: "scroll", height: "35px", maxWidth: "100px" }}>{f.name}</Typography>
                                            </Box>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography onClick={() => handleOpenIssuer2(f.issuer.id)}>{f.issuer.name}</Typography>
                                            </Box>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography>{f.esg_rating}</Typography>
                                            </Box>
                                            <Box sx={{ justifySelf: "flex-start" }}>
                                                <Typography sx={{ overflow: "scroll", height: "35px", maxWidth: "100px" }}>{f.esg_concern.map((ec) => {
                                                    return (
                                                        <Typography>{ec.concern}</Typography>
                                                    )
                                                })}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    {/* Unwatch Button Box */}
                                    <Box className="button_box" key={`fav--${f.id}`}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center"
                                        }}>
                                        <Button variant="contained" sx={{ margin: "1em" }} onClick={() => handleUnWatch(f.id)}>Remove Fund</Button>
                                    </Box>
                                </Box>
                            )
                        })}
        </>
    )
}