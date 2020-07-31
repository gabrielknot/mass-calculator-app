import React from 'react'
import './graph.css'

export default props=>{

    const array = Array(365).fill(3,0,364)
    console.log(props.createdAt)
    return(
        <div className="graph">
            <ul className="months">
            <li>Jan</li>
            <li>Feb</li>
            <li>Mar</li>
            <li>Apr</li>
            <li>May</li>
            <li>Jun</li>
            <li>Jul</li>
            <li>Aug</li>
            <li>Sep</li>
            <li>Oct</li>
            <li>Nov</li>
            <li>Dec</li>
            </ul>
            <ul className="days">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
            </ul>
            <ul className="squares">
                {
                array.map(n=>{
                    let i = 0
                    return(
                    <li data-level={Math.floor(Math.random() * 4)}></li>
                    )
                })
                }
            </ul>
        </div>
    )
}
