import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';


const social = ['GitHub', 'Twitter', 'Facebook'];
const archives = [
  'March 2020',
  'February 2020',
  'January 2020',
  'December 2019',
  'November 2019',
  'October 2019',
  'September 2019',
  'August 2019',
  'July 2019',
  'June 2019',
  'May 2019',
  'April 2019',
];

const useStyles = makeStyles(theme => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  }
}));

const Sidebar = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>
        <Typography>
          Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit
          amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
        </Typography>
      </Paper>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Archives
      </Typography>
      {archives.map(archive => (
        <Link display="block" variant="body1" href="#" key={archive}>
          {archive}
        </Link>
      ))}
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Social
      </Typography>
      {social.map(network => (
        <Link display="block" variant="body1" href="#" key={network}>
          {network}
        </Link>
      ))}
    </Grid>
  );
};
  
export default Sidebar;