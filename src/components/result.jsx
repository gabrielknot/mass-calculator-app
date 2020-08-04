import React from 'react'
import {value_result} from "../template/value_result"
import { connect } from "react-redux"


function Result(props){
    const waist =+props.waist
    const neck =+props.neck
    const height =+props.height
    const hip =+props.hip

    var result=value_result(waist,neck,hip,height)

    if (isNaN(result)) result = 0;
    return(
        <div className="result">
            <h1>{result.toFixed(2)}</h1>
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

export default connect(mapStateToProps)(Result)