import React, { useState, useReducer, useEffect } from "react";

import { CreateWithHeader } from "./Create";
import Navigation from "./Navigation";
import { JackedUpOverview } from "./Overview";
import { JackedUpCampaignComponent } from "./Campaigns";

import fetchOverviewData from "./api";
import fetchCampaignData from "./apiFunctionsForCampaign";

const campaignReducer = (state, action) => {
  switch (action.type) {
    case "createCampaigns": {
      const initCampaignDataObject = {};
      // make new object with the data to merge into state
      const campaignData = action.payload.reduce((acc, next) => {
        const campaignName = next.name;
        const campaignInstallData = next.installs.map((i) => i.value);
        return {
          ...acc,
          [campaignName]: {
            installData: campaignInstallData,
          },
        };
      }, initCampaignDataObject);
      // merge it all together
      return {
        ...state,
        ...campaignData,
      };
    }
    default:
      return state;
  }
};

const App = () => {
  const [currentView, setCurrentView] = useState("overview");
  const [overviewData, setOverviewData] = useState(null);

  const [campaignData, dispatch] = useReducer(campaignReducer, {});

  async function fetchOverviewDataWrapper() {
    const response = await fetchOverviewData();
    setOverviewData(response);
  }

  async function fetchCampaignDataWrapper() {
    const response = await fetchCampaignData();
    dispatch({
      type: "createCampaigns",
      payload: response,
    });
  }

  useEffect(() => {
    fetchOverviewDataWrapper();
  }, []);

  useEffect(() => {
    fetchCampaignDataWrapper();
  }, []);

  return (
    <>
      <Navigation onNavChange={setCurrentView} />
      {
        {
          overview: <JackedUpOverview weeksData={overviewData} />,
          campaigns: (
            <JackedUpCampaignComponent campaignStoreData={campaignData} />
          ),
          create: <CreateWithHeader dispatch={dispatch} />,
        }[currentView]
      }
    </>
  );
};

export default App;
