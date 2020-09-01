import React, { Fragment, useState } from "react";
import LineGraph from "./LineGraph";

export default function Campaigns({ campaignStoreData }) {
  const [view, changeView] = useState("campaign 1");

  const campaignList = Object.keys(campaignStoreData);

  function selectInstallData(view) {
    return campaignStoreData[view].installData;
  }
  const installData = selectInstallData(view);

  return (
    <Fragment>
      <select onChange={(e) => changeView(e.target.value)}>
        {campaignList.map((campaign) => (
          <option key={campaign} value={campaign}>
            {campaign}
          </option>
        ))}
      </select>
      <LineGraph yaxis="installs" data={installData} />
    </Fragment>
  );
}
