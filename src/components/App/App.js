import React from "react";

import { CreateCampaignView } from "../CreateCampaign/CreateCampaign";
import Navigation from "../Navigation/Navigation";
import { OverviewView } from "../Overview/Overview";
import { CampaignsView } from "../Campaigns/Campaigns";

import fetchOverviewData from "../../api/api";
import fetchCampaignData from "../../api/apiFunctionsForCampaign";

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
          overview: <OverviewView weeksData={overviewData} />,
          campaigns: <CampaignsView campaignStoreData={campaignData} />,
          create: <CreateCampaignView clickHandler={createNewCampaign} />,
        }[currentView]
      }
    </>
  );
};

export default App;
