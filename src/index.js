import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { invEStiGuide } from "./components/invEStiGuide.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <invEStiguide />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
