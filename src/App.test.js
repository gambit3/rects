import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

it("shallow renders without crashing", () => {
  shallow(<App />);
});

it("renders a rectangle from localstorage", () => {
  // mock data in localstorage
  global.localStorage.getItem = () =>
    JSON.stringify({
      rectangles: [{ width: "5", height: "10", left: "15", top: "20" }]
    });

  const wrapper = shallow(<App />);
  const expectedStyle = {
    width: "5px",
    height: "10px",
    left: "15px",
    top: "20px"
  };

  expect(wrapper).toContainReact(
    <div className="App-rectangle" style={expectedStyle} />
  );

  // reset localstorage to dummy
  global.localStorage.getItem = jest.fn();
});
