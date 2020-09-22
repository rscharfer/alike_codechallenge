/* eslint-disable no-unused-vars */
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import React from "react";
import axios from 'axios';

// mocked
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import apiFunctions from "../../api/api";
import apiFunctionsForCampaign from "../../api/apiFunctionsForCampaign";

import App from "./App";

jest.mock('axios')

jest.mock("react-apexcharts", () => (props) => {
  const { series } = props;
  const data = series[0].data;
  const name = series[0].name;

  const dataDivs = data.map((piece) => (
    <div key={piece} className="fakeChartRow">{`${name}: ${piece}`}</div>
  ));
  return <div className="fakeChart">{dataDivs}</div>;
});

jest.mock("apexcharts", () => ({
  exec: () => new Promise((res, rej) => res("uri")),
}));

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

jest.mock("./api", () => () =>
  Promise.resolve({
    installs: [
      { day: "monday", value: 145 },
      { day: "tuesday", value: 256 },
      { day: "wednesday", value: 190 },
      { day: "thursday", value: 204 },
      { day: "friday", value: 120 },
      { day: "saturday", value: 156 },
      { day: "sunday", value: 135 },
    ],
    revenue: [
      { day: "monday", value: 45.7 },
      { day: "tuesday", value: 50.3 },
      { day: "wednesday", value: 34.6 },
      { day: "thursday", value: 54.8 },
      { day: "friday", value: 67.4 },
      { day: "saturday", value: 20.5 },
      { day: "sunday", value: 43.8 },
    ],
  })
);

jest.mock("./apiFunctionsForCampaign", () => () =>
  Promise.resolve([
    {
      id: "08a92372-9c8a-4649-b627-2e503b839c67",
      name: "campaign 1",
      installs: [
        { day: "monday", value: 45 },
        { day: "tuesday", value: 56 },
        { day: "wednesday", value: 22 },
        { day: "thursday", value: 52 },
        { day: "friday", value: 30 },
        { day: "saturday", value: 32 },
        { day: "sunday", value: 32 },
      ],
    },
    {
      id: "edc6012f-4983-47dc-b1ce-b09dea89f847",
      name: "campaign 2",
      installs: [
        { day: "monday", value: 10 },
        { day: "tuesday", value: 15 },
        { day: "wednesday", value: 55 },
        { day: "thursday", value: 78 },
        { day: "friday", value: 45 },
        { day: "saturday", value: 50 },
        { day: "sunday", value: 20 },
      ],
    },
    {
      id: "79cfe6c8-f267-42eb-bc01-d93e0cc8315a",
      name: "campaign 3",
      installs: [
        { day: "monday", value: 45 },
        { day: "tuesday", value: 65 },
        { day: "wednesday", value: 54 },
        { day: "thursday", value: 57 },
        { day: "friday", value: 30 },
        { day: "saturday", value: 40 },
        { day: "sunday", value: 51 },
      ],
    },
    {
      id: "1427e2fb-36de-402c-a471-644ad67d2e8e",
      name: "campaign 4",
      installs: [
        { day: "monday", value: 10 },
        { day: "tuesday", value: 5 },
        { day: "wednesday", value: 13 },
        { day: "thursday", value: 23 },
        { day: "friday", value: 11 },
        { day: "saturday", value: 8 },
        { day: "sunday", value: 3 },
      ],
    },
  ])
);

describe("render the app, and let it do all of the effects too", () => {
  test("<App/>", async () => {
    console.log('mocked module', axios)
    await act(async () => {
      render(<App />, container);
    });
    expect(container.querySelector("h3").textContent).toBe("Overview");

    expect(container.textContent).toContain("installs: 145");
    expect(container.textContent).toContain("installs: 190");
    expect(container.textContent).toContain("installs: 204");

    expect(container.textContent).toContain("revenue: 45.7");
    expect(container.textContent).toContain("revenue: 20.5");
    expect(container.textContent).toContain("revenue: 43.8");
  });
});
