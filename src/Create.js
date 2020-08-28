import React, { useState, Fragment } from 'react';


export default function Create({ dispatch }){
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
              revenueData: [],
              installData: []
            }})
          setTextValue('')
        }}>
        Create Campaign
      </button>
    </Fragment>)
} 