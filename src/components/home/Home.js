

// Fetch a default set of funds and print them in a grid format
// Render the fund list and a filter list to the DOM
// Filter funds by filter list

import { Box, getLinearProgressUtilityClass, Grid, Paper, styled, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getAssetClases, getIndustries, searchName } from "../filters/FiltersManager"
import { getFundList } from "../funds/FundManager"
import { getIssuerList } from "../issuers/IssuerManager"

export const Home = () => {
    const [funds, setFunds] = useState([])
    const [issuers, setIssuers] = useState([])
    const [assets, setAssets] = useState([])
    const [industries, setIndustries] = useState([])
    const [industryChecks, setIndustryChecks] = useState({})
    // const [filter, setFilterType] = useState(
    //     {
    //         type: "", value: ""
    //     })
    const [filter, setFilterType] = useState(
        {
            name: "",
            issuer: "",
            assetclass: "",
            industry: ""
        }
    )

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
    useEffect(
        () => {
            getIndustries()
                .then(setIndustries)
        },
        []
    )
    useEffect(
        () => {
            getAssetClases()
                .then(setAssets)
        },
        []
    )

    // useEffect(() => {
    //     getResources()
    // },
    //     [filter]
    // )

    const handleChange = (id) => {
        let copy = { ...filter }
        copy.industry = copy.industry.concat(',' + id)
        console.log(copy)
        setFilterType(copy)


        // const copy = { ...industryChecks }
        // copy[domEvent.target.value] = !copy[domEvent.target.value]
        // setIndustryChecks(copy)
    }

    const getResources = () => {
        // Parse the filter object and construct a query string
        // Send query param fetch
        if (filter.type === "all") {
            getFundList()
                .then(setFunds)
        }
        else if (filter.type === "name") {
            // get funds whose name starts with the value sent from the search input
            searchName(filter.value)
                .then(setFunds)
        }
        // if (filter.type === "asset_class") {
        //     getFundList()
        //         .then(setFunds)
        // }
    }

    // change filter.type to an object
    // Add a key of "type" and value from each filter form that is "on"
    // Add query_param and associated value to object in state

    // Whenever the actual fetch goes out, attach query string from object
    // Use for - in loop that builds query string by matching the keys with their values in the object
    // and attaches each key-value pair strings in a query parameter

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (<>
        <Box className="page_content_box">
            <Box className="page_title_box">
                <h1>Better Portfolios</h1>
            </Box>
            <Box className="page_separator_box">
                <hr className="page_separator" />
            </Box>
            <Box className="grid_box" sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    {/* container for filters */}
                    <Grid item container xs={4} className="filter_box" direction="column">
                        {/* filter by name jsx */}
                        <Grid item className="filter--search">
                            <fieldset id="nameSearchField">
                                <div className="nameSearch">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="name..."
                                    />
                                    <button className='button' onClick={e => {
                                        e.preventDefault()
                                        let copy = { ...filter }
                                        copy.name = e.currentTarget.previousElementSibling.value
                                        console.log(copy)
                                        setFilterType(copy)
                                        // let filterToSet = {
                                        //     type: "name",
                                        //     value: e.currentTarget.previousElementSibling.value
                                        // }
                                        // setFilterType(filterToSet)
                                    }}>
                                        <label htmlFor="searchButton">Search</label>
                                    </button>
                                </div>
                            </fieldset>
                        </Grid>
                        <Grid item className="filter--issuer">
                            {/* filter by issuer jsx */}
                            <fieldset>
                                <select
                                    className="issuerDropdown"
                                    name="issuerId"
                                    // value={filter.issuer}
                                    onChange={e => {
                                        e.preventDefault()
                                        let copy = { ...filter }
                                        copy.issuer = e.target.value
                                        console.log(copy)
                                        setFilterType(copy)
                                        // let copy = JSON.parse(JSON.stringify(filter))
                                        // copy.type = "issuer"
                                        // copy.value = e.target.value
                                        // setFilterType(copy)

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
                        <Grid item className="filter--asset_class">
                            {/* filter by issuer jsx */}
                            <fieldset>
                                <select
                                    className="asset_class_dropdown"
                                    name="asset_class_id"
                                    // TODO I need the value to target a key-value pair on the filter object
                                    // HELP: What does this line do?
                                    value={filter.type === "asset_class" ? filter.value : "0"}
                                    onChange={e => {
                                        e.preventDefault()
                                        if (e.target.value != "0") {
                                            let copy = JSON.parse(JSON.stringify(filter))
                                            copy.type = "asset_class"
                                            copy.value = e.target.value
                                            setFilterType(copy)
                                        }
                                    }}
                                >
                                    <option name="asset_classId" hidden value="0">
                                        Filter By asset class
                                    </option>
                                    {assets?.map((a) => {
                                        return (
                                            <option key={a.id} name="asset_classId" value={a.id}>
                                                {a.asset_class}
                                            </option>
                                        );
                                    })}
                                </select>
                            </fieldset>
                        </Grid>
                        <Grid item className="filter--industry">
                            <fieldset className="form-group">
                                {industries?.map((i) => {
                                    return (
                                        <div className="industryCheckBox" key={`industryCheckBox--${i.id}`}>
                                            <div autoComplete="off" noValidate className="div">
                                                <label>{i.industry}</label>
                                                <input
                                                    type="checkbox"
                                                    checked={industryChecks[`${i.id}`]}
                                                    value={i.id}
                                                    onChange={e => handleChange(e.target.value)}
                                                    // onChange={e => {
                                                    //     e.preventDefault()
                                                    //         let copy = { ...filter }
                                                    //         copy.industry += json.stringify(i.id)
                                                    //         setFilterType(copy)

                                                    // }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}</fieldset>
                        </Grid>
                    </Grid>
                    {/* container for returned funds */}
                    <Grid item container className="results_box" xs={8}>
                        {/* container for fund names */}
                        {/* HELP: Why isn't this printing fund names to the  */}
                        <Grid item xs={2} >
                            <Grid sx={{ fontWeight: 'bold' }}>Name{funds?.map((f) => {
                                return <Paper sx={
                                    {

                                        // position: 'fixed',
                                        // top: '5px',
                                        width: '100px',
                                        overflow: 'auto',
                                        height: '35px',
                                        border: '1px solid black',
                                        fontWeight: 250

                                    }
                                } className="fund--name"><Paper>{f.name}</Paper></Paper>
                            })}</Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid sx={{ fontWeight: 'bold' }}>Asset Class {funds?.map((f) => {
                                return <Paper sx={
                                    {

                                        // position: 'fixed',
                                        // top: '5px',
                                        width: '100px',
                                        overflow: 'auto',
                                        height: '35px',
                                        border: '1px solid black',
                                        fontWeight: 250

                                    }
                                } className="fund--name"><div>{f.asset_class.asset_class}</div></Paper>
                            })}</Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid sx={{ fontWeight: 'bold' }}>Asset Rating {funds?.map((f) => {
                                return <Paper sx={
                                    {

                                        // position: 'fixed',
                                        // top: '5px',
                                        width: '100px',
                                        overflow: 'auto',
                                        height: '35px',
                                        border: '1px solid black',
                                        fontWeight: 250

                                    }
                                } className="fund--name"><div>{f.asset_rating}</div></Paper>
                            })}</Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid sx={{ fontWeight: 'bold' }}>Domicile {funds?.map((f) => {
                                return <Paper sx={
                                    {

                                        // position: 'fixed',
                                        // top: '5px',
                                        width: '100px',
                                        overflow: 'auto',
                                        height: '35px',
                                        border: '1px solid black',
                                        fontWeight: 250

                                    }
                                } className="fund--name"><div>{f.country.country}</div></Paper>
                            })}</Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid sx={{ fontWeight: 'bold' }}>Industry {funds?.map((f) => {
                                return <Paper sx={
                                    {

                                        // position: 'fixed',
                                        // top: '5px',
                                        width: '100px',
                                        overflow: 'auto',
                                        height: '35px',
                                        border: '1px solid black',
                                        fontWeight: 250

                                    }
                                } className="fund--name"><div>{f.industry.industry}</div></Paper>
                            })}</Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid sx={{ fontWeight: 'bold' }}>Issuer {funds?.map((f) => {
                                return <Paper sx={
                                    {

                                        // position: 'fixed',
                                        // top: '5px',
                                        width: '100px',
                                        overflow: 'auto',
                                        height: '35px',
                                        border: '1px solid black',
                                        fontWeight: 250

                                    }
                                } className="fund--name"><div>{f.issuer.name}</div></Paper>
                            })}</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </>)
}