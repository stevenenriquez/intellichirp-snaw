import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Classification Type</TableCell>
            <TableCell align="right">Number of Seconds</TableCell>
            <TableCell align="right">Percentage (%)</TableCell>
      </TableRow>
        </TableHead>
        <TableBody>
          {/* map function on rows list,
              for each row create a result in the table */}
          {rows.map(row => (
            <TableRow key={row.class_name}>
              <TableCell component="th" scope="row">
                {row.class_name}
              </TableCell>
              <TableCell align="right">{row.seconds}</TableCell>
              <TableCell align="right">{row.percentage}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
