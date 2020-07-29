import React from 'react'
import { connect } from "react-redux"
import { changeNumber_HEIGHT, 
         changeNumber_HIP,
         changeNumber_NECK,
         changeNumber_WAIST }
        from "../store/actions/numbers"

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
                onChange={  e =>{
                    if(_action=="Height"){  
                        return props.changeNumber_H(+e.target.value)}
                    if(_action=="Waist"){  
                        return props.changeNumber_W(+e.target.value)}
                    if(_action=="Neck"){  
                        return props.changeNumber_N(+e.target.value)}
                    if(_action=="Hip"){  
                        return props.changeNumber_Hip(+e.target.value)}
                    }}>
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

function mapDispatchToProps(dispatch){
    return{
        changeNumber_H(newNum){
            const action = changeNumber_HEIGHT(newNum)
            dispatch(action)
        },
        changeNumber_W(newNum){
            const action = changeNumber_WAIST(newNum)
            dispatch(action)
        },
        changeNumber_N(newNum){
            const action = changeNumber_NECK(newNum)
            dispatch(action)
        },
        changeNumber_Hip(newNum){
            const action = changeNumber_HIP(newNum)
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)