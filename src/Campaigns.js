import React from "react";
import LineGraph from "./LineGraph";

import { withHeader, withNoEmptyObject } from "./hocs";
import { pipe } from "./utilities";

export default function Campaigns({ campaignStoreData }) {
  // when know there will be something to show the user from the campaign store
  // but we do not know what.  There will either be data from the API or something from the user itself
  const [view, changeView] = React.useState(Object.keys(campaignStoreData)[0]);
  const campaignList = Object.keys(campaignStoreData);

  function selectInstallData(view) {
    return campaignStoreData[view].installData;
  }
  const installData = selectInstallData(view);

  return (
    <>
      <select onChange={(e) => changeView(e.target.value)}>
        {campaignList.map((campaign) => (
          <option key={campaign} value={campaign}>
            {campaign}
          </option>
        ))}
      </select>
      <LineGraph yaxis="installs" data={installData} />
    </>
  );
}

export const JackedUpCampaigns = pipe(
  withHeader("Campaigns"),
  withNoEmptyObject("campaignStoreData")
)(Campaigns);
