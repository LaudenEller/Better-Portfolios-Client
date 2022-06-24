import { Button, DialogTitle, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"

// then prints the rec list to the DOM with handling Buttons
export const RecList = ({ recs, HandleWatch, HandleReject }) => {

    return (
        <>
            <Box className="rec_section">
                <Box sx={{display: "flex", flexDirection: "column", }}>
                    <h3 style={{ alignSelf: "center" }} className="recs--to--you--title">Your Recommendations</h3>
                </Box>
                <Box className="recs--to--you" sx={{ marginBottom: "25px", display: "flex", flexDirection: "column" }}>
                    {recs?.map((r) => {
                        return (

                            <Box className="issuer_box" sx={{
                                border: "1px solid black",
                                margin: "1em",
                                padding: "1em",
                                width: "300px",
                                backgroundColor: "#ffffff",
                                display: "flex",
                                flexDirection: "column",
                                marginBottom: "25px",

                            }}>
                                <Box className="content_box" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginBottom: "25px" }}>

                                    {/* first column box */}
                                    <Box className="column_box" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                                        <Box sx={{ justifySelf: "flex-start" }}>
                                            <Typography sx={{ fontWeight: "bold" }}>From:</Typography>
                                        </Box>
                                        <Box sx={{ justifySelf: "flex-start" }}>
                                            <Typography sx={{ fontWeight: "bold" }}>Fund:</Typography>
                                        </Box>
                                        <Box sx={{ justifySelf: "flex-start" }}>
                                            <Typography sx={{ fontWeight: "bold" }}>Note:</Typography>
                                        </Box>
                                        <Box sx={{ justifySelf: "flex-start" }}>
                                        </Box>
                                    </Box>

                                    {/* second column box */}
                                    <Box className="column_box" sx={{ display: "flex", flexDirection: "column" }}>
                                        <Box sx={{ justifySelf: "flex-start" }}>
                                            <Typography> {r.recommender.username}</Typography>
                                        </Box>
                                        <Box sx={{ justifySelf: "flex-start" }}>
                                            <Typography> {r.fund?.name}</Typography>
                                        </Box>
                                        <Box sx={{ justifySelf: "flex-start" }}>
                                        </Box>
                                        <Box sx={{ justifySelf: "flex-start" }}>
                                            <Typography> {r.note}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className="button_box"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        margin: "1em",
                                        justifyContent: "space-evenly"
                                    }}>
                                    <Button variant="contained" onClick={() => HandleReject(r.id)}>Reject Rec</Button>
                                    <Button variant="contained" onClick={() => HandleWatch(r)}>Watch Fund</Button>
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </>
    )
}
