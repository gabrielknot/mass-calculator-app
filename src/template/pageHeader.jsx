import React from 'react'

export default props=>(
    <header className='page-header'>
        <h2>{props.name} <small className='text-muted'>{props.small}</small></h2>
    </header>
)