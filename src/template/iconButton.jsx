import React, {Component} from 'react'

export default class IconButton extends Component{
    constructor(props) {
        super(props);
        
    this.handleInputChange = this.handleInputChange.bind(this);
  }

    handleInputChange(event) {
        
    }
    
    render(){
        if(this.props.checkbox){
            return <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.props.checked}
                        onChange={this.props.onClick} 
                    />
        }
        if(this.props.hide){
            return null
        }else{
        return(
            <button className={'btn btn-'+this.props.style} onClick={this.props.onClick}>
                {this.props.children}
            </button>
        )
    }
}
}