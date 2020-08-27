import React, { Fragment, useState } from 'react';



export default function Campaigns({ campaignStore }){
  const [view, setView] = useState('campaign 1');
  const campaigns = Object.keys(campaignStore)
  return (
    <Fragment>
      <select onChange={e => setView(e.target.value)}>
        { campaigns.map( campaign => 
          <option 
            key={campaign} 
            value={campaign}>
              {campaign}
          </option>
        )}
      </select>
      {/* <LineGraph max={null} min={null} lines={null} name={campaign}/> */}
      </Fragment>
  )
} 