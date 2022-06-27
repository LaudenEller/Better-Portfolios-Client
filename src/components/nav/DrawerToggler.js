import { Box } from "@mui/material";
import  React  from "react";
import { useHistory } from "react-router-dom";
import "./DrawerToggler.css"

export const DrawerToggleButton = (props) => {

    const history = useHistory()
    let buttonClasses = 'toggle-button'
    if (props.show) {
        buttonClasses = 'toggle-button animate__animated animate__rubberBand animate__repeat-3  animate__delay-3s'
    }

return ( 
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <h1 style={{marginLeft: "10px", marginTop: "25px", marginBottom: "5px"}}  onClick={() => {
          history.push({ pathname: "/" })
        }}>Better Portfolios</h1>
<button id="toggle-button-id" className={buttonClasses} onClick={props.click} style={{marginRight: "35px"}}>
        <img className="bp-logo" style={{height: "50px", width: "50px", marginTop: "10px", marginLeft: "5px"}} src={"./logo.png"}/>
        </button>
      </Box >
    
)}