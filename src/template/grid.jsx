import React, {Component} from 'react'

export default class Grid extends Component{
    toCSSClass(numbers){
        const cols = numbers ? numbers.split(' ') : []
        let _class = ''
        if(cols[0]) _class += `col-xs-${cols[0]}`
        if(cols[1]) _class += ` col-sm-${cols[1]}`
        if(cols[2]) _class += ` col-md-${cols[2]}`
        if(cols[3]) _class += ` col-lg-${cols[3]}`
        return _class
    }
    render(){
        const gridClass = this.toCSSClass(this.props.cols || 12)
        return(
            <div className={gridClass}>
                {this.props.children}

            </div>
        )
    }
}