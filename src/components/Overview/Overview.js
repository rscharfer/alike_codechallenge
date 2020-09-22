import React from "react";
import LineGraph from "../LineGraph/LineGraph";

import styled from "@emotion/styled";

import { pipe } from "../../utils/utilities";
import { withNoNull, withHeader } from "../../hocs/hocs";

const OverviewContainer = styled.div`
  display: flex;
`;

export default function Overview({ weeksData }) {
  const installsData = weeksData.installs.map((d) => d.value);
  const revenueData = weeksData.revenue.map((d) => d.value);

  return (
    <OverviewContainer>
      <LineGraph yaxis="installs" data={installsData} />
      <LineGraph yaxis="revenue" data={revenueData} />
    </OverviewContainer>
  );
}

export const OverviewView = pipe(
  withNoNull("weeksData"),
  withHeader("Overview")
)(Overview);
