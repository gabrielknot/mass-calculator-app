import React from 'react'
import { connect } from "react-redux"

function Result(props){
    var result = (495/(1.03224-0.19077*(Math.log10(props.waist+props.hip-props.neck)) + 0.15566*(Math.log10(
        props.height
    ))) - 450 )+3

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