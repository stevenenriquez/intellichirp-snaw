import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({});

export default function Applicationbar() {
    const classes = useStyles();

    return (
        <AppBar position='static' style={{background: '#247a1c'}}>
            <Toolbar>
                <Typography variant='h6' className={classes.title} color='inherit'>Soundscape Noise Analysis
                    Workbench</Typography>
            </Toolbar>
        </AppBar>
    );
}