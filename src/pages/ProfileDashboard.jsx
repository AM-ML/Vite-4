import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function ProfileDashboard() {
  return (
    <div className='container'>
      <div className="row pt-3">
        <div className="col">
            <h3 className="text-center text-blue"><b>Book Visitors / Buyers</b></h3>
        </div>
      </div>

      <div className="row mt-3">
        <Chart v2={5698} v1={450} m1="Buyers" m2="Visitors" />
      </div>

    </div>
  )
}
export const Chart = (props) => {
  const data = [
    { name: 'Buyers', value: props.v1 },
    { name: 'Visitors', value: props.v2 }  
  ];
  
  const COLORS = ['#abc', '#18f'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }  

  return <div className="row">
    <div className="col-6">
    <ResponsiveContainer minWidth="100%" minHeight="200px">
        <PieChart width={400} height={200} style={{"margin-top": "0"}}>
          <Pie className='p-0 m-0'
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="col-3 pt-5 mt-5">
      <div className="w-40px h-40px color-18f"></div> {props.v1 > props.v2? props.m1 : props.m2}
      <br />
      <div className="w-40px h-40px color-abc mt-3"></div> {props.v1 > props.v2? props.m2: props.m1}
    </div>
  </div>
}