import React from "react";
import LineGraph from "./LineGraph";

import styled from "@emotion/styled";

import { pipe } from "./utilities";
import { withNoNull, withHeader } from "./hocs";

const FlexDiv = styled.div`
  display: flex;
`;

export default function Overview({ weeksData }) {
  const installsData = weeksData.installs.map((d) => d.value);
  const revenueData = weeksData.revenue.map((d) => d.value);

  return (
    <FlexDiv>
      <LineGraph yaxis="installs" data={installsData} />
      <LineGraph yaxis="revenue" data={revenueData} />
    </FlexDiv>
  );
}

export const JackedUpOverview = pipe(
  withNoNull("weeksData"),
  withHeader("Overview")
)(Overview);
