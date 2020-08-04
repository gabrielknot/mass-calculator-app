import React from 'react'
import './graph.css'
export default props=>{
/* 




week_ofTheYear(props.createdAt) */

function count(arr) {
    var a = [], b = [], prev;
    
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    
    return [a, b];
}
const range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start)


const weeks_for_month= [4,4,4,5,4,4,5,4,4,5,4,5]
function week_ofTheYear(){
    
    var date_string = [props.createdAt]
    var date_string = date_string[0]

    date_string = date_string.map(n=>{
        const month=+n.createdAt.slice(5,7)
        const day=+n.createdAt.slice(8,10)
        
        const week_ofmonth = weeks_for_month.slice(0,month-1).reduce((a, b) => a + b, 0)
        var coeff_dayWeek= day/7
        
        if (coeff_dayWeek <1){
            coeff_dayWeek=1
        }else{
            if (coeff_dayWeek >= 4 && weeks_for_month[month-1]==5){
                coeff_dayWeek=5
            }else{
                coeff_dayWeek=coeff_dayWeek.toFixed(0)
            }
        }
        
        return(+coeff_dayWeek+week_ofmonth)
    })
    
    
    return date_string.sort()
    
}

function dataLevel(date_string){
    var range_weeks = range(1,53)

    var dataLevel = 0
    range_weeks = range_weeks.map(n=>{
        if(date_string.includes(n)){
            dataLevel=count(date_string)[1][date_string.indexOf(n)]
            if(dataLevel==undefined){
                dataLevel=1
            }
            
        }else{
            dataLevel=0
        }
        
        return({
            key:n,
            dataLevel:dataLevel
        })
    })
    return range_weeks
}
var currentdate = new Date(); 
var datetime =  + (currentdate.getMonth()+1)
                

console.log(datetime)

const range_weeks = dataLevel(week_ofTheYear())
return(
    <div className="graph">
            
            <ul className="months">
            <li className="month" number={datetime}>Jan</li>
            <li className="month" number={datetime}>Feb</li>
            <li className="month" number={datetime}>Mar</li>
            <li className="month" number={datetime}>Apr</li>
            <li className="month" number={datetime}>May</li>
            <li className="month" number={datetime}>Jun</li>
            <li className="month" number={datetime}>Jul</li>
            <li className="month" number={datetime}>Aug</li>
            <li className="month" number={datetime}>Sep</li>
            <li className="month" number={datetime}>Oct</li>
            <li className="month" number={datetime}>Nov</li>
            <li className="month" number={datetime}>Dec</li>
            </ul>
            <ul className="weeks">
            </ul>
            <ul className="squares">
                {
                range_weeks.map(n=>{
                    return(
                    <li key={n.key} data-level={n.dataLevel}></li>
                    )
                })
                }
            </ul>
        </div>
    )
}
