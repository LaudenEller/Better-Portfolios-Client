import  React  from "react";
import "./DrawerToggler.css"

export const DrawerToggleButton = (props) => {

    let buttonClasses = 'toggle-button'
    if (props.show) {
        buttonClasses = 'toggle-button animate__animated animate__rubberBand animate__repeat-3  animate__delay-3s'
    }

return ( <button id="toggle-button-id" className={buttonClasses} onClick={props.click}>
        <img className="bp-logo" style={{height: "50px", width: "50px"}} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU0ZCiZvoNgLcVvfmHHK7ImQ3SpVGeB4TILg&usqp=CAU"}/>
    </button>
)}