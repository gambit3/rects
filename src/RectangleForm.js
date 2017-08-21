import React from "react";
import "./RectangleForm.css";

const RectangleForm = props => {
  const handleInputChange = (inputName, value) => {
    if (value.length > 0 && isNaN(value)) return;

    const newSizeAndPosition = {
      width: props.width,
      height: props.height,
      top: props.top,
      left: props.left
    };
    newSizeAndPosition[inputName] = value;

    props.onChange(newSizeAndPosition);
  };

  const labels = {
    width: "Width",
    height: "Height",
    top: "Top",
    left: "Left"
  };

  const inputs = Object.keys(labels).map(inputName => {
    return (
      <div className="RectangleForm-inputWrap" key={inputName}>
        <div className="RectangleForm-label">
          {labels[inputName]}:
        </div>
        <input
          className="RectangleForm-input"
          type="text"
          value={props[inputName]}
          onChange={e => handleInputChange(inputName, e.target.value)}
        />
      </div>
    );
  });

  return (
    <div className="RectangleForm">
      {inputs}
      <button
        className="RectangleForm-removeButton"
        onClick={() => props.onRemove()}
      >
        Remove
      </button>
    </div>
  );
};

export default RectangleForm;
