import React from "react";
import { scaleLinear } from "d3-scale";
import { timeFormat } from "d3-time-format";
import {extent} from "d3-array";
import {value_result} from "../../template/value_result"

function DataFromProps(props) {
  var propsArray = [...props.registers]
  console.log(propsArray)
  propsArray = propsArray.map(n=>{
    const dateYear = +n.createdAt.slice(0,4)
    const dateMonth =+n.createdAt.slice(5,7)-1
    const dateDay =  +n.createdAt.slice(8,10)-1
  
    const waist = n.waist
    const neck = n.neck
    const hip = n.hip==undefined ? 0:n.hip
    const height = n.height

    
    return({
      date:new Date(dateYear,dateMonth,dateDay),
      result: value_result(waist,neck,hip,height)
    })
  })
  propsArray= propsArray.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });

  
  console.log(propsArray)
  const data = [...propsArray].map(n => {
    return {
      x: n.date,
      y: n.result
    };
  });
  return data;
}
const plotAxis = {
  y:({ yScale, width })=>{
    const textPadding = -20
   
     const axis = yScale.ticks(10).map((d, i) => (
       <g key={i} className="y-tick">
         <line
           style={{ stroke: "#e4e5eb" }}
           y1={yScale(d)}
           y2={yScale(d)}
           x1={0}
           x2={width}
         />
         <text
           style={{ fontSize: 12 }}
           x={textPadding}
           dy=".32em"
           y={yScale(d)}
         >
           {d}
         </text>
       </g>
     ));
     return <>{axis}</>;
   },
   x:({ xScale, height })=>{
    const textPadding = 10;
  
    const formatTime = timeFormat("%d/%b")
    
    const axis = xScale.ticks(10).map((d, i) => {
    
      return(
          <g className="x-tick" key={i}>
            <line
              style={{ stroke: "#e4e5eb" }}
              y1={0}
              y2={height}
              x1={xScale(d)}
              x2={xScale(d)}
            />
            <text
              style={{ textAnchor: "middle", fontSize: 12 }}
              dy=".71em"
              x={xScale(d)}
              y={height + textPadding}
            >
              {formatTime(d)}
            </text>
          </g>
      )
    });
  return <>{axis}</>;
  }
   
}

export default function LineChart(props) {
  const data = DataFromProps(props),
    w = 1200,
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
    console.log(extent(data, d => d.x))
  
  const distanceDataDomain = 2
  const minimumValueDomain = extent(data, d => d.y)[0]-distanceDataDomain
  const maxValueDomain = extent(data, d => d.y)[1]+distanceDataDomain

  const yScale = scaleLinear()
    .domain([minimumValueDomain,maxValueDomain])
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
  var linesCoordinates =  (data)=>{
    const ArrayOfCoordinates=[];
    for (let i = 1; i < data.length; i++) {
    
      const prev = data[i-1];
      const curr = data[i]
      ArrayOfCoordinates.push(
        {
          x1:xScale(prev.x),
          x2:xScale(curr.x),
          y1:yScale(prev.y),
          y2:yScale(curr.y)
        }
        );
        }
        
        console.log(ArrayOfCoordinates)
        return ArrayOfCoordinates.sort()
        
      }
      
  
  linesCoordinates =  linesCoordinates(data)
  const lines=linesCoordinates.map((d, i)=>{
    return(
      <g className="line" key={i}>
      <line
        style={{ stroke: "#000000" }}
        x1={d.x1}
        x2={d.x2}
        y1={d.y1}
        y2={d.y2}
      />
      </g>
    )
  })

  const formatMonthYear = timeFormat("%b,%Y");
  const lastDate = data.map(n=> n.x)
  const currentMonthYear = formatMonthYear(lastDate[lastDate.length-1])

  return (
    <div>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <plotAxis.y yScale={yScale} width={width}/>
          <plotAxis.x xScale={xScale} height={height}/>
          {lines}
          {circles}
        </g>
      </svg>
          <>
            {currentMonthYear}
          </>
    </div>
  );
}

        
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
 