

// Fetch a default set of funds and print them in a grid format
// Render the fund list and a filter list to the DOM
// Filter funds by filter list

import { Box, Grid, Paper, styled, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getFundList } from "../funds/FundManager"
import { getIssuerList } from "../issuers/IssuerManager"

export const Home = () => {
    const [funds, setFunds] = useState([])
    const [issuers, setIssuers] = useState([])
    const [filter, setFilterType] = useState({ type: "all", value: "" })

    useEffect(
        () => {
            getFundList()
                .then(setFunds)
        },
        []
    )
    useEffect(
        () => {
            getIssuerList()
                .then(setIssuers)
        },
        []
    )

    useEffect(() => {
        getResources()
    },
        [filter]
    )


    const getResources = () => {
        if (filter.type === "all") {
            getFundList()
                .then(setFunds)
        }
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (<>
        {/* Return all filter types */}
        <Box className="page_content_box">
            <Box className="page_title_box">
                <h1>Better Portfolios</h1>
                </Box>
                <Box className="page_separator_box">
                    <hr className="page_separator"/>
                </Box>
        {/* Return funds in grid */}
        <Box className="grid_box" sx={{ flexGrow: 1}}>
            <Grid container spacing={1}>
                {/* container for filters */}
                <Grid item container xs={4} className="filter_box" direction="column">
                    {/* filter by name jsx */}
                    <fieldset id="nameSearchField">
                        <div className="nameSearch">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="name..."
                            />
                            <button className='button' onClick={e => {
                                e.preventDefault()
                                let filterToSet = {
                                    type: "name",
                                    value: e.currentTarget.previousElementSibling.value
                                }
                                setFilterType(filterToSet)
                            }}>
                                <label htmlFor="searchButton">Search</label>
                            </button>
                        </div>
                    </fieldset>
                    <Grid item className="filter--issuer">
                        {/* filter by issuer jsx */}
                        <fieldset>
                            <select
                                className="issuerDropdown"
                                name="issuerId"
                                value={filter.type === "issuer" ? filter.value : "0"}
                                onChange={e => {
                                    e.preventDefault()
                                    if (e.target.value != "0") {
                                        let copy = JSON.parse(JSON.stringify(filter))
                                        copy.type = "issuer"
                                        copy.value = e.target.value
                                        setFilterType(copy)
                                    }
                                }}
                            >
                                <option name="issuerId" hidden value="0">
                                    Filter By issuer
                                </option>
                                {issuers?.map((i) => {
                                    return (
                                        <option key={i.id} name="issuerId" value={i.id}>
                                            {i.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </fieldset>
                    </Grid>
                </Grid>
                {/* container for returned funds */}
                <Grid item container className="results_box" xs={8}>
                    {/* container for fund names */}
                    {/* HELP: Why isn't this printing fund names to the  */}
                    <Grid item xs={2} >
                        <Grid>Fund Name{funds?.map((f) => {
                        return <Item className="fund--name"><div>{f.name}</div></Item>
                    })}</Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Item className="">Fund foo </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className="">Fund bar</Paper>
                    </Grid>
                </Grid>
            </Grid>

        
        </Box>
        </Box>
    </>)
}