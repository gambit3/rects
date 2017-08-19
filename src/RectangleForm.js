import React, { Component } from 'react';
import './RectangleForm.css';

class RectangleForm extends Component {
  handleInputChange(inputName, value) {
    if(value.length > 0 && isNaN(value)) return;
    // ? dont fire the event if nothing changed

    const newSizeAndPosition = {
      width: this.props.width,
      height: this.props.height,
      top: this.props.top,
      left: this.props.left,
    }
    newSizeAndPosition[inputName] = value;

    this.props.onChange(newSizeAndPosition);
  }

  render() {
    const labels = {
      width: 'Width',
      height: 'Height',
      top: 'Top',
      left: 'Left',
    }

    const inputs = Object.keys(labels).map( (inputName)=> {
      return <div className="RectangleForm-inputWrap" key={inputName}>
        <div className="RectangleForm-label">{labels[inputName]}:</div>
        <input className="RectangleForm-input"
            type="text" value={this.props[inputName]}
            onChange={(e)=>this.handleInputChange(inputName, e.target.value)} />
      </div>
    })

    return <div className="RectangleForm">{inputs}</div>
  }
}

export default RectangleForm;
