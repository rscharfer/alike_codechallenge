/* eslint-disable no-unused-vars */
import React from "react";
// use react-dom so you can render a React app into a DOM node
import ReactDOM from 'react-dom';
// using the react flavor of testing-library here to use the render event
// getQueriesForElement and fireEvent are from the the DOM Testing library
import { render, getQueriesForElement, fireEvent } from '@testing-library/react';
// the App we want to test
import userEvent from '@testing-library/user-event'
import App from "./App";


// mocking ApexCharts and ReactApexCharts to get rid of the error that is thrown
import ApexCharts from "apexcharts";
import ReactApexChart from 'react-apexcharts'

// mocking our external components because they do not render without throwing a error
// in Jests browser environment
jest.mock('react-apexcharts', () => jest.fn(() => <div>Here is a chart</div>))
jest.mock("apexcharts", () => ({
  exec: jest.fn(() => new Promise((res, rej) => res("uri"))),
}));


test("<App/> renders without crashing", () => {
  // nothing fancy here just rendering the App into a div usng the JSDOM
  // shows you can just use JSDom in Jest to test React apps
  const div = document.createElement('div');
  ReactDOM.render(<App/>, div);
});

test("<App/> shows the Overview header when rendered", () => {
  // render() returns the getQueriesForElement object with a bunch of query methods
  const { getByText } = render(<App />);
  const h3Overview = getByText('Overview', {selector: 'h3'})
  expect(h3Overview).toBeInTheDocument()
});

test("You could also do user browser APIs thanks to JS DOM", () => {
  const root = document.createElement('div');
  ReactDOM.render(<App/>, root);
  expect(root.querySelector('h3').textContent).toBe('Overview')
});

test("Or use a mix", () => {
  const root = document.createElement('div');
  ReactDOM.render(<App/>, root);
  const { getByText } = getQueriesForElement(root)
  expect(getByText('Overview', {selector: 'h3'})).not.toBeNull()
});


test("The initial render has two charts", () => {
  const { getAllByText } = render(<App />);
  // this works because we are mocking the chart component
  expect(getAllByText('Here is a chart').length).toBe(2)
});


test("a click on campaigns takes you to Campaigns view", () => {
  const { getByText } = render(<App />);
  fireEvent.click(getByText('Campaigns'))
  getByText('campaign 1')
  getByText('campaign 2')
});

test("a click on create takes you to Create view", () => {
  const { getByText } = render(<App />);
  fireEvent.click(getByText('Create'))
  getByText('Create Campaign')
});

test("adding a campaign adds a campaign", () => {
  const { getByText } = render(<App />);
  // go to 'Create' tab
  fireEvent.click(getByText('Create'));
  // enter something in input field
  const inputField = document.querySelector('input')
  userEvent.type(inputField, 'My new campaign')
  // click the button
  const createButton = getByText('Create Campaign');
  fireEvent.click(createButton);
  // to to 'Campaigns'
  fireEvent.click(getByText('Campaigns'));
  // check to see if new campaign is there
  getByText('My new campaign')
});
