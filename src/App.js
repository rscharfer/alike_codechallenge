import React from "react";

import { CreateCampaignWithHeader } from "./Create";
import Navigation from "./Navigation";
import { JackedUpOverview } from "./Overview";
import { JackedUpCampaigns } from "./Campaigns";

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
  const [currentView, setCurrentView] = React.useState("overview");
  const [overviewData, setOverviewData] = React.useState(null);

  const [campaignData, dispatch] = React.useReducer(campaignReducer, {});

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

  React.useEffect(() => {
    fetchOverviewDataWrapper();
  }, []);

  React.useEffect(() => {
    fetchCampaignDataWrapper();
  }, []);

  const createNewCampaign = (campaignName) => {
    dispatch({
      type: "createCampaign",
      payload: {
        name: campaignName,
        installData: [],
      },
    });
  };

  return (
    <>
      <Navigation onNavChange={setCurrentView} />
      {
        {
          overview: <JackedUpOverview weeksData={overviewData} />,
          campaigns: <JackedUpCampaigns campaignStoreData={campaignData} />,
          create: <CreateCampaignWithHeader clickHandler={createNewCampaign} />,
        }[currentView]
      }
    </>
  );
};

export default App;
