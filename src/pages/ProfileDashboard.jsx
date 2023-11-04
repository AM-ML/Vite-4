import React from 'react'
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { label: 'Day 0', views: 0},
  { label: 'Day 1', views: 21},
  { label: 'Day 2', views: 35},
  { label: 'Day 3', views: 75},
  { label: 'Day 4', views: 51},
  { label: 'Day 5', views: 41},
  { label: 'Day 6', views: 47},
  { label: 'Day 7', views: 200}
];

export function ProfileDashboard() {
  return (
    <div className="container">
      <div className="row">
          <div className="col">
            <h1 className='text-center'>Dashboard</h1>
          </div>
      </div>

      <div className="row">
            <div className="col">
              <ResponsiveContainer width="70%" height={300}>
                <LineChart data={data} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
                  <Tooltip />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <Legend/>
                  <Line type="monotone" dataKey="views" stroke="#FB8833" />
                  <Line type="monotone" dataKey="leads" stroke="#17A8F5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
      </div>


    </div>
  )
}