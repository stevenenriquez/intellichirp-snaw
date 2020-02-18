import React, {PureComponent} from 'react';
import {Cell, Legend, Pie, PieChart, Tooltip,} from 'recharts';

// TODO:: Dynamically add data to graphs from json request Issue #7

function getTotals(classification_dict) {
    var anthro_total = 0;
    var bio_total = 0;
    var geo_total = 0;
    var non_total = 0;
    for(var i=0; i < classification_dict[0].data.length; i++) {
        if(classification_dict[0].data[i].category === "NO" &&
            classification_dict[1].data[i].category === "NO" &&
            classification_dict[2].data[i].category === "NO" ) {
            non_total += 1
        }
        else if(classification_dict[0].data[i].category !== "NO") {
            anthro_total += 1
        }
        if(classification_dict[1].data[i].category !== "NO") {
            bio_total += 1
        }
        if(classification_dict[2].data[i].category !== "NO") {
            geo_total += 1
        }
    }
    return [anthro_total, bio_total, geo_total, non_total]
}

var anthro_total = 0;
var bio_total = 0;
var geo_total = 0;
var pie_data = [
    { name : 'Anthrophony', value : anthro_total },
    { name : 'Biophony', value : bio_total },
    { name : 'Geophony', value : geo_total }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/k9jkog04/';

  render() {

      var totals = getTotals( this.props.series );
      var anthro_total = totals[0];
      var bio_total = totals[1];
      var geo_total = totals[2];
      var none_total = totals[3];

    pie_data = [
      { name : 'Anthrophony', value : anthro_total },
      { name : 'Biophony', value : bio_total },
      { name : 'Geophony', value : geo_total },
        { name : 'None', value : none_total }
      ];

    return (
      <PieChart width={400} height={400}>
        <Pie
          data={pie_data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {
            pie_data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip/>
        <Legend/>
      </PieChart>
    );
  }
}
