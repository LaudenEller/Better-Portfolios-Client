import { Box } from "@mui/material"
import "./Footer.css"

export const Footer = () => {
    return <>
        <footer>
            <Box className="main-footer" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                <p>Created by: Lauden Eller <a href="https://github.com/LaudenEller/Final-Capstone-Client">Github</a></p> {/* TODO: Change url to proper repo url */}

                <p><a href="https://www.flaticon.com/free-icons/sustainability" title="sustainability icons">Sustainability icons created by Freepik - Flaticon</a></p>

            </Box>
        </footer>
    </>
}