import React, { useState } from 'react';

function SearchComponent(props) {

    const [selctedcmpny,setSelctedcmpny] = useState('')
    console.log("cmpnyyyyyyyyyyyyyyyyyyyyyyyy",selctedcmpny)
    return (
        
        <div>
            {/* <button onClick={}></button> */}
            <h3>search results</h3>
            <input onChange={e=>setSelctedcmpny(e.target.value)} type="text" name="" id="" placeholder='enter the company' />
            {/* <button onClick={}>search</button> */}
        </div>
    );
}

export default SearchComponent;