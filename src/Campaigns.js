import React, { Fragment, useState } from "react";
import LineGraph from "./LineGraph";

export default function Campaigns({ campaignStoreData }) {
  // when know there will be something to show the user from the campaign store
  // but we do not know what.  There will either be data from the API or something from the user itself
  const [view, changeView] = useState(Object.keys(campaignStoreData)[0]);
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
