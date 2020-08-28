import React, { Fragment, useState } from "react";
import LineGraph from "./LineGraph";

export default function Campaigns({ campaignStore }) {
  const [view, setView] = useState("campaign 1");
  const campaigns = Object.keys(campaignStore);
  // TODO: Proptypes! Typesecropt
  return (
    <Fragment>
      <select onChange={(e) => setView(e.target.value)}>
        {campaigns.map((campaign) => (
          <option key={campaign} value={campaign}>
            {campaign}
          </option>
        ))}
      </select>
      <LineGraph yaxis="installs" data={campaignStore[view].installData} />
    </Fragment>
  );
}
