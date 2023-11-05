import React from 'react'
import { Graph } from './ProfileViews'

const data =[
    {label: "Day 0", "Sold Books": 0, "Sold Articles":     0 },
    {label: "Day 1", "Sold Books": 10, "Sold Articles":    2 },
    {label: "Day 2", "Sold Books": 5, "Sold Articles":    10 },
    {label: "Day 3", "Sold Books": 20, "Sold Articles":   50 },
    {label: "Day 4", "Sold Books": 50, "Sold Articles":   20 },
    {label: "Day 5", "Sold Books": 30, "Sold Articles":   15 },
    {label: "Day 6", "Sold Books": 32, "Sold Articles":  152 },
    {label: "Day 7", "Sold Books": 100, "Sold Articles":  50 },
]

export function ProfileSales() {
  return (
    <div className='container'>
      <div className="row mt-3">
        <div className="col">
            <h4 className="text-center text-blue"><b>
                Sales in The Last 7 Days    
            </b></h4>
        </div>
      </div>
      <div className="row mt-3">
        <Graph data={data} value1="Sold Books" value2="Sold Articles"/>
      </div>
    </div>
  )
}
