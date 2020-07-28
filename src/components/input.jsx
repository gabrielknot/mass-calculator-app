import React from 'react'
import {connect} from "react-redux"

function Input (props){
    const _action = props.action
    const valueState = _action === "Height" ? props.height : _action === "Neck" ?
                         props.neck : _action === "Waist" ? props.waist : props.hip

    return(
        <div className="input">
            <input id="description" className='form-control'
                placeholder={_action}
                type="number"
                value={valueState === 0 ? '': valueState}
                onChange={props.handleChange}>
            </input>
        </div>
    )
}

function mapStateToProps(state){
    return{
        height: state.numbers.Height,
        waist: state.numbers.Waist,
        neck: state.numbers.Neck,
        hip: state.numbers.Hip
    }
}

export default connect(mapStateToProps)(Input)