import React, { Fragment, useState, useReducer, useEffect } from "react";

import Create from "./Create";
import Navigation from "./Navigation";
import Overview from "./Overview";
import Campaigns from "./Campaigns";

import fetchOverviewData from "./api";
import fetchCampaignData from "./apiFunctionsForCampaign";

const withHeader = (name) => (Component) => (props) => {
  return (
    <section>
      <h3>{name}</h3>
      <Component {...props} />
    </section>
  );
};

const withNoEmptyObject = (maybeEmptyObjectProp) => (Component) => (props) => {
  if (Object.keys(props[maybeEmptyObjectProp]).length === 0)
    return `${maybeEmptyObjectProp} is empty`;
  else return <Component {...props} />;
};

const withNoNull = (maybeNullProp) => (Component) => (props) => {
  return props[maybeNullProp] === null ? null : <Component {...props} />;
};

const pipe = (...fncs) => (component) =>
  fncs.reduce((acc, next) => next(acc), component);

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
//

const App = () => {
  const [currentView, setCurrentView] = useState("overview");
  const [overviewData, setOverviewData] = useState(null);

  const [campaignData, dispatch] = useReducer(campaignReducer, {});

  const CreateWithHeader = withHeader("Create")(Create);

  const JackedUpCampaignComponent = pipe(
    withHeader("Campaigns"),
    withNoEmptyObject("campaignStoreData")
  )(Campaigns);

  const JackedUpOverview = pipe(
    withNoNull("weeksData"),
    withHeader("Overview")
  )(Overview);

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
