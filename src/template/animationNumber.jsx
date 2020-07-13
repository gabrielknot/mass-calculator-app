import React, { Component } from 'react';
import AnimatedNumber from "animated-number-react";



export default class AnimationNumber extends Component {
  state = {
    value: this.props.value,
  };

  formatValue = (value) => {

    return (
      parseInt(value)
    );
  };
  render() {
    return (
      <div>
        <span>{this.props.children}</span>
        <AnimatedNumber

          value={this.props.value}
          formatValue={this.formatValue} />
      </div>
    );
  }
}
