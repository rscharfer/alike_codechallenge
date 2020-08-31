import React, {
  Fragment,
  useState,
  useReducer,
  useEffect
} from "react";
import axios from "axios";

import Create from "./Create";
import Navigation from "./Navigation";
import Overview from "./Overview";
import Campaigns from "./Campaigns";

// just wraps component with section tag and gives header
const withHeader = (Component: Function, name: string): Function => (props: {
  [prop: string]: any;
}) => {
  return (
    <section>
      <h3>{name}</h3>
      <Component {...props} />
    </section>
  );
};

interface ActionObject {
  type: string;
  payload : {
    name : string;
    installData: number[]
  }
}



const campaignReducer = (
  state: {
    [prop: string]: {
      installData: number[];
    };
  },
  action: ActionObject
) => {
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
  // this state will have a value of string
  const [currentView, setCurrentView] = useState<string>("overview");
  // this state will have a value of null or that object type
  const [overviewData, setOverviewData] = useState< null | {
    installs: Object[],
    revenue: Object[]
  }>(null);
  // tracking the campaign data
  const [campaignStore, dispatch] = useReducer(campaignReducer, {});

  // adding a uniform header to each of the views
  const OverviewWithHeader = withHeader(Overview, "Overview");
  const CampaignsWithHeader = withHeader(Campaigns, "Campaigns");
  const CreateWithHeader = withHeader(Create, "Create");

  useEffect(() => {
    // get the data and set it when we have it 
    async function fetchData(){
      const response = await axios.get("http://5c3db915a9d04f0014a98a79.mockapi.io/overview");
      setOverviewData(response.data)
    }
    fetchData();

  }, []);

  useEffect(() => {
    // get the data and set it when we have it 
    async function fetchData(){
      const response = await axios.get("http://5c3db915a9d04f0014a98a79.mockapi.io/campaigns");
      // get the data and set it when we have it
      response.data.forEach(campaign => {
        dispatch({
          type: 'createCampaign',
          payload: {
            name: campaign.name,
            installData: campaign.installs.map( i => i.value)
          }
        })
      })
    }
    fetchData();

  }, []);

  return (
    <Fragment>
      <Navigation onNavChange={setCurrentView} />
      {(function () {
        switch (currentView) {
          case "overview":
            // a week corresponds to a new campaign
            return <OverviewWithHeader weeksData={overviewData} />;
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
};

export default App;
