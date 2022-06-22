

// Fetch a default set of funds and print them in a grid format
// Render the fund list and a filter list to the DOM
// Filter funds by filter list

import { Box, Grid, Paper, styled } from "@mui/material"
import { useCallback, useEffect, useMemo, useState } from "react"
import { getAssetClases, getIndustries, searchName } from "../filters/FiltersManager"
import { filterFunds, getFundList } from "../funds/FundManager"
import { Fave, getIssuer, getIssuerList } from "../issuers/IssuerManager"
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { getUsers } from "../users/UserManager"
import { FundModal } from "../modal/FundModal"
import { RecModal } from "../modal/RecModal"
import { IssuerModal } from "../modal/IssuerModal"
import { createRecommendation } from "../recommendations/RecommendationManager"


export const Home = () => {
    const [funds, setFunds] = useState([])
    const [users, setUsers] = useState([])
    const [issuers, setIssuers] = useState([])
    const [assets, setAssets] = useState([])
    const [industries, setIndustries] = useState([])
    const [industryChecks, setIndustryChecks] = useState({})
    const [open, setOpen] = useState(false);
    const [openIssuer, setOpenIssuer] = useState(false);
    const [openRec, setOpenRec] = useState(false);
    const [recId, setRecId] = useState(0)
    const [content, setContent] = useState({})
    const [issuer, setIssuer] = useState({})
    const [columnDefs, setColumnDefs] = useState([
        { field: "name" },
        { field: "issuer.name" },
        { field: "country.country" },
        { field: "asset_rating" },
        { field: "esg_rating" },
        { field: "asset_class.asset_class" },
    ])
    // const [filter, setFilterType] = useState(
    //     {
    //         type: "", value: ""
    //     })
    const [filter, setFilterType] = useState(
        {
            name: "name=",
            issuer: "issuer=",
            assetclass: "assetclass=",
            industry: "industry="
        }
    )

    useEffect(
        () => {
            getFundList()
                .then(setFunds)
        },
        []
    )
    useEffect(() => {
        getUsers()
            .then(setUsers)
    },
        [])
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
    //     getResources2()
    // },
    //     [filter]
    // )


    const defaultColDef = useMemo(() => ({
        sortable: true,
    }), [])

    // change filter.type to an object
    // Add a key of "type" and value from each filter form that is "on"
    // Add query_param and associated value to object in state

    // Whenever the actual fetch goes out, attach query string from object
    // Use for - in loop that builds query string by matching the keys with their values in the object
    // and attaches each key-value pair strings in a query parameter

    const handleFundOpen = (f) => {
        setContent(f)
        setOpen(true);
    }

    const handleOpenIssuer = (x) => {
        setOpen(false);
        getIssuer(x)
            .then((i) => setContent(i))
            .then(() => setOpenIssuer(!openIssuer))
    };

    const handleCheckBoxChange = (id) => {
            if (filter.industry === "industry="){
                let copy = { ...filter }
                copy.industry = copy.industry + id
                console.log(copy)
                setFilterType(copy)}
            else if (filter.industry.search(id) > 0) {
                    let copy = { ...filter }
                    copy.industry = copy.industry.replace(id, '')
                    console.log(copy)
                    setFilterType(copy)}
            else {
                    let copy = { ...filter }
                    copy.industry = copy.industry + ',' + id
                    console.log(copy)
                setFilterType(copy)}
        }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenRec = (fundId) => {
        setOpen(false);
        setRecId(fundId)
        setContent(users)
        setOpenRec(true)
    }

    const handleRecFund = (rec) => {
        setOpenRec(false)
        // HELP: How come this returns from the API as "not found"?
        createRecommendation(rec)
    }

    const handleFavorite = (issuerId) => {
        setOpenIssuer(false)
        Fave(issuerId)
    }

    // const copy = { ...industryChecks }
    // copy[domEvent.target.value] = !copy[domEvent.target.value]
    // setIndustryChecks(copy)

    // send full query param strings to state

    const getResources2 = () => {
        // Build a fetch call string
        const queryString = "/funds?"
        // Iterate over state
       for (const key in filter) {
        if (queryString === "/funds?") {
            if (key.value.length > 0) {
            queryString = queryString + key.value
        }}
        else {
            // When the string isn't empty
            if (key.value.length > 0) {
                // Add string with an & before it to query call string
                queryString = queryString + '&' + key.value
        }
        // Send string to API
        filterFunds(queryString)
        // Render results to DOM
        .then(setFunds)
        }

    }
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

    const cellClickedListener = useCallback(e => {
        // Check the incoming data
        console.log(e)
        if (e.column.colId === "name") {
            handleFundOpen(e.data)
            // When the data is a fund, open the fund modal
        }
        else if (e.column.colId === "issuer.name") {
            // When the data is an issuer, open the issuer modal
            handleOpenIssuer(e.data.issuer.id)
        }
    })

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (<>
        {
            open != 0 ? <FundModal open={open} content={content} handleClose={handleClose} handleOpenRec={handleOpenRec} handleOpenIssuer={handleOpenIssuer} /> : ""
        }
        {
            openRec != 0 ? <RecModal openRec={openRec} recId={recId} content={content} handleRecFund={handleRecFund} /> : ""
        }
        {
            openIssuer != 0 ? <IssuerModal openIssuer={openIssuer} content={content} handleFavorite={handleFavorite} /> : ""
        }
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
                    <Grid item container xs={3} className="filter_box" direction="column">
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
                                        copy.name += e.currentTarget.previousElementSibling.value
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
                                        copy.issuer += e.target.value
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
                                            copy.value += e.target.value
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
                                                    // in the onChange event, check industryChecks to see if the passed in id matches an id on that object
                                                        // if so
                                                    onChange={
                                                        e => {handleCheckBoxChange(e.target.value)}}
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
                    <Grid item className="ag-theme-alpine" sx={{ height: 500 }} xs={9}>
                        <AgGridReact
                            // HELP: How to pass data from the cell to the function?
                            onCellClicked={cellClickedListener}
                            rowData={funds}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            animateRows={true}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </>)
}