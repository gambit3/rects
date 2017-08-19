import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RectangleForm from './RectangleForm.js';

const MAX_RECTANGLES = 5;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // sizes and positions of all rectangles as following objects
      // {width: 0, height: 0, top: 0, left: 0}
      rectangles: []
    }

    this.handleAddRectButton = this.handleAddRectButton.bind(this);
  }

  handleRectangleChange(rectangleIndex, newSizeAndPosition) {
    // todo validate

    this.setState((prevState)=>{
        const newRectangle = Object.assign(prevState.rectangles[rectangleIndex], newSizeAndPosition);
        const newRectangles = prevState.rectangles;
        newRectangles.splice(rectangleIndex, 1, newRectangle);

        return {rectangles: newRectangles}
    })
  }

  handleAddRectButton() {
    // sanity check should never happen
    if(this.state.rectangles.length >= MAX_RECTANGLES) return;

    this.setState( (prevState=>{
      const newRectangles = prevState.rectangles;
      newRectangles.push({width: 0, height: 0, top: 0, left: 0});
      return {
        rectangles: newRectangles
      }
    }))
  }

  render() {
    const rectangleForms = this.state.rectangles.map( (rectangle, index) => {
      return <RectangleForm
        width={rectangle.width}
        height={rectangle.height}
        top={rectangle.top}
        left={rectangle.left}
        onChange={(sizeAndPosition)=>this.handleRectangleChange(index, sizeAndPosition)}
        key={index}
      />
    });

    const rectangles = this.state.rectangles.map( (rectangle, index) => {
      const rectStyle = {
        width: rectangle.width + 'px',
        height: rectangle.height + 'px',
        top: rectangle.top + 'px',
        left: rectangle.left + 'px',
      };
      return <div className="App-rectangle" style={rectStyle} key={index}></div>
    });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React powered rectangles</h2>
        </div>
        <p className="App-intro">
        </p>
        <div className="App-rectangleForms" >
          {rectangleForms}
        </div>
        <button className="App-addRectButton" onClick={this.handleAddRectButton}>
          Add rectangle
        </button>
        <div className="App-rectangles">
          {rectangles}
        </div>

      </div>
    );
  }
}

export default App;
