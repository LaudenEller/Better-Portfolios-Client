import { Box, Button, Typography } from "@mui/material"
import { unFave } from "../issuers/IssuerManager"


export const FavoritesList = ({favorites, setRefreshFaves, refreshFaves}) => {

    const HandleUnfave = (IssuerId) => {
        unFave(IssuerId)
            .then(() => setRefreshFaves(!refreshFaves))
    }

    return (
        <>

<h3 style={{ alignSelf: "center" }}>Favorites Cos</h3>
                        {favorites?.map((f) => {
                            return (<>
                                <Box
                                    sx={{
                                        border: "1px solid black",
                                        margin: "1em",
                                        padding: "1em",
                                        width: "300px",
                                        display: 'flex',
                                        flexDirection: "column",
                                        justifyContent: "space-evenly",
                                        backgroundColor: "#ffffff"
                                    }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-evenly" }} >
                                        <Typography sx={{fontWeight: "bold", fontSize: "large"}}>{f.name}</Typography>
                                        <img style={{ width: "50px", height: "50px" }} src={f.image_url} alt="boohoo" className="img-responsive" />
                                    </Box>
                                    <Box>
                                        <ul className="issuer_funds_box" sx={{ display: "flex", justifyContent: "space-evenly", padding: "5px" }}>{f?.funds?.map((fund) => {
                                            return <li>{fund.name}</li>
                                        })}</ul>
                                    </Box>
                                    <Box key={`fav--${f.id}`}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-evenly"
                                        }}>
                                        <Button variant="contained" sx={{ margin: "1em" }} onClick={() => HandleUnfave(f.id)}>Unfavorite.</Button>
                                    </Box>
                                </Box>
                            </>
                            )
                        })}
        </>
    )
}