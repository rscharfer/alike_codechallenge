/* eslint-disable no-unused-vars */
import React from "react";
// use react-dom so you can render a React app into a DOM node
import ReactDOM from "react-dom";
// using the react flavor of testing-library here to use the render event
// getQueriesForElement and fireEvent are from the the DOM Testing library
import {
  render,
  getQueriesForElement,
  screen,
  fireEvent,
} from "@testing-library/react";
// the App we want to test
import userEvent from "@testing-library/user-event";
import App from "./App";

// mocking ApexCharts and ReactApexCharts to get rid of the error that is thrown
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";

// mocking our external components because they do not render without throwing a error
// in Jests browser environment
jest.mock("react-apexcharts", () => jest.fn(() => <div>Here is a chart</div>));
jest.mock("apexcharts", () => ({
  exec: jest.fn(() => new Promise((res, rej) => res("uri"))),
}));

test("<App/> renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test("<App/> shows the Overview header when rendered", () => {
  // render() returns the getQueriesForElement object with a bunch of query methods
  const { getByText } = render(<App />);
  const h3Overview = getByText("Overview", { selector: "h3" });
  expect(h3Overview).toBeInTheDocument();
});

test("a click on campaigns takes you to Campaigns view", async () => {
  const { getByText } = render(<App />);
  fireEvent.click(getByText("Campaigns"));

  expect(screen.findByText("campaign 1")).not.toBeNull();
  expect(screen.findByText("campaign 2")).not.toBeNull();
});

test("a click on create takes you to Create view", () => {
  const { getByText } = render(<App />);
  fireEvent.click(getByText("Create"));
  getByText("Create Campaign");
});

// test("adding a campaign adds a campaign", () => {
//   const { getByText } = render(<App />);
//   // go to 'Create' tab
//   fireEvent.click(getByText("Create"));
//   // enter something in input field
//   const inputField = document.querySelector("input");
//   userEvent.type(inputField, "My new campaign");
//   // click the button
//   const createButton = getByText("Create Campaign");
//   fireEvent.click(createButton);
//   // to to 'Campaigns'
//   fireEvent.click(getByText("Campaigns"));
//   // check to see if new campaign is there
//   getByText("My new campaign");
// });
