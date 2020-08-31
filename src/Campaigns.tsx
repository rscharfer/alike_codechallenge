import React, { Fragment, useState } from "react";
import LineGraph from "./LineGraph";


interface CampaignProps {
  campaignStore: {
    [prop: string] :{
      installData : number[],
    }
  }
}

export default function Campaigns({ campaignStore } : CampaignProps) {
  const [view, setView] = useState("campaign 1");
  const campaigns = Object.keys(campaignStore);
  return (
    <Fragment>
      <select
        onChange={(e) => setView(e.target.value)}
      >
        {campaigns.map((campaign) => (
          <option key={campaign} value={campaign}>
            {campaign}
          </option>
        ))}
      </select>
      { campaignStore && campaignStore[view] && <LineGraph yaxis="installs" data={campaignStore[view].installData} />}
   
    </Fragment>
  );
}
