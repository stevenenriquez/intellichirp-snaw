import React from 'react';
import SvmSmallResults from './img/SmallClassifyRainforest.png';
import SvmExpandedResults from './img/ExpandedClassifyRainforest.png';
import SvmAnthroResults from './img/AnthroClassifyRainforest.png';
import SvmGeoResults from './img/AnthroClassifyRainforest.png';
import Spectrogram from './img/rainforest_specto.png';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import LineChart from './Charts/LineChart';
import PieChart from './Charts/PieChart';
import SimpleTable from "./components/table";
import Grid from '@material-ui/core/Grid';
import $ from 'jquery';

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
}));

function get_spectro(){
    $.ajax({
        url: '/results/spectro',
        type: "GET",
        success: function(response){
        console.log(response);
        },
        error: function(error){
        console.log(error);
        }
    })
}

function Results() {
const classes = useStyles();
const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  var spectroImg = new Image();
  spectroImg.src = 'data:image/png;base64,'+window.spectroImg;
  get_spectro();

return (
<div className="App">
    <AppBar position="static">
        <Toolbar>
            <Typography variant='h6' className={classes.title}>Soundscape Noise Analysis Workbench</Typography>
        </Toolbar>
    </AppBar>

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
                    <Typography className={classes.secondaryHeading}>rainforest-sc.wav</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Container>
                        <Paper>
                            <Typography variant='subtitle1'>Spectrogram</Typography>
                            <CardMedia component='img' image={Spectrogram} className="classes.media"/>
                        </Paper>
                        <br/>
                        <Typography variant='subtitle1'>Results of SVM Small Class</Typography>
                        <br/>
                        <Grid container spacing={2}>
                            <Grid item linechart>
                                <Paper><LineChart/></Paper>
                            </Grid>
                            <Grid item piechart>
                                <Paper><PieChart/></Paper>
                            </Grid>
                        </Grid>
                        <br/>
                        <SimpleTable/>
                    </Container>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header">
                    <Typography className={classes.heading}>Results of</Typography>
                    <Typography className={classes.secondaryHeading}>nature-sc.wav</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Container>
                    <Paper>
                        <Typography variant='subtitle1'>Spectrogram</Typography>
                        <CardMedia component='img' image={Spectrogram} className="classes.media" alt="svmSmallResults" />
                    </Paper>
                    <br/>
                    <Paper>
                        <Typography variant='subtitle1'>SVM Small Class</Typography>
                        <CardMedia component='img' image={SvmSmallResults} className="classes.media" alt="svmSmallResults" />
                        <Typography>
                        Classified from a small 20 category Support Vector Machine model trained using Open Source audio data sets.
                        </Typography>
                    </Paper>
                    <br/>
                    <Paper>
                        <Typography variant='subtitle1'>SVM Expanded Class</Typography>
                        <CardMedia component='img' image={SvmExpandedResults} className="classes.media" alt="svmSmallResults" />
                        <Typography>
                        Classified from an Extended 28 category Support Vector Machine model trained using Open Source audio data sets.
                        </Typography>
                    </Paper>
                    <br/>
                    <Paper>
                        <Typography variant='subtitle1'>SVM Anthrophony Binary Class</Typography>
                        <CardMedia component='img' image={SvmAnthroResults} className="classes.media" alt="svmSmallResults" />
                        <Typography>
                        Classified from a small 20 category Support Vector Machine model trained using Open Source audio data sets.
                        </Typography>
                    </Paper>
                    <br/>
                    <Paper>
                        <Typography variant='subtitle1'>SVM Geophony Binary Class</Typography>
                        <CardMedia component='img' image={SvmGeoResults} className="classes.media" alt="svmSmallResults" />
                        <Typography>
                        Classified from a small 20 category Support Vector Machine model trained using Open Source audio data sets.
                        </Typography>
                    </Paper>
                    </Container>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container>
    </Container>
    </div>
);
}

export default Results;
