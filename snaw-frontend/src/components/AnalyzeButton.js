import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles} from "@material-ui/core/styles";

const useStyles = theme => ({
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
});
/*-----------------------------------------------------/
 * Class: AnalyzeButton
 *-----------------------------------------------------/
 * The AnalyzeButton has been converted into a class to
 * allow the component to be passed arguments. We then use
 * the passed in bool (in this.props.bool) to determine whether
 * to show the "Analyze" button in green and enabled vs. grey and
 * disabled.
 *-----------------------------------------------------*/
class AnalyzeButton extends React.Component {
    render() {
        const { classes } = this.props;
        console.log("HELLO")
            return (
                <div>
                    <label htmlFor="outlined-button-file">
                        {this.props.bool ? (
                            <Link to={'/results'} style={{ textDecoration: 'none' }}>
                                <Button disabled={false} variant="contained" className={classes.button}>
                                Analyze Audio
                                </Button>
                            </Link>
                            ) : (
                                <Button disabled={true} variant="contained" className={classes.button}>
                                Analyze Audio
                                </Button>
                        )}
                    </label>
                </div>
            )
    }
}
export default withStyles(useStyles)(AnalyzeButton);