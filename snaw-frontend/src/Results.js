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

//Surely a better way to do this other than global variable.
/* This is currently done to ensure that the panels are accessible after
 * the analysis completes. Without it, all the panels disappear after
 * clicking on one of them.
 * The change was made through removing the open statements which were constantly running
 * the scripts. Now the scripts will only run upon clicking the analysis button.
 */
var finalInfoDictionary;

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



/* Function: fileInserted()
 * Functionality:
 * This function is in place to stop the page from constantly
 * running the classification and spectrogram functions.
 * It does so by checking if any files are actually present, if
 * there are none, the functions will not run. Once those functions
 * do run, the files are deleted.
 */
function fileInserted(){
    var result = '';
    $.ajax({
        url: '/didUpload',
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
    return result;
}
/* Func: get_spectro()
   When the function is called, an ajax call is made to /results/spectro
   flask function returns a file location of a created spectrogram file based on audio file uploaded
   spectro_load set to true, allows function to only be loaded on results.js creation, not update
   ajax response is returned to the function
*/
function get_spectro(){
    var result = '';
    $.ajax({
        url: '/results/spectro',
        type: "GET",
        async: false,
        success: function(response){
        //console.log(response);
        result = response;
        },
        error: function(error){
        console.log(error);
        },
    });
    return result;
}

/* Func: get_class()
   When the function is called, an ajax call is made to /results/classification
   flask function returns a JSON string featuring a dictionary of time stamps and classification
   based on the audio file uploaded
   spectro_load set to true, allows function to only be loaded on results.js creation, not update
   ajax response is returned to the function
*/
function get_class(){
    var result = '';
    $.ajax({
        url: '/results/classification',
        type: 'GET',
        async: false,
        success: function(response){
            //console.log(response);
            result = response;
        },
        error: function(error){
            console.log(error);
        },
    });
    return result
}

/* Func: get_class()
   When the function is called, an ajax call is made to /results/classification
   flask function returns a JSON string featuring a dictionary of time stamps and classification
   based on the audio file uploaded
   spectro_load set to true, allows function to only be loaded on results.js creation, not update
   ajax response is returned to the function
*/
function get_indices(){
    var result = '';
    $.ajax({
        url: '/results/indices',
        type: 'GET',
        async: false,
        success: function(response){
            //console.log(response);
            result = response;
        },
        error: function(error){
            console.log(error);
        },
    });
    return result
}

/* func: downloadTxtFile
   creates a txt file with a classification result when export button is pressed
   TODO:: Pretty print classification results in the returned export file Issue #13
   TODO:: Save classification results to a csv. file Issue #14
 */
function downloadTxtFile(fileNumber){
    const element = document.createElement("a");

    /* Proper values to traverse the finalInfoDictionary:
     * fileNumber (passed in parameter) =  the number of the file in the dictionary. Dynamically called by Results().
     * fileName = The name of the file
     * fileSpectro = The Base64 of the Spectrogram image
     * fileData =  The classification.py output of the file
     *
     * Example of the dictionary:  {fileNumber: [fileName, fileSpectro, fileData]}
     */
    let fileName = 0;
    let fileSpectro = 1;
    let fileData = 2;
    let fileAcoustics = 3;

    const file = new Blob([JSON.stringify(finalInfoDictionary[fileNumber][fileData])], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "classification_"+finalInfoDictionary[fileNumber][fileName]+"_results.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}

/*
 * Here we are checking the above function fileInserted,
 * which will tell us if there are files present, if not
 * the get_spectro and get_class will not run
 */
function runAnalysis() {

        // Create a final dictionary to store all information about each file
        var resultDictionary;
        // Run spectrogram conversion
        var spectroImg = get_spectro();
        var indices = get_indices();
        var classification = get_class();

        resultDictionary = spectroImg;
        // Run classification function. returns dictionary. Will delete all upload files upon completion


        //Put everything together into one dictionary for dynamic adding.
        for (var i = 0; i < Object.keys(spectroImg).length; i++) {
            resultDictionary[i].push(classification[i]);
            resultDictionary[i].push(indices[i])
        }
        console.log(resultDictionary);
        return resultDictionary;
}

//setter function for the global dictionary. Safety i guess?
function setGlblDictionary(dicitonary){
    finalInfoDictionary = dicitonary;
}

function Results() {
    console.log(finalInfoDictionary);
    //Check if files are currently inserted into the filesystem
    if(fileInserted() == "True") {
        //Set global var: finalInfoDictionary to the results of the analysis
        setGlblDictionary(runAnalysis());
    }
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);;

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div className="App">

            <ApplicationBar/>
            <Container>
                <br/>
                <Typography variant="h3" component="h1">Results of Analysis</Typography>
                <br/>
                <Container fixed>
                    {Object.entries(finalInfoDictionary).map(([key, value]) => {
                        return (
                            <ExpansionPanel expanded={expanded === key} onChange={handleChange(key)}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                    <Typography className={classes.heading}>Results of</Typography>
                                    <Typography className={classes.secondaryHeading}>{value[0]}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Container>
                                        <Paper>
                                            <Typography variant='subtitle1'>Spectrogram</Typography>
                                            <CardMedia id="spectrogram" component='img' image={value[1]}
                                                       className="classes.media"/>
                                        </Paper>
                                        <br/>
                                        <Typography variant='subtitle1'>Results of SVM Anthrophony, Geophony, and Biophony Class
                                            Models</Typography>
                                        <br/>
                                        <Grid container spacing={2}>
                                            <Grid item linechart>
                                                <Paper><LineChart series={value[2]}/></Paper>
                                            </Grid>
                                            <Grid item piechart>
                                                <Paper><PieChart series={value[2]}/></Paper>
                                            </Grid>
                                        </Grid>
                                        <br/>
                                        <SimpleTable series={value[2]} indices={value[3]}/>
                                        <br/>
                                        <Paper>
                                            <Button onClick={function () {
                                                downloadTxtFile(key)
                                            }} variant="contained" className={classes.button}>Export SVM Classification</Button>
                                        </Paper>
                                    </Container>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            )})}
                </Container>
            </Container>
        </div>
            )
        }

export default Results;
