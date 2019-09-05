import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { Link as LinkTwo } from 'react-router-dom';
import NavConfig from '../navbar/NavConfig';

import Navbar from '../navbar/Navbar';
import './Style.css';

const useStyles = makeStyles(theme => ({
  topBtns: {
    marginRight: theme.spacing(2)
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'center',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  link: {
    color: 'black',
    textDecoration: 'none',
  }
}));

// style-lint: disabe

const Header = () => {
  const classes = useStyles();

  const CreateLink = (item) => (
    <Link noWrap key={item.name} className={classes.link} color="inherit">
      <LinkTwo className={classes.link} to={item.url} style={ { margin: '10px' } }>
        { item.name }
      </LinkTwo>
    </Link>
  );

  return (
    <>
      <Toolbar className={classes.toolbar}>
      <Navbar />
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={`${classes.toolbarTitle} fix-icon-center`}
        >
          <span className="page-title">Webb Trade Center</span>
        </Typography>
          <div className="remove-me-sm">
            <Button variant="outlined" size="small" className={classes.topBtns}>
              { CreateLink(NavConfig.buttons.Login) }
            </Button>
            <Button variant="outlined" size="small" className={classes.topBtns}>
              { CreateLink(NavConfig.buttons.Sign) }
            </Button>
          </div>
        </Toolbar>

      <div className="remove-me-sm">
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          {NavConfig.defaults.map(url => (
            CreateLink(url)
          ))}
        </Toolbar>
      </div>

      <Paper className={classes.mainFeaturedPost}>
        {
          <img
            style={{ display: 'none' }}
            src="https://source.unsplash.com/user/erondu"
            alt="background"
          />
        }
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                Skall man göra en title till? ..
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                kan man lägga till lite mer text som en paragraf kanske?..
              </Typography>
              <Link variant="subtitle1" href="#">
                Länka till något? ..
              </Link>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Header;