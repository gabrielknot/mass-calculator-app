import React from 'react'
import Grid from '../template/grid'
import IconBtn from '../template/iconButton'
export default props=>(
    <div role="form" className="row">
        <Grid cols="12 9 10">
            <input id="description" className='form-control'
                placeholder="Adcione Uma Tarefa"
                value={props.description}
                onChange={props.handleChange}></input>

        </Grid>
         <Grid cols="12 3 2">
            <IconBtn style="primary" onClick={props.handleAdd}>+</IconBtn>
        </Grid>
        </div>
)