import React, {PureComponent} from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

const series = [
  {
    name: 'Anthrophony',
    color: '#0088FE',
    data: [
      { category: 'Chainsaw', time: 1 },
      { category: 'Bus', time: 2 },
      { category: 'None', time: 3 },
      { category: 'Bus', time: 34 },
      { category: 'None', time: 36 },
      { category: 'Bus', time: 39 },
      { category: 'None', time: 42 },
      { category: 'None', time: 60 }
    ],
  },
  {
    name: 'Geophony',
    color: '#00C49F',
    data: [
      { category: 'Rain', time: 1 },
      { category: 'Rain', time: 60 }
    ],
  },
  {
    name: 'Biophony',
    color: '#FFBB28',
    data: [
      { category: 'None', time: 1 },
      { category: 'Birds', time: 2 },
      { category: 'Crickets', time: 12 },
      { category: 'Birds', time: 40 },
      { category: 'Birds', time: 44 },
      { category: 'Crickets', time: 50 },
      { category: 'Birds', time: 55 },
      { category: 'Birds', time: 60 }
    ],
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/zsax2hyq/';

  render() {
    return (
      <LineChart
        width={600}
        height={400}
        stackOffset="expand"
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" type='number'/>
        <YAxis dataKey="category" type='category'/>
        <Legend />
        <Tooltip />
        {series.map( s => (
            <Line dataKey='category' data={s.data} name={s.name} key={s.name} stroke={s.color} type='stepAfter' strokeWidth='3'/>
        ))}
      </LineChart>
    );
  }
}
