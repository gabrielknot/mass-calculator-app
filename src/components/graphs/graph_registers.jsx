import React from "react";
import { scaleLinear } from "d3-scale";
import {extent} from "d3-array"


function RandomData() {
  const data = [...Array(100)].map((e, i) => {
    return {
      x: Math.random() * 40,
      y: Math.random() * 40,
      temparature: Math.random() * 500
    };
  });
  return data;
}

function Scatter() {
  const data = RandomData(),
    w = 600,
    h = 600,
    margin = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40
    };

  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(extent(data, d => d.x))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, d => d.y))
    .range([height, 0]);

const circles = data.map((d, i) => (
    <circle
      key={i}
      r={5}
      cx={xScale(d.x)}
      cy={yScale(d.y)}
      style={{ fill: "lightblue"}}
    />
  ));

  return (
    <div>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {circles}
        </g>
      </svg>
    </div>
  );
}

export default Scatter;
        
        /* export default props=>{
        
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
            
            return[a, b];
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
                    const r = count(date_string)
                    dataLevel=r[1][r[0].indexOf(n)]
                }else{
                    dataLevel=0
                }
                return({
                    key:n,
                    month:Math.round(n/4.55<1?0:n/4.55),
                    dataLevel:dataLevel
                })
            })
            return range_weeks
        }
        
        var currentDate = new Date(); 
        var currentMonthValue =  + (currentDate.getMonth())
        
        const monthsArray= range(0,12).reduce((arr,el)=>{
            const monthNumber=el
        
            const pos=arr.length+monthNumber+((arr.length-1)-currentMonthValue)
            
            arr[pos%12]=monthNumber
            return arr
        
        },Array(12))
        
                        
        
        
        const range_weeks = dataLevel(week_ofTheYear())
        return(
            <div className="graph">
                    
                    <ul className="months">
                    { 
                        monthsArray.map(el=>{
            
                            const textMonth=el==0?"Jan":el==1?"Feb":el==2?"Mar":el==3?"Apr":el==4?"May":el==5?"Jun":el==6?"Jul":el==7?
                                                            "Aug":el==8?"Sep":el==9?"Oct":el==10?"Nov":"Dec"
                            const monthNumber=el
        
                        return (
                            <li key={el}className="month" index={monthNumber}>{textMonth}</li>
                        )
                        })
                    }
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
         */
 