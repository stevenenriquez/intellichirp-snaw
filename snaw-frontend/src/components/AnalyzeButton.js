import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import $ from "jquery";

const useStyles = makeStyles(theme => ({
  button: {
    color: 'white',
    fontSize: '1em',
    backgroundColor: '#3f5a14',
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    '&:hover': {
      background: '#2e420e',
   },
  },
}));

export default function UploadButton() {
  const classes = useStyles();

  return (
    <div>
        <label htmlFor="outlined-button-file">
        <Link to="/results" style={{ textDecoration: 'none' }}>
          <Button variant="contained"  className={classes.button}>
            Analyze Audio
          </Button>
          </Link>
        </label>
    </div>
  );
}