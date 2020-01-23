import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import LineChart from './Charts/LineChart';
import PieChart from './Charts/PieChart';
import SimpleTable from "./components/table";
import ApplicationBar from "./components/ApplicationBar";
import Grid from '@material-ui/core/Grid';
import $ from 'jquery';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
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

/* Func: get_spectro()
   When the function is called, an ajax call is made to /results/spectro
   flask function returns a file location of a created spectrogram file based on audio file uploaded
   TODO:: Allow spectorgrams to be created for multiple files Issue #10
   spectro_load set to true, allows function to only be loaded on results.js creation, not update
        TODO:: Results.js is initialized multiple times, get_spectro() in turn is ran more than once Issue #11
   ajax response is returned to the function
*/
var specto_load = false;
function get_spectro(){
    var result = '';
    if(specto_load) return;
    $.ajax({
        url: '/results/spectro',
        type: "GET",
        async: false,
        success: function(response){
        console.log(response);
        result = response;
        },
        error: function(error){
        console.log(error);
        },
    });
    specto_load = true;
    return result;
}

/* Func: get_class()
   When the function is called, an ajax call is made to /results/classification
   flask function returns a JSON string featuring a dictionary of time stamps and classification
       based on the audio file uploaded
   TODO:: Allow classifications to be created for multiple files Issue #9
   spectro_load set to true, allows function to only be loaded on results.js creation, not update
        TODO:: Results.js is initialized multiple times, get_spectro() in turn is ran more than once Issue #11
   ajax response is returned to the function
*/
var class_load = false;
function get_class(){
    var result = '';
    if(class_load) return;

    $.ajax({
        url: '/results/classification',
        type: 'GET',
        async: false,
        success: function(response){
            console.log(response);
            result = response;
        },
        error: function(error){
            console.log(error);
        },
    });
    class_load = true;
    return result
}

/* func: downloadTxtFile
   creates a txt file with a classification result when export button is pressed
   TODO:: Pretty print classification results in the returned export file Issue #13
   TODO:: Save classification results to a csv. file Issue #14
 */
function downloadTxtFile(){
    const element = document.createElement("a");
    const file = new Blob([classification], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "classification_results.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}

// Creates spectrogram file location to be used by html
// TODO:: Add spectrogram file location code to get_spectro() function Issue #14
var spectroImg = get_spectro();
if(typeof spectroImg != 'String') {
    var multiFile = true;
}
var classification = get_class();
// Created classification file variable

function Results() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

    if(multiFile){
        return (
        <div className="App">
            <ApplicationBar/>
            <Container>
                <br/>
                <Typography variant="h3" component="h1">Results of Analysis</Typography>
                <br/>
                <Container fixed>
                    <ExpansionPanel expanded={expanded === 'panel0'} onChange={handleChange('panel0')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header">
                            <Typography className={classes.heading}>Results of</Typography>
                            <Typography className={classes.secondaryHeading}>{spectroImg[0][0]}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Container>
                                <Paper>
                                    <Typography variant='subtitle1'>Spectrogram</Typography>
                                    <CardMedia id="spectrogram" component='img' image={spectroImg[0][1]}
                                               className="classes.media"/>
                                </Paper>
                                <br/>
                                <Typography variant='subtitle1'>Results of SVM Anthrophony, Geophony, and Biophony Class
                                    Models</Typography>
                                <br/>
                                <Grid container spacing={2}>
                                    <Grid item linechart>
                                        <Paper><LineChart series={classification[0]}/></Paper>
                                    </Grid>
                                    <Grid item piechart>
                                        <Paper><PieChart/></Paper>
                                    </Grid>
                                </Grid>
                                <br/>
                                <SimpleTable testing={classification[0]}/>
                                <br/>
                                <Paper>
                                    <Button onClick={function () {
                                        downloadTxtFile()
                                    }} variant="contained" className={classes.button}>Export SVM Classification</Button>
                                </Paper>
                            </Container>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header">
                            <Typography className={classes.heading}>Results of</Typography>
                            <Typography className={classes.secondaryHeading}>{spectroImg[1][0]}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Container>
                                <Paper>
                                    <Typography variant='subtitle1'>Spectrogram</Typography>
                                    <CardMedia id="spectrogram" component='img' image={spectroImg[1][1]}
                                               className="classes.media"/>
                                </Paper>
                                <br/>
                                <Typography variant='subtitle1'>Results of SVM Anthrophony, Geophony, and Biophony Class
                                    Models</Typography>
                                <br/>
                                <Grid container spacing={2}>
                                    <Grid item linechart>
                                        <Paper><LineChart series={classification[1]}/></Paper>
                                    </Grid>
                                    <Grid item piechart>
                                        <Paper><PieChart/></Paper>
                                    </Grid>
                                </Grid>
                                <br/>
                                <SimpleTable testing={classification[1]}/>
                                <br/>
                                <Paper>
                                    <Button onClick={function () {
                                        downloadTxtFile()
                                    }} variant="contained" className={classes.button}>Export SVM Classification</Button>
                                </Paper>
                            </Container>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Container>
            </Container>
            </div>
        );
    }
    else{
        return (
            <div className="App">
                <ApplicationBar/>
                <Container>
                    <br/>
                    <Typography variant="h3" component="h1">Results of Analysis</Typography>
                    <br/>
                    <Container fixed>
                        <ExpansionPanel expanded={expanded === 'panel0'} onChange={handleChange('panel0')}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header">
                                <Typography className={classes.heading}>Results of</Typography>
                                <Typography className={classes.secondaryHeading}>nature_sc.wav</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Container>
                                    <Paper>
                                        <Typography variant='subtitle1'>Spectrogram</Typography>
                                        <CardMedia id="spectrogram" component='img' image={spectroImg.src}
                                                   className="classes.media"/>
                                    </Paper>
                                    <br/>
                                    <Typography variant='subtitle1'>Results of SVM Anthrophony, Geophony, and Biophony Class
                                        Models</Typography>
                                    <br/>
                                    <Grid container spacing={2}>
                                        <Grid item linechart>
                                            <Paper><LineChart series={classification}/></Paper>
                                        </Grid>
                                        <Grid item piechart>
                                            <Paper><PieChart/></Paper>
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    <SimpleTable testing={classification}/>
                                    <br/>
                                    <Paper>
                                        <Button onClick={function () {
                                            downloadTxtFile()
                                        }} variant="contained" className={classes.button}>Export SVM Classification</Button>
                                    </Paper>
                                </Container>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header">
                                <Typography className={classes.heading}>Results of</Typography>
                                <Typography className={classes.secondaryHeading}>rainforest-sc.wav</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Container>
                                    <Paper>
                                        <Typography variant='subtitle1'>Spectrogram</Typography>
                                        <CardMedia id="spectrogram" component='img' image={spectroImg.src}
                                                   className="classes.media"/>
                                    </Paper>
                                    <br/>
                                    <Typography variant='subtitle1'>Results of SVM Anthrophony, Geophony, and Biophony Class
                                        Models</Typography>
                                    <br/>
                                    <Grid container spacing={2}>
                                        <Grid item linechart>
                                            <Paper><LineChart series={classification}/></Paper>
                                        </Grid>
                                        <Grid item piechart>
                                            <Paper><PieChart/></Paper>
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    <SimpleTable testing={classification}/>
                                    <br/>
                                    <Paper>
                                        <Button onClick={function () {
                                            downloadTxtFile()
                                        }} variant="contained" className={classes.button}>Export SVM Classification</Button>
                                    </Paper>
                                </Container>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Container>
                </Container>
            </div>
        );



    }
}

export default Results;
