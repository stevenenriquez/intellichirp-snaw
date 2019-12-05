import React, { PureComponent } from 'react';

import {
  PieChart, Pie, Legend, Tooltip, Sector, Cell,
} from 'recharts';

const data01 = [
  { name: 'Geophony', value: 400 },
  { name: 'Biophony', value: 300 },
  { name: 'Anthrophony', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/k9jkog04/';

  render() {
    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data01}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {
            data01.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip/>
        <Legend/>
      </PieChart>
    );
  }
}
