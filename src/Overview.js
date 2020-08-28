import React from "react";
import LineGraph from "./LineGraph";

import styled from "@emotion/styled";


const FlexDiv = styled.div`
  display: flex;
`;

export default function Overview({ weeksData }) {
  return (
    <FlexDiv>
      <LineGraph yaxis="installs" data={weeksData.installData} />
      <LineGraph yaxis="revenue" data={weeksData.revenueData} />
    </FlexDiv>
  );
}
