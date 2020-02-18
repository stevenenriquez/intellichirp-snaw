import React, {PureComponent} from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

// TODO:: Dynamically add data to graphs from json request Issue #7

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class Example extends PureComponent {
  render() { return (
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
        {this.props.series.map( s => (
            <Line dataKey='category' 
                  data={s.data} 
                  name={s.name} 
                  key={s.name} 
                  stroke={s.color} 
                  type='step' 
                  strokeWidth='3'/>
        ))}
      </LineChart>
    );
  }
}
