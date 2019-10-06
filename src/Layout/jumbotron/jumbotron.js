import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
//import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
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
      borderRadius: `${props.noRadius ? '0' : '100px'}`
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'transparent',
    },
    gridContainer: {
      width: `${props.maxWidth ? '100%' : '' }`,
      flexBasis: '70%',
      maxWidth: '100%',
      margin: 'auto',
      [theme.breakpoints.down('md')]: {
        flexBasis: '100%',
      }
    },
    mainFeaturedPostContent: {
      margin: `${props.center ? '10px auto' : ''}`,
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
      maxWidth: `${props.maxWidth ? '100%' : '70%' }`
    },
    center: {
      textAlign: `${props.center ? 'center' : ''}`
    },
    link: {
    color: 'black',
    textDecoration: 'none',
    fontSize: '16px',
  },
  topBtns: {
    marginRight: theme.spacing(2),
    fontSize: '16px',
    padding: theme.spacing(1)
  },
  }))(props, options);
}

const Jumbo = (props) => {
  const classes = useStyles(props);

  return (
    <Paper className={classes.mainFeaturedPost}>
      {
        <img
          style={{ display: 'none' }}
          src={props.image}
          alt="background"
        />
      }
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6} className={props.center ? classes.gridContainer : ''}>
          <div className={classes.mainFeaturedPostContent}>
            { props.title ? (
              <Typography className={classes.center} component="h1" variant="h3" color="inherit" gutterBottom>
                { props.title }
              </Typography>
            ) : null }
           { props.text ? (
            <Typography className={classes.center} variant="h5" color="inherit" paragraph>
              { props.text }
            </Typography>
           ) : null }  
            { props.link ? (
              <div className={classes.center}>
                <Link className={classes.link} to={props.linkURL}>
                  <Button id="login" variant="outlined" size="small" className={`${classes.topBtns} no-pointer`}>
                    <span>{ props.link }</span>
                  </Button>
                </Link>
                <Link className={classes.link} to="/about">
                  <Button id="login" variant="outlined" size="small" className={`${classes.topBtns} no-pointer`}>
                    <span>Learn More</span>
                  </Button>
                </Link>
              </div>
            ) : null }
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Jumbo;