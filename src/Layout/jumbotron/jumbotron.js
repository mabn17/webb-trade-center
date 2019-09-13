import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = (props, options) => {
  return makeStyles(theme => ({
    mainFeaturedPost: {
      position: 'relative',
      width: '100%',
      backgroundColor: 'transparent',
      color: theme.palette.common.black,
      marginBottom: theme.spacing(4),
      backgroundImage: `url(${props.image})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      boxShadow: 'none',
      borderRadius: '100px'
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'transparent',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
      maxWidth: '70%'
    },
  }))(props, options);
}

const Jumbo = (props) => {
  const classes = useStyles(props);

  return (
    <Paper className={classes.mainFeaturedPost}>
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: 'none' }}
          src={props.image}
          alt="background"
        />
      }
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            { props.title ? (
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                { props.title }
              </Typography>
            ) : null }
           { props.text ? (
            <Typography variant="h5" color="inherit" paragraph>
              { props.text }
            </Typography>
           ) : null }  
            { props.link ? (
              <Link variant="subtitle1" href="#">
                { props.link }
              </Link>
            ) : null }
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Jumbo;