import React, { useState, Fragment } from 'react';


export default function Create({ dispatch }){
  const [ view, setView ] = useState('campaign 1')
  const [ textValue, setTextValue] = useState('')
  return (
    <Fragment>
      <input value={textValue} onChange={ event => setTextValue(event.target.value)} />
      <button 
        onClick={() => {
          dispatch({
            type: 'createCampaign',
            payload: {
              name : textValue,
              revenueData: null,
              installData: null
            }})
          setTextValue('')
        }}>
        Create Campaign
      </button>
    </Fragment>)
} 