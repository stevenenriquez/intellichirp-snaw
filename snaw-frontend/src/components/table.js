import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

/* TODO:: Finish displaying every type of data needed for the user Issue #15
   TODO:: Dynamically add rows and data from classification results and acoustic indices results Issue #16
*/

function createData(class_name, seconds, percentage) {
  return { class_name, seconds, percentage };
}

// MOCK DATA
const rows = [
  createData('Geophony', 14, 45),
  createData('Biophony', 12, 45),
  createData('Anthrophony', 4, 10),
];

const rows2 = [
  {"class_name" : "Geophony", "seconds" : 14, "percentage" : 45}
];

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

function getTotalSecs(classification_dict) {
  var total = 0;
  classification_dict.map( s => (
      total += 1
  ));
  return total;
}

export default function SimpleTable(props) {
  const classes = useStyles();

  //var anthro_total = getTotals( props.series[0].data ); // Total number of ant classes with non NO categ
  //var bio_total = getTotals( props.series[1].data ); // Total number of bio classes with non NO categ
  //var geo_total = getTotals( props.series[2].data ); // Total number of geo classes with non No categ

  // eslint-disable-next-line no-undef
  var totals = getTotals( props.series );
  var anthro_total = totals[0];
  var bio_total = totals[1];
  var geo_total = totals[2];
  var none_total = totals[3];

  var total_secs = getTotalSecs( props.series[0].data ); // Total number of seconds the audio file is

  // adding data to the table
  var table_data = [
    { name : 'Anthrophony', value : anthro_total.toString() + "s",
      percent : (Math.floor((anthro_total / total_secs)*100)).toString() + "%" },
    { name : 'Biophony', value : bio_total.toString() + "s",
      percent : (Math.floor((bio_total / total_secs)*100)).toString() + "%" },
    { name : 'Geophony', value : geo_total.toString() + "s",
      percent : (Math.floor((geo_total / total_secs)*100)).toString() + "%" },
    { name: 'None', value : none_total.toString() + "s",
      percent : (Math.floor((none_total / total_secs)*100)).toString() + "%"}
  ];

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">Classification Type</Typography></TableCell>
            <TableCell align="right"><Typography variant="h6">Seconds</Typography></TableCell>
            <TableCell align="right"><Typography variant="h6">Percentage (%)</Typography></TableCell>
      </TableRow>
        </TableHead>
        <TableBody>
          {/* map function on rows list,
              for each row create a result in the table */}
          {table_data.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
              <TableCell align="right">{row.percent}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">Index Name</Typography></TableCell>
            <TableCell align="right"><Typography variant="h6">Value</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.indices.map(row => (
              <TableRow key={row.index}>
                <TableCell component="th" scope="row">
                  {row.index}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
