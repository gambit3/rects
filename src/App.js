import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./App-print.css";
import RectangleForm from "./RectangleForm.js";

const MAX_RECTANGLES = 5;

class App extends Component {
  constructor(props) {
    super(props);
    const savedStateJSON = localStorage.getItem("savedState");
    let savedState;
    if (savedStateJSON) {
      try {
        savedState = JSON.parse(savedStateJSON);
      } catch (e) {}
    }

    this.state = savedState || {
      // sizes and positions of all rectangles as following objects
      // {width: 0, height: 0, top: 0, left: 0}
      rectangles: []
    };

    this.handleAddRectButton = this.handleAddRectButton.bind(this);
  }

  componentDidMount() {
    this.addThrotteledResizeWindowResizeHandler();
  }

  componentWillUnmount() {
    this.cleanupThrotteledResizeWindowResizeHandler();
  }

  componentDidUpdate() {
    this.truncateWidthsToFitViewport();
    localStorage.setItem("savedState", JSON.stringify(this.state));
  }

  render() {
    const rectangleForms = this.state.rectangles.map((rectangle, index) => {
      return (
        <RectangleForm
          width={rectangle.width}
          height={rectangle.height}
          top={rectangle.top}
          left={rectangle.left}
          onChange={sizeAndPosition =>
            this.handleRectangleChange(index, sizeAndPosition)}
          onRemove={() => this.handleRemoveRectangle(index)}
          key={index}
        />
      );
    });

    const rectangles = this.state.rectangles.map((rectangle, index) => {
      const rectStyle = {
        width: (rectangle.width || "0") + "px",
        height: (rectangle.height || "0") + "px",
        top: (rectangle.top || "0") + "px",
        left: (rectangle.left || "0") + "px"
      };
      return <div className="App-rectangle" style={rectStyle} key={index} />;
    });

    const addButton = (
      <button className="App-addRectButton" onClick={this.handleAddRectButton}>
        Click to add rectangle
      </button>
    );

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React powered rectangles</h2>
        </div>
        <div className="App-rectangleForms">
          {rectangleForms}
          {this.state.rectangles.length >= 5 ? null : addButton}
        </div>
        <div className="App-viewportTitle">Output:</div>
        <div
          className="App-rectangles"
          ref={div => {
            this.rectViewportRef = div;
          }}
        >
          {rectangles}
        </div>
      </div>
    );
  }

  addThrotteledResizeWindowResizeHandler() {
    this.resizeThrottler = () => {
      if (!this.resizeTimeout) {
        this.resizeTimeout = setTimeout(() => {
          this.resizeTimeout = null;
          this.truncateWidthsToFitViewport();
        }, 66); // Throttle to ca. 15fps
      }
    };

    window.addEventListener("resize", this.resizeThrottler, false);
  }

  cleanupThrotteledResizeWindowResizeHandler() {
    clearTimeout(this.resizeTimeout);
    window.removeEventListener("resize", this.resizeThrottler);
  }

  truncateWidthsToFitViewport() {
    if (!this.rectViewportRef) return;

    const viewportWidth = this.rectViewportRef.offsetWidth;
    const toInt = v => (v ? parseInt(v, 10) : 0);

    const firstTooWideRectangleIndex = this.state.rectangles.findIndex(
      (rect, currentIndex, allRects) => {
        const widthUpToCurrent = allRects
          .slice(0, currentIndex + 1)
          .reduce((sum, rect) => sum + toInt(rect.width), 0);
        return widthUpToCurrent > viewportWidth;
      }
    );

    if (firstTooWideRectangleIndex === -1) return;

    this.setState(prevState => {
      const newRectangles = prevState.rectangles.map(
        (rect, index, allRects) => {
          if (index < firstTooWideRectangleIndex) {
            return rect;
          } else if (index === firstTooWideRectangleIndex) {
            return Object.assign(rect, {
              width:
                viewportWidth -
                allRects
                  .slice(0, index)
                  .reduce((sum, rect) => sum + toInt(rect.width), 0)
            });
          } else {
            return Object.assign(rect, { width: 0 });
          }
        }
      );

      return { rectangles: newRectangles };
    });
  }

  handleRectangleChange(rectangleIndex, newSizeAndPosition) {
    this.setState(prevState => {
      const newRectangle = Object.assign(
        prevState.rectangles[rectangleIndex],
        newSizeAndPosition
      );
      const newRectangles = prevState.rectangles;
      newRectangles.splice(rectangleIndex, 1, newRectangle);

      return { rectangles: newRectangles };
    });
  }

  handleRemoveRectangle(rectangleIndex) {
    this.setState(prevState => {
      const newRectangles = prevState.rectangles;
      newRectangles.splice(rectangleIndex, 1);
      return { rectangles: newRectangles };
    });
  }

  handleAddRectButton() {
    // sanity check should never happen as the button for addding new rectangles should be hidden
    if (this.state.rectangles.length >= MAX_RECTANGLES) return;

    this.setState(prevState => {
      const newRectangles = prevState.rectangles;
      newRectangles.push({ width: 0, height: 0, top: 0, left: 0 });
      return {
        rectangles: newRectangles
      };
    });
  }
}

export default App;
