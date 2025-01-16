import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const StatsChart = ({ stats }) => {
  return (
    <BarChart width={600} height={300} data={stats}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="_id" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="raised" fill="#8884d8" />
      <Bar dataKey="resolved" fill="#82ca9d" />
    </BarChart>
  );
};

export default StatsChart;
