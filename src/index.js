import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { BetterPortfolios } from "./components/BetterPortfolios.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <BetterPortfolios />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
