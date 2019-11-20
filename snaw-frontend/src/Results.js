import React from 'react';
import SvmSmallResults from './img/SmallClassifyRainforest.png';
import SvmExpandedResults from './img/ExpandedClassifyRainforest.png';
import SvmAnthroResults from './img/AnthroClassifyRainforest.png';
import SvmGeoResults from './img/AnthroClassifyRainforest.png';
import Spectrogram from './img/rainforest_specto.png';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';

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

function Results() {
const classes = useStyles();
const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

return (
<div className="App">
    <Container fixed>
    <Typography variant="h3">Results</Typography>
    <Typography variant="subtitle2">of</Typography>
    <Typography variant="subtitle1">rainforest-sc.wav</Typography>
    <CardMedia component="img" image={Spectrogram} className="classes.media" alt="spectrogram" height="100%"/>
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Classification Results</Typography>
          <Typography className={classes.secondaryHeading}>SVM Small Class</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CardMedia component='img' image={SvmSmallResults} className="classes.media" alt="svmSmallResults" />
          <Typography>
            Classified from a small 20 category Support Vector Machine model trained using Open Source audio data sets.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Classification Results</Typography>
          <Typography className={classes.secondaryHeading}>SVM Extended Class</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CardMedia component='img' image={SvmExpandedResults} className="classes.media" alt="svmSmallResults" />
          <Typography>
            Classified from an expanded 28 category Support Vector Machine model trained using Open Source audio data sets.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Classification Results</Typography>
          <Typography className={classes.secondaryHeading}>SVM Anthrophony</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CardMedia component='img' image={SvmAnthroResults} className="classes.media" alt="svmSmallResults" />
          <Typography>
            Classified from a binary Anthrophony category Support Vector Machine model trained using Open Source audio data sets.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Classification Results</Typography>
          <Typography className={classes.secondaryHeading}>SVM Geophony</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CardMedia component='img' image={SvmGeoResults} className="classes.media" alt="svmSmallResults" />
          <Typography>
            Classified from a binary Geophony category Support Vector Machine model trained using Open Source audio data sets.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
    </Container>
</div>
);
}

export default Results;
