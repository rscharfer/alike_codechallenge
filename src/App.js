import React, { Fragment, useState, useReducer, useEffect } from "react";

import { CreateWithHeader } from "./Create";
import Navigation from "./Navigation";
import { JackedUpOverview } from "./Overview";
import { JackedUpCampaignComponent } from "./Campaigns";

import fetchOverviewData from "./api";
import fetchCampaignData from "./apiFunctionsForCampaign";

const campaignReducer = (state, action) => {
  switch (action.type) {
    case "createCampaign": {
      return {
        ...state,
        [action.payload.name]: {
          installData: action.payload.installData,
        },
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

    response.forEach((campaign) => {
      dispatch({
        type: "createCampaign",
        payload: {
          name: campaign.name,
          installData: campaign.installs.map((i) => i.value),
        },
      });
    });
  }
  useEffect(() => {
    fetchOverviewDataWrapper();
  }, []);

  useEffect(() => {
    fetchCampaignDataWrapper();
  }, []);

  return (
    <Fragment>
      <Navigation onNavChange={setCurrentView} />
      {(function () {
        switch (currentView) {
          case "overview":
            return <JackedUpOverview weeksData={overviewData} />;
          case "campaigns":
            return (
              <JackedUpCampaignComponent campaignStoreData={campaignData} />
            );
          case "create":
            return <CreateWithHeader dispatch={dispatch} />;
          default:
            return null;
        }
      })()}
    </Fragment>
  );
};

export default App;
