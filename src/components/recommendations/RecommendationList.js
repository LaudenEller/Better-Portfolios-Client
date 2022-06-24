import { Button, DialogTitle, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"

    // then prints the rec list to the DOM with handling Buttons
export const RecList = ({recs, HandleWatch, HandleReject}) => {

    return (
        <>
            <Box className="rec_section">
                <Box style={{display: "flex", flexDirection: "column", }}>
            <h3 style={{alignSelf: "center"}} className="recs--to--you--title">Your Recommendations</h3>
            </Box>
            <Box className="recs--to--you">
                {recs?.map((r) => {
                    return (<>
                    <Box className="fund_box"  sx={{
                            border: "1px solid black",
                            margin: "1em",
                            padding: "1em",
                            width: "300px",
                            backgroundColor: "#f8f8f8"
                        }}>
                        <Typography sx={{fontWeight: "bold"}}>From:</Typography><Typography> {r.recommender.username}</Typography>
                        <Typography sx={{fontWeight: "bold"}}>Fund:</Typography><Typography> {r.fund?.name}</Typography>
                        <Typography sx={{fontWeight: "bold"}}>Note:</Typography><Typography> {r.note}</Typography>
                        <Box className="button_box" sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            margin: "1em"
                        }}>
                        <Button variant="contained" onClick={() => HandleReject(r.id)}>Reject Rec</Button>
                        <Button variant="contained" onClick={() => HandleWatch(r)}>Watch Fund</Button>
                        </Box>
                        </Box>
                        </>)
                })}
            </Box>
            </Box>
        </>
    )
}
