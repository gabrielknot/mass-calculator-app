import React from 'react'

export default props=>{
    return(
        <div className="input">
            <input id="description" className='form-control'
                placeholder={props.action}
                type="number"
                value={props.description}
                onChange={props.handleChange}>
            </input>
        </div>
    )
}