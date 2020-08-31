import React from "react";
import LineGraph from "./LineGraph";

import styled from "@emotion/styled";

const FlexDiv = styled.div`
  display: flex;
`;

export default function Overview({ weeksData }) {
  // will be null initially until useEffect grabs the data
  if (!weeksData) return null;

  const installsData = weeksData.installs.map( d => d.value)
  const revenueData = weeksData.revenue.map( d => d.value)
  return (
    <FlexDiv>
      <LineGraph yaxis="installs" data={installsData} />
      <LineGraph yaxis="revenue" data={revenueData} />
    </FlexDiv>
  );
}
