import React from "react";
import ReactDOM from "react-dom";
import RectangleForm from "./RectangleForm.js";
import { shallow } from "enzyme";

it("shallow renders without crashing", () => {
  shallow(<RectangleForm />);
});

it("has all the values from props in inputs", () => {
  const form = shallow(
    <RectangleForm width="5" height="10" left="15" top="20" />
  );

  expect(form.find({ value: "dummy" })).not.toBePresent();
  expect(form.find({ value: "5" })).toBePresent();
  expect(form.find({ value: "10" })).toBePresent();
  expect(form.find({ value: "15" })).toBePresent();
  expect(form.find({ value: "20" })).toBePresent();
});
