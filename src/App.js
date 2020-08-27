import React, { Fragment, useState, useReducer } from 'react';
import Navigation from './Navigation'
import Overview from './Overview'
import Campaigns from './Campaigns'
import Create from './Create'

import './App.css';


const campaignReducer = (state, action) => {
  switch(action.type){
    case 'createCampaign' : {
      return {... state, [action.payload.name] : {
        installData: action.payload.installData,
        revenueData: action.payload.revenueData
      }}
    }
    default:
      return state
  }
}

const initState = {
  'campaign 1' : {
    installData: [3],
    revenueData: [4],
  },
  'campaign 2' : {
    installData: [5],
    revenueData: [6],
  }
}

function App() {
  const [currentView, setCurrentView] = useState('overview')
  const [ campaignStore, dispatch ] = useReducer(campaignReducer, initState)

  const selectCampaignData = campaign => campaignStore[campaign]

  console.log('store', campaignStore);

  return (
    <Fragment>
      <Navigation onNavChange = {setCurrentView}/>
      {(function() {
        switch (currentView) {
          case 'overview':
            return <Overview thisWeeksData={selectCampaignData('campaign 2')}/>;
            // return <div>hello</div>
          case 'campaigns':
            return <Campaigns campaignStore={campaignStore}/>;
          case 'create':
           return <Create dispatch={dispatch}/>;
           // return <div>thscüss</div>
          default:
            return null;
      }
  })()}
    </Fragment>
  )
}

export default App;
