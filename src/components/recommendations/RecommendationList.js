// Export a function that accepts, recommendation list object, and handleWatch/Reject functions, 

import { Button, DialogTitle, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"

    // then prints the rec list to the DOM with handling Buttons
export const RecList = ({recs, HandleWatch, HandleReject}) => {

    return (
        <>
            <Box className="rec_section">
            <DialogTitle className="recs--by--you--title">Funds Recommended by You</DialogTitle>
            <Box className="recs--by--you">
                {recs?.map((r) => {
                    return (<div key={`rec--${r.id}`}>
                        <Typography>Recipient: {r.recommendee?.first_name} {r.recommendee?.last_name}</Typography>
                        <Typography>Fund: {r.fund?.name}</Typography>
                        <Typography>Note: {r.note}</Typography>
                        </div>)
                })}
            </Box>
            <DialogTitle className="recs--to--you--title">Funds Recommended to You</DialogTitle>
            <Box className="recs--to--you">
                {recs?.map((r) => {
                    return (<>
                        <Typography>{r.fund?.name}</Typography>
                        <Typography>{r.note}</Typography>
                        <Button variant="contained" onClick={() => HandleReject(r.id)}>Reject Rec.</Button>
                        <Button variant="contained" onClick={() => HandleWatch(r)}>Watch Fund</Button>
                        </>)
                })}
            </Box>
            </Box>
        </>
    )
}
