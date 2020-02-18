import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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
        {/* The input for the application to ingest wav files.
            Wav files are the only file type that is accepted. */}
        <input
            accept="audio/wav"
            className={classes.input}
            id="outlined-button-file"
            type="file"
        />
        <label htmlFor="outlined-button-file">
            <Button variant="outlined" 
                    component="span" 
                    className={classes.button}>
              Upload WAV File/s
            </Button>
        </label>
    </div>
  );
}