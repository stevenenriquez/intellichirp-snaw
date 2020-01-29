import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";

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
  var total  = 0;
  classification_dict.map( s => (
      s.category !== 'NO' ? total += 1 : console.log("")
  ));
  return total;
}

export default function SimpleTable(props) {
  const classes = useStyles();

  var anthro_total = getTotals( props.series[0].data );
  var bio_total = getTotals( props.series[1].data );
  var geo_total = getTotals( props.series[2].data );

  var total_secs = anthro_total + bio_total + geo_total;

  var table_data = [
    { name : 'Anthrophony', value : anthro_total, percent : ((anthro_total / total_secs)*100) },
    { name : 'Biophony', value : bio_total, percent : ((bio_total / total_secs)*100) },
    { name : 'Geophony', value : geo_total, percent : ((geo_total / total_secs)*100) }
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
      <br/>
      <br/>
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
