import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function UploadButton() {
  const classes = useStyles();

  return (
    <div>
        <input
            accept="audio/wav"
            className={classes.input}
            id="outlined-button-file"
            multiple
            type="file"
        />
        <label htmlFor="outlined-button-file">
            <Button variant="outlined" component="span" className={classes.button}>
              Upload WAV File/s
            </Button>
        </label>
    </div>
  );
}