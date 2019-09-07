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
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: `url(${props.image})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
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
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            { props.title ? props.title : 'Title of a longer featured blog post' }
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              { props.text ? props.text : `Multiple lines of text that form the lede, informing new readers quickly and
              efficiently about what&apos;s most interesting in this post&apos;s contents.` }
            </Typography>
            <Link variant="subtitle1" href="#">
              { props.link ? props.link : 'Continue reading…' }
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Jumbo;