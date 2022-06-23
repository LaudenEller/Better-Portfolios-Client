import { Box, Grid, Paper, styled, Typography } from "@mui/material"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { getAssetClases, getCountries, getEsgConcerns, getIndustries, searchName } from "../filters/FiltersManager"
import { filterFunds, getFundList, unWatchFund, watchFund } from "../funds/FundManager"
import { Fave, getIssuer, getIssuerList, unFave } from "../issuers/IssuerManager"
import { getUsers } from "../users/UserManager"
import { FundModal } from "../modal/FundModal"
import { RecModal } from "../modal/RecModal"
import { IssuerModal } from "../modal/IssuerModal"
import { createRecommendation } from "../recommendations/RecommendationManager"
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'


export const Home = () => {
    const [funds, setFunds] = useState([])
    const [users, setUsers] = useState([])
    const [issuers, setIssuers] = useState([])
    const [assets, setAssets] = useState([])
    const [industries, setIndustries] = useState([])
    const [countries, setCountries] = useState([])
    const [esgConcerns, setEsgConcerns] = useState([])
    const [concernChecks, setConcernChecks] = useState({})
    const [open, setOpen] = useState(false);
    const [openIssuer, setOpenIssuer] = useState(false);
    const [openRec, setOpenRec] = useState(false);
    const [recId, setRecId] = useState(0)
    const [content, setContent] = useState({})
    const [faveButton, setFaveButton] = useState(true)
    const [watchButton, setWatchButton] = useState(true)
    const [columnDefs, setColumnDefs] = useState([
        { field: "name" },
        { field: "issuer.name" },
        { field: "country.country" },
        { field: "asset_rating" },
        { field: "esg_rating" },
        { field: "asset_class.asset_class" },
        { field: "industry.industry" },
        { field: "esg_concern.concern" },
        // Add a grouped field for the esg concerns 
    ])
    const [filter, setFilter] = useState(
        {
            name: [],
            issuer: [],
            assetclass: [],
            industry: [],
            country: [],
            esg: []
        }
    )

    // const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        getUsers()
            .then(setUsers)
    },
        [])
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
            getCountries()
                .then(setCountries)
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
    useEffect(
        () => {
            getEsgConcerns()
                .then(setEsgConcerns)
        },
        []
    )

    useEffect(() => {
        getResources()
    },
        [filter]
    )

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
        let copy = { ...filter }
        if (copy['esg'].includes(id)) {
            copy.esg.splice(id)
            console.log(copy)
            setFilter(copy)
        }
        else {
            copy.esg.push(id)
            console.log(copy)
            setFilter(copy)
        }
    }

    const handleClose = () => {
        setOpen(false);
        setOpenRec(false);
        setOpenIssuer(false);
    };

    const handleOpenRec = (fundId) => {
        setOpen(false);
        setRecId(fundId)
        setContent(users)
        setOpenRec(true)
    }

    const handleRecFund = (rec) => {
        setOpenRec(false)
        createRecommendation(rec)
    }

    const handleFavorite = (issuerId) => {
        setFaveButton(!faveButton)
        Fave(issuerId)
        setOpenIssuer(false)
    }
    const handleUnFavorite = (issuerId) => {
        setFaveButton(!faveButton)
        unFave(issuerId)
        setOpenIssuer(false)
    }

    const handleWatch = (fundId) => {
        watchFund(fundId)
        setWatchButton(!watchButton)
        setOpen(false)
    }
    const handleUnWatch = (fundId) => {
        unWatchFund(fundId)
        setWatchButton(!watchButton)
        setOpen(false)
    }

    const resetFilter = () => {
        setFilter(
            {
                name: [],
                issuer: [],
                assetclass: [],
                industry: [],
                esg: []
            }
        )
        setConcernChecks([])
    }

    const getResources = () => {
        let queryString = "/funds?"
        for (let key in filter) {
            if (filter[key].length > 0) {
                if (queryString === "/funds?") {
                    queryString += `${key}=`
                }
                else {
                    queryString += `&${key}=`
                }
                if (key === "esg") {
                    for (let i = 0; i < filter.esg.length; i++) {
                        if (filter.esg[filter.esg.length - 1] === filter.esg[i]) {
                            queryString += `${filter.esg[i]}`
                        }
                        else {
                            queryString += `${filter.esg[i]},`
                        }
                    }
                }
                else {
                    filter[key].forEach((i) => {
                        queryString += `${i}`
                    })
                }
            }
        }
        filterFunds(queryString)
            .then(setFunds)
    }

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        animateRows: true,
        resizable: true
    }), [])

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

    return (<>
        {
            open != 0 ? <FundModal open={open} content={content} handleClose={handleClose} handleOpenRec={handleOpenRec} handleOpenIssuer={handleOpenIssuer} handleWatch={handleWatch} handleUnWatch={handleUnWatch} watchButton={watchButton}/> : ""
        }
        {
            openRec != 0 ? <RecModal openRec={openRec} recId={recId} content={content} handleRecFund={handleRecFund} /> : ""
        }
        {
            openIssuer != 0 ? <IssuerModal openIssuer={openIssuer} content={content} handleFavorite={handleFavorite} handleUnFavorite={handleUnFavorite} faveButton={faveButton} /> : ""
        }
        <Box className="page_content_box" sx={{height: "541px", border: "solid 1px #babfc7"}}>
            <Box className="grid_box" sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    {/* container for filters */}
                    <Grid item container xs={2} className="filter_box" sx={{
                        direction:"column",
                        height: "550px",
                        alignContent: "space-evenly",
                        border: "1px, solid, black"
                        }}>
                        {/* filter by name jsx */}
                        <Grid item className="filter--search" sx={{width: "240px"}}>
                            <fieldset id="nameSearchField">
                                <div className="nameSearch">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="name..."
                                        onChange={e => {
                                            e.preventDefault()
                                            let copy = { ...filter }
                                            copy.name.push(e.currentTarget.previousElementSibling.value)
                                            console.log(copy)
                                            setFilter(copy)
                                        }}
                                    />
                                </div>
                            </fieldset>
                        </Grid>
                        <Grid item className="filter--issuer" sx={{width: "240px"}}>
                            {/* filter by issuer jsx */}
                            <fieldset>
                                <select
                                    className="issuerDropdown"
                                    name="issuerId"
                                    onChange={e => {
                                        e.preventDefault()
                                        let copy = { ...filter }
                                        copy.issuer.push(e.target.value)
                                        console.log(copy)
                                        setFilter(copy)
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
                        <Grid item className="filter--asset_class" sx={{width: "240px"}}>
                            {/* filter by asset class jsx */}
                            <fieldset>
                                <select
                                    className="asset_class_dropdown"
                                    name="asset_class_id"
                                    onChange={e => {
                                        e.preventDefault()
                                        let copy = { ...filter }
                                        copy.assetclass.push(e.target.value)
                                        console.log(copy)
                                        setFilter(copy)
                                    }}
                                >
                                    <option name="asset_class_id" hidden value="0">
                                        Filter By asset class
                                    </option>
                                    {assets?.map((a) => {
                                        return (
                                            <option key={a.id} name="asset_class_id" value={a.id}>
                                                {a.asset_class}
                                            </option>
                                        );
                                    })}
                                </select>
                            </fieldset>
                        </Grid>
                        <Grid item className="filter--industry" sx={{width: "240px"}}>
                            <fieldset className="form-group">
                                <select
                                    className="industry_dropdown"
                                    name="industry_id"
                                    onChange={e => {
                                        e.preventDefault()
                                        let copy = { ...filter }
                                        copy.industry.push(e.target.value)
                                        setFilter(copy)
                                    }}
                                >
                                    <option name="industry_id" hidden value="0">
                                        Filter By industry
                                    </option>
                                    {industries?.map((i) => {
                                        return (
                                            <option key={i.id} name="industry_id" value={i.id}>
                                                {i.industry}
                                            </option>
                                        );
                                    })}
                                </select>
                            </fieldset>
                        </Grid>
                        <Grid item className="filter--country" sx={{width: "240px"}}>
                            <fieldset className="form-group">
                                <select
                                    className="country_dropdown"
                                    name="country_id"
                                    onChange={e => {
                                        e.preventDefault()
                                        let copy = { ...filter }
                                        copy.country.push(e.target.value)
                                        setFilter(copy)
                                    }}
                                >
                                    <option name="country_id" hidden value="0">
                                        Filter By country
                                    </option>
                                    {countries?.map((c) => {
                                        return (
                                            <option key={c.id} name="country_id" value={c.id}>
                                                {c.country}
                                            </option>
                                        );
                                    })}
                                </select>
                            </fieldset>
                        </Grid>
                        <Grid item className="filter--esg" sx={{width: "240px"}}>
                            <fieldset className="form-group">
                                <Typography sx={{ fontWeight: "bold" }}>Filter by ESG Sector</Typography>
                                {esgConcerns?.map((ec) => {
                                    return (
                                        <>
                                            <div className="esgCheckBox" key={`esgCheckBox--${ec.id}`}>
                                                <div autoComplete="off" noValidate className="div">
                                                    <label>{ec.concern}</label>
                                                    <input
                                                        type="checkbox"
                                                        checked={concernChecks[`${ec.id}`]}
                                                        value={ec.id}
                                                        onChange={
                                                            e => { handleCheckBoxChange(e.target.value) }}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}</fieldset>
                        </Grid>
                        <Grid item className="filter--button" sx={{width: "240px"}}>
                            <button onClick={() => resetFilter()}>Reset Filters</button>
                        </Grid>
                    </Grid>
                    {/* container for returned funds */}
                    <Grid item className="ag-theme-alpine" sx={{ height: 550, }} xs={10}>
                        <AgGridReact
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