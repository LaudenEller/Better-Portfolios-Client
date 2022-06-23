// Export a function that accepts, recommendation list object, and handleWatch/Reject functions, 

import { Button, DialogTitle, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"

    // then prints the rec list to the DOM with handling Buttons
export const RecList = ({recs, HandleWatch, HandleReject}) => {

    return (
        <>
            <Box className="rec_section" style={{display: "flex", flexDirection: "column", }}>
            {/* <DialogTitle className="recs--by--you--title">Funds Recommended by You</DialogTitle>
            <Box className="recs--by--you">
                {recs?.map((r) => {
                    return (<div key={`rec--${r.id}`}>
                        <Typography>Recipient: {r.recommendee?.first_name} {r.recommendee?.last_name}</Typography>
                        <Typography>Fund: {r.fund?.name}</Typography>
                        <Typography>Note: {r.note}</Typography>
                        </div>)
                })}
            </Box> */}
            <h2 style={{alignSelf: "center"}} className="recs--to--you--title">Your Recommendations</h2>
            <Box className="recs--to--you">
                {recs?.map((r) => {
                    return (<>
                    <Box className="fund_box"  sx={{
                            border: "1px solid black",
                            margin: "1em",
                            padding: "1em",
                            width: "300px"
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
