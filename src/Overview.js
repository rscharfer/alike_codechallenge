import React from "react";
import LineGraph from "./LineGraph";

export default function Overview({ weeksData }) {
  return (
    <div className="overviewWrapper">
      <LineGraph yaxis="installs" data={weeksData.installData} />
      <LineGraph yaxis="revenue" data={weeksData.revenueData} />
    </div>
  );
}
