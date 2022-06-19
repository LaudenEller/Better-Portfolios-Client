// Export a function that accepts, recommendation list object, and handleWatch/Reject functions, 
    // then prints the rec list to the DOM with handling buttons
export const RecList = ({recs, HandleWatch, HandleReject}) => {

    return (
        <>
            <div className="rec_section">
            <div>Funds Recommended by You</div>
            <fieldset className="form-group">
                {recs?.map((r) => {
                    return (<>
                        <div>{r.recommender}</div>
                        <button onClick={HandleReject(r.id)}>Reject</button>
                        <button onClick={HandleWatch(r.fund.id)}>Watch Fund</button>
                        </>)
                })}
            </fieldset>
            <div>Funds Recommended to You</div>
            <fieldset className="form-group">
                {recs?.map((r) => {
                    return (<>
                        <div>{r.recommendee}</div>
                        <button onClick={HandleReject(r.id)}>Reject</button>
                        <button onClick={HandleWatch(r.fund.id)}>Watch Fund</button>
                        </>)
                })}
            </fieldset>
            </div>
        </>
    )
}
