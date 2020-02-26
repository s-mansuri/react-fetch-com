import React from 'react'

function Filters(props) {
    return (
        <div>
            <input type="text" name="filter" placeholder="Filter by Status" className="inputField" onChange={props.filterStatus}/>
            <input type="text" name="filter" placeholder="Filter by Species" className="inputField" onChange={props.speciesStatus}/>
        </div>
    )
}

export default Filters
