import React from 'react'
import { connect } from "react-redux"

function Result(props){
<<<<<<< HEAD
    var result = (495/(1.03224-0.19077*(Math.log10(props.waist+props.hip-props.neck)) + 0.15566*(Math.log10(
        props.height
    ))) - 450 )+3
=======
    var result = 495/(1.03224-0.19077*(Math.log10(props.waist+props.hip-props.neck)) + 0.15566*(Math.log10(
        props.height
    ))) - 450 
>>>>>>> a645e79741db002066e78b7f1d0aea47407f6bf4
    if (isNaN(result)) result = 0;
    return(
        <div className="result">
            <h1>{result}</h1>
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