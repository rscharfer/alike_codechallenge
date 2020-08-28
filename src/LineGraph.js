import React from 'react'
import Chart from 'react-apexcharts';


const options = {
  xaxis: {
    categories: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  }
}




export default function LineGraph({ yaxis, data }){

  const series = [
    { name : yaxis, data},
  ]
  
  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width="500"
    />
  )
}