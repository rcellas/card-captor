import React from 'react'

function Search({handleSearch, search}) {
    return (
        <div>
            <input type="text" placeholder="Buscar carta" onChange={(e)=>handleSearch(e.target.value)} value={search}/>
        </div>
    )
}

export default Search