import React, { Fragment } from 'react';
import LineGraph from './LineGraph';



export default function Overview({ thisWeeksData }){
  return (
    <div style={{display: 'flex'}}>
       <LineGraph yaxis='installs' data={[30, 40, 45, 50, 49, 60, 70, 91]}/>
       <LineGraph yaxis='revenue' data={[30, 40, 45, 50, 49, 60, 70, 91]}/>
    </div>
  )
} 