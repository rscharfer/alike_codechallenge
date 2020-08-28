import React, { Fragment, useState, useReducer } from "react";
import Navigation from "./Navigation";
import Overview from "./Overview";
import Campaigns from "./Campaigns";
import Create from "./Create";

// tests
// styled components
// type script
// start a portfolio site
// write marcel
// look at logic again

import "./App.css";

const withHeader = (Component : Function) : Function => (props : { 
  [prop : string ] : any 
}) => {
  return (
    <section>
      <h3>{Component.name}</h3>
      <Component {...props} />
    </section>
  );
};

interface ActionObject{
  type: string,
  [prop: string] : any
}

const campaignReducer = (state : {
  [prop: string] : {
    installData: number[],
    revenueData: number[],
  }
}, action : ActionObject) => {
  switch (action.type) {
    case "createCampaign": {
      return {
        ...state,
        [action.payload.name]: {
          installData: action.payload.installData,
          revenueData: action.payload.revenueData,
        },
      };
    }
    default:
      return state;
  }
};
//

const initState = {
  "campaign 1": {
    installData: [0, 123, 50, 80, 260, 25, 200],
    revenueData: [10, 60, 80, 23, 70, 23, 32],
  },
  "campaign 2": {
    installData: [123, 50, 80, 260, 25, 200, 0],
    revenueData: [60, 80, 23, 70, 23, 32, 10],
  },
};

function App() {
  const [currentView, setCurrentView] = useState("overview");
  const [campaignStore, dispatch] = useReducer(campaignReducer, initState);

  const selectCampaignData = (campaign : string ) => campaignStore[campaign];

  const OverviewWithHeader = withHeader(Overview);
  const CampaignsWithHeader = withHeader(Campaigns);
  const CreateWithHeader = withHeader(Create);

  return (
    <Fragment>
      <Navigation onNavChange={setCurrentView} />
      {(function () {
        switch (currentView) {
          case "overview":
            // a week corresponds to a new campaign
            return (
              <OverviewWithHeader
                weeksData={selectCampaignData("campaign 2")}
              />
            );
          case "campaigns":
            return <CampaignsWithHeader campaignStore={campaignStore} />;
          case "create":
            return <CreateWithHeader dispatch={dispatch} />;
          default:
            return null;
        }
      })()}
    </Fragment>
  );
}

export default App;
