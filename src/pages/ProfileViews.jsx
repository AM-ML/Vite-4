import React from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';


export function ProfileViews() {
  const data = [
    { label: 'Day 0',"Book Views": 0,    "Article Views": 0},
    { label: 'Day 1',"Book Views": 1001, "Article Views": 50},
    { label: 'Day 2',"Book Views": 2005, "Article Views": 100},
    { label: 'Day 3',"Book Views": 3445, "Article Views": 500},
    { label: 'Day 4',"Book Views": 4021, "Article Views": 5000},
    { label: 'Day 5',"Book Views": 3357, "Article Views": 3000},
    { label: 'Day 6',"Book Views": 2169, "Article Views": 6000},
    { label: 'Day 7',"Book Views": 1000, "Article Views": 10000}
  ];
  return (
    <div className="container">
      <div className="row mt-5">
          <div className="col">
            <h4 className='text-center text-blue'><b>Your Views in the last 7 Days</b></h4>
          </div>
      </div>

      <div className="row mt-3">
            <Graph data={data} value1="Book Views" value2="Article Views"/>
      </div>


    </div>
  )
}

export const Graph = (props) => {
  
  return <div className="col m-auto text-center">
          <ResponsiveContainer width="97%" height={300}>
            <LineChart data={props.data} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
              <Tooltip />
              <XAxis dataKey="label" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Legend/>
              <Line type="monotone" dataKey={props.value1} stroke="#17A8F5" />
              {props.value2? <Line type="monotone" dataKey={props.value2} stroke="#E8AC41" />: null }
            </LineChart>
          </ResponsiveContainer>
        </div>
}