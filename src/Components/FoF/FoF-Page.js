import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '100px'
  }
}));

const FoFPage = (props) => {
  const classes = useStyles();
  const path = props.location ? `"${props.location.pathname}"` : 'Page';

  return (<>
    <Grid item xs={12} md={12} className={classes.root}>
      <Typography variant="h4" className={classes.root} gutterBottom>
        404 - {path} not found
      </Typography>
      <Divider />
    </Grid>
  </>)
};

export default FoFPage;