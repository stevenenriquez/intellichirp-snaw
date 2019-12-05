import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area
} from 'recharts';

const data = [
  {
      time: '0', name: 'Rain', geo:100, bio:0, ant:0
  },
  {
      time: '2', name: 'Birds', geo:0, bio:100, ant:0
  },
  {
      time: '4', name: 'Birds', geo:0, bio:100, ant:0
  },
  {
      time: '6', name: 'Birds', geo:0, bio:100, ant:0
  },
  {
      time: '8', name: 'Rain', geo:100, bio:0, ant:0
  },
  {
      time: '10', name: 'Rain', geo:100, bio:0, ant:0
  },
  {
      time: '12', name: 'Rain', geo:100, bio:0, ant:0
  },
  {
      time: '14', name: 'Cricket', geo:0, bio:100, ant:0
  },
  {
      time: '16', name: 'Rain', geo:100, bio:0, ant:0
  },
  {
      time: '18', name: 'Rain', geo:100, bio:0, ant:0
  },
  {
      time: '20', name: 'Rain', geo:100, bio:0, ant:0
  },
  {
      time: '22', name: 'Birds', geo:0, bio:100, ant:0
  },
  {
      time: '24', name: 'Birds', geo:0, bio:100, ant:0
  },
  {
      time: '26', name: 'Birds', geo:0, bio:100, ant:0
  },
  {
      time: '28', name: 'Car', geo:0, bio:0, ant:100
  },
  {
      time: '30', name: 'Car', geo:0, bio:0, ant:100
  },
  {
      time: '32', name: 'Rain', geo:100, bio:0, ant:0
  },
  {
      time: '34', name: 'Birds', geo:0, bio:100, ant:0
  },
  {
      time: '36', name: 'Rain', geo:100, bio:0, ant:0
  },
  {
      time: '38', name: 'Rain', geo:100, bio:0, ant:0
  },
  {
      time: '40', name: 'Rain', geo:100, bio:0, ant:0
  },
];

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;
const renderTooltipContent = (o) => {
  const { payload, label } = o;
  const total = payload.reduce((result, entry) => (result + entry.value), 0);

  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
        {
        	payload.map((entry, index) => (
          	<li key={`item-${index}`} style={{ color: entry.color }}>
            	{`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
           </li>
        	))
        }
      </ul>
    </div>
  );
};

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/zsax2hyq/';

  render() {
    return (
      <AreaChart
        width={600}
        height={400}
        data={data}
        stackOffset="expand"
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis tickFormatter={toPercent} />
        <Tooltip content={renderTooltipContent} />
        <Legend />
        <Area type="monotone" dataKey="geo" stackId="1" stroke="#037FFC" fill="#037FFC" />
        <Area type="monotone" dataKey="bio" stackId="1" stroke="#5AC733" fill="#5AC733" />
        <Area type="monotone" dataKey="ant" stackId="1" stroke="#FCAD03" fill="#FCAD03" />
      </AreaChart>
    );
  }
}
